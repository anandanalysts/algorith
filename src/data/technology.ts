export interface TechLayer {
  id: string;
  order: number;
  name: string;
  shortRole: string;
  summary: string;
  detailedDescription: string;
  keyComponents: string[];
  techStack: string[];
  protocols: string[];
  samplePayloadSnippet?: string;
}

export const TECH_STACK_LAYERS: TechLayer[] = [
  {
    id: 'ai-core',
    order: 1,
    name: 'AI',
    shortRole: 'Intelligence & Reasoning',
    summary: 'Foundational models, semantic embeddings, fine-tuning, and deterministic prompt engineering.',
    detailedDescription: 'The cognitive foundation of the ALGorith ecosystem. We leverage state-of-the-art multimodal reasoning models combined with domain-adapted embeddings to deliver deterministic semantic understanding, structured JSON schema generation, and zero-hallucination inference.',
    keyComponents: [
      'Multimodal LLMs (Gemini, Claude, Llama 3 on private VPCs)',
      'High-dimensional vector embedding pipelines',
      'Semantic prompt routing & cost-per-token optimization',
      'Hallucination guardrails & schema-constrained outputs'
    ],
    techStack: ['@google/genai', 'Python / PyTorch', 'FastAPI', 'HuggingFace', 'vLLM'],
    protocols: ['gRPC', 'SSE Streaming', 'JSON Schema Validation'],
    samplePayloadSnippet: `{
  "model": "gemini-2.5-flash",
  "temperature": 0.0,
  "responseSchema": { "type": "OBJECT", "properties": { "intent": { "type": "STRING" } } }
}`
  },
  {
    id: 'agents',
    order: 2,
    name: 'AGENTS',
    shortRole: 'Autonomous Task Execution',
    summary: 'Goal-driven multi-agent orchestration, working memory, and tool-calling loops.',
    detailedDescription: 'Autonomous software workers capable of breaking down complex objectives into sequential steps. Each agent possesses working memory, scratchpads, and secure access to tools like SQL query engines, CRM APIs, and code execution sandboxes with human-in-the-loop escalation.',
    keyComponents: [
      'Multi-agent role coordination and worker delegation',
      'Long-term contextual memory with hybrid vector recall',
      'Deterministic tool & function-calling execution boundaries',
      'Self-healing validation loops with automated retry logic'
    ],
    techStack: ['LangGraph', 'AutoGPT Architecture', 'TypeScript Agents', 'Qdrant', 'Redis'],
    protocols: ['Async Task Queues', 'Event Sinks', 'Audit Tracing'],
    samplePayloadSnippet: `{
  "agentId": "agent-lead-qualifier",
  "toolSet": ["CRMQuery", "EnrichmentAPI", "CalendarScheduler"],
  "maxAutonomousSteps": 5
}`
  },
  {
    id: 'automation',
    order: 3,
    name: 'AUTOMATION',
    shortRole: 'Processes & Workflows',
    summary: 'Event-driven orchestration, webhook pipelines, and cross-system synchronization.',
    detailedDescription: 'The operational nervous system connecting disparate databases, legacy software, third-party SaaS, and AI agents. It handles background job queues, webhook idempotency, schedule-based jobs, and real-time state synchronization.',
    keyComponents: [
      'Event-driven message routing and dead-letter queues',
      'Bidirectional CRM, ERP, and payment gateway sync',
      'Custom webhooks with automated cryptographic verification',
      'Fault-tolerant retry schedules and distributed lock managers'
    ],
    techStack: ['Apache Kafka', 'RabbitMQ', 'Temporal.io', 'BullMQ / Redis', 'Node.js'],
    protocols: ['AMQP', 'Webhooks / HMAC-SHA256', 'Cron Schedulers'],
    samplePayloadSnippet: `{
  "event": "invoice.generated",
  "idempotencyKey": "inv_9831a2",
  "triggerAgents": ["agent-gl-reconciliation"]
}`
  },
  {
    id: 'data',
    order: 4,
    name: 'DATA',
    shortRole: 'Structured Business Information',
    summary: 'High-throughput lakehouses, relational stores, vector databases, and real-time cache.',
    detailedDescription: 'The persistent, high-integrity data backbone. We design robust relational schemas, columnar analytical warehouses, hybrid vector stores for semantic search, and ultra-fast in-memory caches designed for sub-millisecond lookups.',
    keyComponents: [
      'ACID-compliant relational engines (PostgreSQL / Cloud SQL)',
      'Columnar analytical databases for OLAP workloads (ClickHouse / BigQuery)',
      'Vector databases for semantic embeddings (Qdrant / pgvector)',
      'Distributed Redis clusters for state caching & rate limiting'
    ],
    techStack: ['PostgreSQL', 'ClickHouse', 'Qdrant', 'Redis', 'dbt', 'BigQuery'],
    protocols: ['SQL / pgproto', 'REST', 'gRPC', 'Parquet / Arrow'],
    samplePayloadSnippet: `{
  "storageType": "hybrid_relational_vector",
  "replication": "multi_region_active_passive",
  "encryption": "AES-256-GCM"
}`
  },
  {
    id: 'analytics',
    order: 5,
    name: 'ANALYTICS',
    shortRole: 'Insights & Decisions',
    summary: 'Streaming telemetry, anomaly detection, predictive forecasting, and BI dashboards.',
    detailedDescription: 'Transforming raw transactional and behavioral data streams into high-fidelity decision metrics. We build low-latency analytical queries, root-cause anomaly detectors, and executive visualization layers that provide continuous operational visibility.',
    keyComponents: [
      'Sub-50ms aggregated time-series query engines',
      'Automated root-cause anomaly detection algorithms',
      'Predictive trend forecasting and statistical modeling',
      'Role-tailored KPI views with instant data exports'
    ],
    techStack: ['Apache Arrow', 'ClickHouse', 'DuckDB', 'Vega-Lite', 'Chart.js', 'React'],
    protocols: ['Server-Sent Events (SSE)', 'WebSocket Streams', 'REST OLAP'],
    samplePayloadSnippet: `{
  "queryMetric": "conversion_velocity_by_cohort",
  "aggregation": "p95_duration_seconds",
  "window": "30d"
}`
  },
  {
    id: 'applications',
    order: 6,
    name: 'BUSINESS APPLICATIONS',
    shortRole: 'Tools People Actually Use',
    summary: 'High-performance web apps, mobile portals, CRM/ERP interfaces, and client dashboards.',
    detailedDescription: 'The user-facing layer where humans and technology interact effortlessly. We build accessible, lightning-fast, keyboard-navigable web applications and administrative suites using modern component architectures, type safety, and uncompromising UX design.',
    keyComponents: [
      'Single Page Applications (React / TypeScript / Tailwind CSS)',
      'Granular role-based access control (RBAC) & Single Sign-On (SSO)',
      'Offline-capable progressive web apps with background sync',
      'Fluid interactive dashboards with keyboard shortcuts & fast command palettes'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Next.js', 'Lucide'],
    protocols: ['HTTPS / TLS 1.3', 'WSS', 'OAuth2 / OIDC'],
    samplePayloadSnippet: `{
  "userRole": "EXECUTIVE_ADMIN",
  "featuresUnlocked": ["live_telemetry", "agent_override", "gl_export"]
}`
  }
];

export interface EngineeringPrinciple {
  title: string;
  tagline: string;
  description: string;
  iconName: string;
}

export const ENGINEERING_PRINCIPLES: EngineeringPrinciple[] = [
  {
    title: 'Deterministic Over Stochastic',
    tagline: 'Precision engineering in an era of probabilistic AI.',
    description: 'We never let unconstrained AI touch sensitive business operations. Every agent is wrapped in strict schema validation, deterministic fallback logic, and unit-tested safety boundaries.',
    iconName: 'ShieldCheck'
  },
  {
    title: 'Event-Driven Scalability',
    tagline: 'Decoupled systems that handle burst loads effortlessly.',
    description: 'Our architectures rely on asynchronous event queues, microservices, and idempotency guarantees so single-point bottlenecks never take down your core business operations.',
    iconName: 'Workflow'
  },
  {
    title: 'Zero Vendor Lock-In',
    tagline: 'You own 100% of your source code, models, and data.',
    description: 'We engineer on open-source standards, portable Docker containers, and standard relational databases. You are never trapped in proprietary black-box ecosystems.',
    iconName: 'Layers'
  },
  {
    title: 'Strict Type Safety & Observability',
    tagline: 'End-to-end typing from database schemas to UI components.',
    description: 'TypeScript, OpenAPI specs, and structured logging guarantee that runtime bugs are caught during compilation rather than in production environments.',
    iconName: 'Code2'
  },
  {
    title: 'Air-Gapped & Enterprise Secure',
    tagline: 'Zero data retention and strict compliance by design.',
    description: 'From SOC2 readiness to HIPAA/GDPR compliance and private VPC LLM deployments, your proprietary data never leaks into public training datasets.',
    iconName: 'Lock'
  },
  {
    title: 'Sub-Second Viewport Performance',
    tagline: 'Blazing fast user experiences with zero layout shifts.',
    description: 'We obsess over client-side bundle size, server-side caching, and render cycles to ensure your digital applications respond in under 100 milliseconds.',
    iconName: 'Zap'
  }
];
