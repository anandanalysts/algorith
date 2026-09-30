/**
 * Verified ALGorith Technology Knowledge Base
 */

export interface VerifiedTechStack {
  sixLayers: { name: string; role: string; summary: string }[];
  principles: { title: string; description: string }[];
  security: {
    vpcDeployment: string;
    dataRetention: string;
    encryption: string;
    compliance: string;
  };
}

export const VERIFIED_TECHNOLOGY_KNOWLEDGE: VerifiedTechStack = {
  sixLayers: [
    { name: "AI", role: "Intelligence and reasoning", summary: "Foundation reasoning models, domain-adapted embeddings, and schema-constrained prompt guardrails." },
    { name: "AGENTS", role: "Systems that can perform tasks", summary: "Goal-oriented multi-agent orchestration with working memory and secure tool-calling boundaries." },
    { name: "AUTOMATION", role: "Processes that run with less manual effort", summary: "Event-driven message queues, webhook bridges, and cryptographic idempotency schedules." },
    { name: "DATA", role: "The information layer", summary: "ACID-compliant relational databases, columnar analytical lakehouses, and vector stores." },
    { name: "ANALYTICS", role: "Turning data into insight", summary: "Sub-second visual telemetry, anomaly alerting, and predictive forecasting pipelines." },
    { name: "APPLICATIONS", role: "Technology people actually use", summary: "High-performance React/TypeScript single page applications, portals, and business suites." }
  ],
  principles: [
    { title: "Deterministic Over Stochastic", description: "Every AI agent is wrapped in strict schema validation and safety boundaries." },
    { title: "Event-Driven Scalability", description: "Decoupled asynchronous message queues prevent single-point bottlenecks." },
    { title: "Zero Vendor Lock-In", description: "Engineered on portable open standards and standard relational stores." },
    { title: "Strict Type Safety & Observability", description: "End-to-end typing from database schemas to UI components with structured tracing." },
    { title: "Air-Gapped & Enterprise Secure", description: "Zero data retention with private VPC deployments." },
    { title: "Sub-Second Viewport Performance", description: "Optimized bundle sizes and low-latency response cycles." }
  ],
  security: {
    vpcDeployment: "Supports deployment inside private AWS, GCP, Azure, or on-premise VPCs.",
    dataRetention: "Zero third-party data retention; enterprise client data is never used to train public models.",
    encryption: "AES-256-GCM encryption at rest and TLS 1.3 in transit.",
    compliance: "Engineered for SOC2, HIPAA, and GDPR compliance readiness."
  }
};
