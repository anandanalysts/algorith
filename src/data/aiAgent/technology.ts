export interface TechnologyKnowledge {
  id: string;
  name: string;
  role: string;
  description: string;
  verified: true;
}

export const VERIFIED_TECHNOLOGY_DATA: TechnologyKnowledge[] = [
  {
    id: "layer-ai",
    name: "AI",
    role: "Intelligence and reasoning",
    description: "Multimodal reasoning models, domain-adapted embeddings, and schema-constrained prompt guardrails.",
    verified: true
  },
  {
    id: "layer-agents",
    name: "AGENTS",
    role: "Systems that can perform tasks",
    description: "Goal-oriented multi-agent orchestration with working memory and secure tool-calling boundaries.",
    verified: true
  },
  {
    id: "layer-automation",
    name: "AUTOMATION",
    role: "Processes that run with less manual effort",
    description: "Event-driven message queues, webhook bridges, and cryptographic idempotency schedules.",
    verified: true
  },
  {
    id: "layer-data",
    name: "DATA",
    role: "The information layer",
    description: "ACID-compliant relational databases, columnar analytical lakehouses, and vector stores.",
    verified: true
  },
  {
    id: "layer-analytics",
    name: "ANALYTICS",
    role: "Turning data into insight",
    description: "Sub-second visual telemetry, anomaly alerting, and predictive forecasting pipelines.",
    verified: true
  },
  {
    id: "layer-applications",
    name: "APPLICATIONS",
    role: "Technology people actually use",
    description: "High-performance React/TypeScript business applications, executive portals, and operational suites.",
    verified: true
  }
];
