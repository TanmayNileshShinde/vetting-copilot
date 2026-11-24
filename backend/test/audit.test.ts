process.env.NODE_ENV = "test";
import "dotenv/config";
import assert from "node:assert";
import http from "node:http";
import app from "../src/server";

async function runKeployTestSuite() {
  console.log("====================================================");
  console.log("🧪 Running VettingCopilot Keploy Regression Tests");
  console.log("====================================================");

  const server = app.listen(5098);
  const BASE_URL = "http://localhost:5098";

  let passed = 0;
  let failed = 0;

  async function test(name: string, fn: () => Promise<void>) {
    try {
      await fn();
      console.log(`  ✅ PASS: ${name}`);
      passed++;
    } catch (err: any) {
      console.error(`  ❌ FAIL: ${name}`);
      console.error(`     Error: ${err.message}`);
      failed++;
    }
  }

  try {
    // Test 1: Health check endpoint
    await test("GET /api/audit/health returns 200 and integration health", async () => {
      const res = await fetch(`${BASE_URL}/api/audit/health`);
      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.strictEqual(data.status, "healthy");
      assert.strictEqual(typeof data.integrations.olostep, "boolean");
      assert.strictEqual(typeof data.integrations.crustdata, "boolean");
    });

    // Test 2: Presets endpoint
    await test("GET /api/audit/presets returns curated testing presets", async () => {
      const res = await fetch(`${BASE_URL}/api/audit/presets`);
      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.strictEqual(data.success, true);
      assert.ok(Array.isArray(data.presets) && data.presets.length >= 5);
      const first = data.presets[0];
      assert.ok(first.name && first.domain && first.expectedRisk);
    });

    // Test 3: Validation on missing query
    await test("POST /api/audit/company with empty query returns 400", async () => {
      const res = await fetch(`${BASE_URL}/api/audit/company`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: "" }),
      });
      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.strictEqual(data.success, false);
    });

    // Test 4: End-to-end Due Diligence Audit pipeline
    await test("POST /api/audit/company evaluates entity and returns audit dossier", async () => {
      const res = await fetch(`${BASE_URL}/api/audit/company`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: "retool.com" }),
      });
      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.strictEqual(data.success, true);
      assert.ok(data.data.compositeRiskScore >= 0 && data.data.compositeRiskScore <= 100);
      assert.ok(data.data.pillars.leadershipScore >= 0);
      assert.ok(data.data.pillars.regulatoryScore >= 0);
      assert.ok(data.data.firmographics.name);
      assert.ok(Array.isArray(data.data.evidenceItems));
    });

    // Test 5: Markdown Dossier Export endpoint
    await test("POST /api/audit/export-markdown generates formatted institutional report", async () => {
      const mockReport = {
        companyName: "Retool",
        targetDomain: "retool.com",
        timestamp: new Date().toISOString(),
        auditId: "AUD-TEST-001",
        compositeRiskScore: 25,
        riskLevel: "Low Risk",
        recommendation: "Approved for Vendor Onboarding",
        pillars: {
          leadershipScore: 95,
          regulatoryScore: 98,
          headcountScore: 92,
          operationalScore: 90,
        },
        executiveSummary: "Clean bill of health.",
        firmographics: {
          name: "Retool",
          domain: "retool.com",
          headcountEstimate: 140,
          headcountGrowthRate: "+18% YoY",
          headcountHistory: [],
          source: "Crustdata Verified",
        },
        scrapeData: { url: "https://retool.com", source: "Olostep" },
        evidenceItems: [],
        benchmarkComparison: {
          manualHoursSaved: 16.5,
          costSavedUsd: 2850,
          analystErrorRateReductionPct: 94.2,
        },
      };

      const res = await fetch(`${BASE_URL}/api/audit/export-markdown`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mockReport),
      });

      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.strictEqual(data.success, true);
      assert.ok(data.markdown.includes("INSTITUTIONAL DUE DILIGENCE AUDIT REPORT"));
      assert.ok(data.filename.endsWith(".md"));
    });
  } finally {
    server.close();
  }

  console.log("----------------------------------------------------");
  console.log(`Results: ${passed} passed, ${failed} failed`);
  console.log("====================================================");

  if (failed > 0) {
    process.exit(1);
  }
  process.exit(0);
}

runKeployTestSuite();
