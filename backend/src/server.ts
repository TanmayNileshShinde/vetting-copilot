if (!process.env.VERCEL) {
  try {
    // Load local .env dynamically outside Vercel so bundlers never trace dotenv into Serverless
    const dotenvPkg = "dotenv";
    require(dotenvPkg).config();
  } catch {
    // Ignore when dotenv is absent
  }
}
import express from "express";
import cors from "cors";
import path from "path";
import { auditRouter } from "./routes/auditRoutes";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Mount audit routes (multi-path resilience for Vercel Services rewrites)
app.use("/api/audit", auditRouter);
app.use("/audit", auditRouter);
app.use("/api", auditRouter);
app.use("/", auditRouter);

// Root endpoint with API capabilities
app.get("/", (req, res) => {
  res.json({
    name: "VettingCopilot AI - Due Diligence Engine",
    track: "Track C1: The $15-an-Hour Expert (Homingo Hackathon Edition 01)",
    team: "Team Tacticals (Tanmay Shinde & Antara Parab)",
    description: "Enterprise B2B risk intelligence copilot fusing Crustdata firmographics and Olostep live web crawling.",
    endpoints: {
      health: "GET /api/audit/health",
      presets: "GET /api/audit/presets",
      auditCompany: "POST /api/audit/company",
      exportDossier: "POST /api/audit/export-markdown",
    },
    status: "online",
  });
});

// Start local HTTP server only when executed directly (not imported by tests or Vercel serverless)
if (process.env.NODE_ENV !== "test" && !process.env.VERCEL && require.main === module) {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 VettingCopilot Backend is running on port ${PORT}`);
    console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`⚡ Olostep Integration: ${process.env.OLOSTEP_API_KEY ? "CONFIGURED (Live)" : "MISSING"}`);
    console.log(`💼 Crustdata Integration: ${process.env.CRUSTDATA_API_KEY ? "CONFIGURED (Live)" : "MISSING"}`);
    console.log(`====================================================`);
  });
}

export default app;
