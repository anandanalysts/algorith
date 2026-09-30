export interface SolutionKnowledge {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  verified: true;
}

export const VERIFIED_SOLUTIONS_DATA: SolutionKnowledge[] = [
  {
    id: "ai-automation",
    name: "AI & Automation",
    description: "Intelligent systems, autonomous worker agents, and automated workflow pipelines that eliminate repetitive operational overhead.",
    capabilities: [
      "Autonomous agent task execution",
      "Event-driven webhook automation",
      "Document parsing and automated data extraction",
      "Self-healing error retry schedules"
    ],
    verified: true
  },
  {
    id: "software-business-systems",
    name: "Software & Business Systems",
    description: "Custom web applications, enterprise SaaS platforms, bespoke CRM/ERP engines, and resilient microservices with 100% client IP ownership.",
    capabilities: [
      "Fullstack React, TypeScript, and Go/Node platforms",
      "Bespoke internal business tools and portals",
      "Scalable REST and gRPC API ecosystems",
      "Zero vendor lock-in database architectures"
    ],
    verified: true
  },
  {
    id: "data-analytics",
    name: "Data & Analytics",
    description: "Centralized streaming data pipelines, columnar lakehouses, and sub-second visual intelligence dashboards for fast decision making.",
    capabilities: [
      "Unified ETL/ELT streaming pipelines",
      "Columnar lakehouse storage (ClickHouse/BigQuery)",
      "Automated anomaly alerting webhooks",
      "Executive KPI cockpits"
    ],
    verified: true
  },
  {
    id: "digital-transformation",
    name: "Digital Transformation",
    description: "Legacy monolith modernization, cloud infrastructure migrations, and API integrations with zero downtime.",
    capabilities: [
      "Strangler-fig cloud migrations",
      "Terraform Infrastructure as Code",
      "Containerization with Kubernetes",
      "Unified enterprise API gateways"
    ],
    verified: true
  }
];
