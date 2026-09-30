export interface ProductItem {
  id: string;
  name: string;
  tagline: string;
  category: 'ALGorith AI' | 'ALGorith Business';
  categoryLabel: string;
  description: string;
  status: 'Production Ready' | 'Active Enterprise' | 'General Availability' | 'Developer Preview';
  badgeColor?: string;
  iconName: string;
  keyCapabilities: string[];
  architectureTier: string;
  targetUsers: string[];
  metrics: { label: string; value: string }[];
  highlightCode?: string;
}

export const PRODUCTS_DATA: ProductItem[] = [
  {
    id: 'algorith-ai',
    name: 'ALGorith AI',
    tagline: 'Intelligent Agent & Generative AI Ecosystem',
    category: 'ALGorith AI',
    categoryLabel: 'AI & Intelligence',
    description: 'Enterprise generative AI infrastructure, multi-agent autonomous task loops, and RAG knowledge-retrieval pipelines built for deterministic accuracy and zero hallucination.',
    status: 'General Availability',
    iconName: 'BrainCircuit',
    architectureTier: 'Layer 01 & 02: Core AI & Autonomous Agents',
    targetUsers: ['Enterprise AI Engineers', 'Product Leaders', 'Operations Executives'],
    keyCapabilities: [
      'Multi-Agent Orchestration with autonomous reasoning and task delegation',
      'Deterministic Vector RAG with hybrid dense-sparse semantic retrieval',
      'Private Model Deployment with zero data retention and air-gapped security',
      'Function calling & tool execution connecting directly to ERP/CRM databases',
      'Continuous evaluation, latency optimization, and cost-per-inference routing'
    ],
    metrics: [
      { label: 'Latency Reduction', value: '<180ms p95' },
      { label: 'Retrieval Precision', value: '99.4%' },
      { label: 'Model Fallback SLA', value: '99.99%' }
    ],
    highlightCode: `// Multi-agent execution loop with type safety
const agent = new AlgorithAgent({
  model: 'gemini-2.5-flash',
  memory: HybridVectorStore({ qdrant: true }),
  tools: [CRMTool, ERPConnector, SQLQueryEngine],
  temperature: 0.1,
  guardrails: { hallucinationThreshold: 0.02 }
});
await agent.executeAutonomousTask(payload);`
  },
  {
    id: 'algorith-crm',
    name: 'ALGorith CRM',
    tagline: 'Context-Aware Customer Relationship Engine',
    category: 'ALGorith Business',
    categoryLabel: 'Business Operations',
    description: 'Next-generation customer relationship management platform with autonomous lead intelligence, event-driven pipeline progression, and bidirectional omnichannel synchronization.',
    status: 'Production Ready',
    iconName: 'Users',
    architectureTier: 'Layer 06: High-Performance Business Applications',
    targetUsers: ['Revenue Teams', 'Sales Directors', 'Customer Success Managers'],
    keyCapabilities: [
      'Real-time lead scoring & automated intent categorization via AI',
      'Autonomous email & outreach sequencing with dynamic personalization',
      'Unified 360° customer timeline aggregating support, sales, and telemetry',
      'Custom deal pipelines with automated stage gate validation and SLA triggers',
      'Native bidirectional sync with WhatsApp, Slack, Gmail, and ERP backends'
    ],
    metrics: [
      { label: 'Pipeline Velocity', value: '+42%' },
      { label: 'Manual Entry Reduction', value: '-85%' },
      { label: 'Lead Response Time', value: '<2 mins' }
    ],
    highlightCode: `// Event-driven pipeline state transition
pipeline.on('lead.intent_spike', async (lead) => {
  const enrichedData = await AlgorithCRM.enrich(lead.domain);
  await AlgorithAI.draftPersonalizedBrief(lead, enrichedData);
  await pipeline.assignToRep(lead.matchedOwner, { priority: 'URGENT' });
});`
  },
  {
    id: 'algorith-erp',
    name: 'ALGorith ERP',
    tagline: 'Modern Enterprise Workflow & Operational Core',
    category: 'ALGorith Business',
    categoryLabel: 'Business Operations',
    description: 'Modular enterprise resource planning engine connecting inventory, procurement, finances, and workforce operations into a single real-time transactional system.',
    status: 'Active Enterprise',
    iconName: 'Building2',
    architectureTier: 'Layer 05 & 06: Data Aggregation & Business Applications',
    targetUsers: ['COOs & Operations Leads', 'Supply Chain Teams', 'Finance Heads'],
    keyCapabilities: [
      'Multi-entity accounting, general ledger, and automated reconciliation',
      'Predictive inventory demand forecasting and automated reordering',
      'Vendor management, procurement approval workflows, and digital invoices',
      'Role-based access control (RBAC) with immutable audit trail logs',
      'Extensible REST & GraphQL APIs for frictionless custom integrations'
    ],
    metrics: [
      { label: 'Audit Trail Accuracy', value: '100%' },
      { label: 'Reconciliation Speed', value: '10x faster' },
      { label: 'Inventory Holding Cost', value: '-28%' }
    ],
    highlightCode: `// Automated invoice matching and GL entry
erp.finance.reconcileBatch({
  period: 'Q3-2025',
  varianceThreshold: 0.00,
  autoPostToLedger: true,
  auditLog: { signature: 'SHA256_STAMP' }
});`
  },
  {
    id: 'algorith-analytics',
    name: 'ALGorith Analytics',
    tagline: 'Real-Time Telemetry & Decision Intelligence',
    category: 'ALGorith Business',
    categoryLabel: 'Data & Analytics',
    description: 'High-throughput data streaming, interactive executive dashboards, and automated anomaly detection turning raw operational data into clear business decisions.',
    status: 'General Availability',
    iconName: 'BarChart3',
    architectureTier: 'Layer 04 & 05: Data Layer & Analytics Engine',
    targetUsers: ['Chief Analytics Officers', 'Data Scientists', 'Executive Leadership'],
    keyCapabilities: [
      'Sub-second query performance over billions of structured events',
      'Interactive executive dashboards with customizable drag-and-drop tiles',
      'Automated root-cause anomaly detection and Slack/email alert webhooks',
      'Unified data pipelines connecting SQL, NoSQL, APIs, and cloud warehouses',
      'Natural-language querying: ask complex data questions in plain English'
    ],
    metrics: [
      { label: 'Query Execution', value: '<50ms' },
      { label: 'Data Freshness', value: 'Real-time (<1s)' },
      { label: 'Anomaly Recall', value: '99.8%' }
    ],
    highlightCode: `// Streaming analytics aggregation query
const stream = AnalyticsEngine.queryRealtime({
  metrics: ['revenue_run_rate', 'active_pipeline_mrr', 'churn_risk_score'],
  interval: '5s',
  detectAnomalies: true
});
stream.on('anomaly', (alert) => dispatchIncidentResponse(alert));`
  }
];
