/**
 * Verified ALGorith Products Knowledge Base
 */

export interface VerifiedProduct {
  id: string;
  name: string;
  category: 'ALGorith AI' | 'ALGorith Business';
  oneLineSummary: string;
  description: string;
  status: string;
  capabilities: string[];
}

export const VERIFIED_PRODUCTS_KNOWLEDGE: VerifiedProduct[] = [
  {
    id: "algorith-ai",
    name: "ALGorith AI",
    category: "ALGorith AI",
    oneLineSummary: "AI and intelligent agent ecosystem.",
    description: "Enterprise generative AI infrastructure, multi-agent autonomous task loops, and deterministic vector RAG knowledge pipelines built with strict schema validation and zero hallucinations.",
    status: "General Availability",
    capabilities: [
      "Multi-Agent Orchestration with autonomous reasoning and task delegation",
      "Deterministic Vector RAG with hybrid dense-sparse semantic retrieval",
      "Private VPC model deployment with zero data retention for compliance",
      "Function calling and tool execution connecting directly to ERP/CRM databases"
    ]
  },
  {
    id: "algorith-crm",
    name: "ALGorith CRM",
    category: "ALGorith Business",
    oneLineSummary: "Customer and relationship management.",
    description: "Next-generation customer relationship platform with real-time AI lead scoring, event-driven pipeline progression, and bidirectional omnichannel sync.",
    status: "Production Ready",
    capabilities: [
      "AI lead scoring and intent categorization in real-time",
      "Unified 360° customer timeline aggregating communication, support, and billing",
      "Bidirectional sync with WhatsApp, Slack, Gmail, and custom ERP databases",
      "Automated deal stage gate validation and SLA triggers"
    ]
  },
  {
    id: "algorith-erp",
    name: "ALGorith ERP",
    category: "ALGorith Business",
    oneLineSummary: "Business operations and enterprise workflows.",
    description: "Modular enterprise operational core connecting multi-entity accounting, inventory forecasting, procurement workflows, and workforce management.",
    status: "Active Enterprise",
    capabilities: [
      "Multi-entity accounting, general ledger, and automated invoice reconciliation",
      "Predictive inventory demand forecasting and automated reordering",
      "Digital procurement approvals and vendor management workflows",
      "Role-based access control (RBAC) with immutable cryptographic audit logs"
    ]
  },
  {
    id: "algorith-analytics",
    name: "ALGorith Analytics",
    category: "ALGorith Business",
    oneLineSummary: "Business intelligence and data analytics.",
    description: "High-throughput data streaming, interactive executive dashboards, and automated anomaly detection turning raw event streams into clear decisions.",
    status: "General Availability",
    capabilities: [
      "Sub-50ms query performance over structured operational datasets",
      "Interactive executive dashboards with customizable KPI tiles",
      "Automated root-cause anomaly detection with webhook alerts",
      "Natural-language data querying (Text-to-SQL)"
    ]
  }
];
