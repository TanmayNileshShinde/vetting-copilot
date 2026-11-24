export interface RiskEvidence {
  category: "Leadership Stability" | "Regulatory & Legal" | "Financial Velocity" | "Operational Integrity";
  severity: "low" | "medium" | "high" | "critical";
  title: string;
  finding: string;
  quoteOrStat: string;
  source: string;
  sourceUrl?: string;
}

export interface CompanyFirmographics {
  name: string;
  domain: string;
  crustdataId?: number;
  website?: string;
  headcountEstimate?: number;
  headcountGrowthRate?: string;
  headcountHistory: Array<{ month: string; employees: number }>;
  executiveCount?: number;
  recentExecutiveTurnover?: number;
  fundingStage?: string;
  linkedinUrl?: string;
  hqLocation?: string;
  source: string;
}

export interface OlostepScrapeResult {
  url: string;
  title?: string;
  text?: string;
  markdown?: string;
  sentiment?: "positive" | "neutral" | "negative" | "warning";
  source: string;
}

export interface DueDiligenceReport {
  companyName: string;
  targetDomain: string;
  timestamp: string;
  auditId: string;
  compositeRiskScore: number;
  riskLevel: "Low Risk" | "Moderate Risk" | "Elevated Risk" | "Critical Risk";
  recommendation: "Approved for Vendor Onboarding" | "Proceed with Additional Collateral" | "Manual Executive Review Required" | "Reject / High Fraud Risk";
  pillars: {
    leadershipScore: number;
    regulatoryScore: number;
    headcountScore: number;
    operationalScore: number;
  };
  executiveSummary: string;
  firmographics: CompanyFirmographics;
  scrapeData: OlostepScrapeResult;
  evidenceItems: RiskEvidence[];
  benchmarkComparison: {
    manualHoursSaved: number;
    costSavedUsd: number;
    analystErrorRateReductionPct: number;
  };
}

export interface PresetCompany {
  name: string;
  domain: string;
  tagline: string;
  category: string;
  expectedRisk: string;
  description: string;
}
