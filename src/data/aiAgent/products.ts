export interface ProductKnowledge {
  id: string;
  name: string;
  category: 'ALGorith AI' | 'ALGorith Business';
  description: string;
  capabilities: string[];
  status: 'General Availability' | 'Production Ready' | 'Active Enterprise';
  verified: true;
}

export const VERIFIED_PRODUCTS_DATA: ProductKnowledge[] = [
  {
    id: "algorith-ai",
    name: "ALGorith AI",
    category: "ALGorith AI",
    description: "ALGorith AI is part of the ALGorith technology ecosystem, focused on AI and intelligent agent capabilities, deterministic RAG pipelines, and multi-agent coordination.",
    capabilities: [
      "Multi-agent autonomous task loops",
      "Deterministic vector RAG retrieval",
      "Private VPC deployment with zero data retention",
      "Function and tool calling boundaries"
    ],
    status: "General Availability",
    verified: true
  },
  {
    id: "algorith-crm",
    name: "ALGorith CRM",
    category: "ALGorith Business",
    description: "ALGorith CRM is a context-aware customer relationship and pipeline orchestration platform with automated lead scoring and timeline intelligence.",
    capabilities: [
      "Real-time AI lead intent scoring",
      "Unified 360° customer timeline",
      "Bidirectional sync with WhatsApp, Slack, and Gmail",
      "Custom pipeline stage gate validation"
    ],
    status: "Production Ready",
    verified: true
  },
  {
    id: "algorith-erp",
    name: "ALGorith ERP",
    category: "ALGorith Business",
    description: "ALGorith ERP is a modular enterprise operations core connecting multi-entity accounting, inventory forecasting, and digital procurement.",
    capabilities: [
      "Multi-entity accounting and automated ledger reconciliation",
      "Predictive inventory forecasting and reorder triggers",
      "Digital procurement and vendor workflows",
      "Role-based access control with immutable audit logs"
    ],
    status: "Active Enterprise",
    verified: true
  },
  {
    id: "algorith-analytics",
    name: "ALGorith Analytics",
    category: "ALGorith Business",
    description: "ALGorith Analytics provides real-time data streaming, sub-50ms query telemetry, and interactive executive decision dashboards.",
    capabilities: [
      "Sub-50ms query latency over structured events",
      "Interactive executive dashboards with customizable tiles",
      "Automated root-cause anomaly detection",
      "Natural-language data querying (Text-to-SQL)"
    ],
    status: "General Availability",
    verified: true
  }
];
