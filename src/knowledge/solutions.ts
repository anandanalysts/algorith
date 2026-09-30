/**
 * Verified ALGorith Solutions Knowledge Base
 */

export interface VerifiedSolution {
  id: string;
  title: string;
  categoryTag: string;
  problem: string;
  technology: string;
  outcome: string;
}

export const VERIFIED_SOLUTIONS_KNOWLEDGE: VerifiedSolution[] = [
  {
    id: "ai-automation",
    title: "AI & Automation",
    categoryTag: "Autonomous Intelligence",
    problem: "Manual data entry, disconnected system reconciliation, repetitive triage, and slow operational decision cycles.",
    technology: "Deterministic multi-agent loops, semantic RAG pipelines, event-driven webhooks, and self-healing automation workflows.",
    outcome: "Up to 75% reduction in manual processing time and error-free 24/7 autonomous process execution."
  },
  {
    id: "software-business-systems",
    title: "Software & Business Systems",
    categoryTag: "Engineering & Platforms",
    problem: "Bloated, inflexible off-the-shelf software and slow development cycles that fail to match proprietary business logic.",
    technology: "Bespoke fullstack web applications (React, TypeScript, Go/Node), custom CRM/ERP engines, and resilient microservices.",
    outcome: "100% intellectual property ownership, accelerated feature velocity, and scalable systems with zero legacy debt."
  },
  {
    id: "data-analytics",
    title: "Data & Analytics",
    categoryTag: "Decision Intelligence",
    problem: "Siloed data in spreadsheets and legacy databases preventing leadership from gaining real-time operational visibility.",
    technology: "Unified streaming ETL/ELT pipelines, columnar lakehouses (ClickHouse/BigQuery), and sub-50ms visual KPI cockpits.",
    outcome: "Zero-lag executive decision making, proactive churn prevention, and real-time revenue telemetry."
  },
  {
    id: "digital-transformation",
    title: "Digital Transformation",
    categoryTag: "Modernization & Infrastructure",
    problem: "Aging on-premise servers, brittle monolithic architectures, and high maintenance overhead.",
    technology: "Strangler-fig cloud migrations, Terraform Infrastructure-as-Code, Kubernetes container orchestration, and API gateways.",
    outcome: "Significant infrastructure cost optimization, zero downtime migrations, and heightened security."
  }
];
