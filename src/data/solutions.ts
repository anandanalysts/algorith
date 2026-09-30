export interface SolutionGroup {
  id: string;
  title: string;
  categoryTag: string;
  iconName: string;
  headline: string;
  problem: string;
  solution: string;
  businessImpact: string;
  capabilities: {
    title: string;
    description: string;
    techTags: string[];
  }[];
  architectureHighlights: string[];
  sampleDeliverables: string[];
  caseSnippet: {
    clientType: string;
    outcome: string;
    metric: string;
  };
}

export const SOLUTIONS_DATA: SolutionGroup[] = [
  {
    id: 'ai-automation',
    title: 'AI & Automation',
    categoryTag: 'Autonomous Intelligence',
    iconName: 'Cpu',
    headline: 'Deploy intelligent agentic systems and remove repetitive operational drag.',
    problem: 'Companies lose thousands of engineering and operational hours on manual data entry, disconnected system reconciliation, repetitive triage, and slow decision cycles.',
    solution: 'ALGorith engineers deterministic multi-agent loops, semantic RAG systems, and self-healing automation workflows that run 24/7 with human-in-the-loop oversight.',
    businessImpact: 'Up to 75% reduction in manual processing time and error-free operational throughput at zero marginal labor cost.',
    capabilities: [
      {
        title: 'Autonomous AI Agents',
        description: 'Multi-agent frameworks equipped with memory, tool calling, and strict guardrails to handle customer inquiries, document processing, and system operations.',
        techTags: ['LLM Orchestration', 'Tool Execution', 'Vector Memory', 'Guardrails']
      },
      {
        title: 'Workflow & Integration Automation',
        description: 'Event-driven message queues and webhooks connecting disparate legacy tools, CRMs, ERPs, billing systems, and communication channels.',
        techTags: ['Event Queues', 'Kafka/RabbitMQ', 'Webhook Orchestration', 'ETL Pipes']
      },
      {
        title: 'Intelligent Document & Data Extraction',
        description: 'High-accuracy OCR and multimodal LLM extraction for complex PDFs, contracts, invoices, and unstructured reports into structured JSON.',
        techTags: ['Multimodal AI', 'Structured JSON', 'Schema Validation', 'Compliance Stamp']
      },
      {
        title: 'Predictive Process Optimization',
        description: 'Automated bottleneck detection, algorithmic load balancing, and autonomous anomaly alerting before business downtime occurs.',
        techTags: ['Anomaly Detection', 'Time Series Analysis', 'Self-Healing Loops']
      }
    ],
    architectureHighlights: [
      'Sub-200ms agent execution latency using lightweight inference routing',
      'Dual-layer verification: deterministic validation checks before database commits',
      'Full audit trails with step-by-step reasoning logs'
    ],
    sampleDeliverables: [
      'Autonomous Customer & Vendor Support Agent',
      'Automated Financial Reconciliation & Invoicing Pipeline',
      'Real-Time Lead Qualification & CRM Routing Engine'
    ],
    caseSnippet: {
      clientType: 'Global Logistics Provider',
      outcome: 'Autonomous freight document parsing & automated customs submission pipeline.',
      metric: '89% Time Saved'
    }
  },
  {
    id: 'software-business-systems',
    title: 'Software & Business Systems',
    categoryTag: 'Engineering & Platforms',
    iconName: 'Code2',
    headline: 'Custom cloud applications, enterprise SaaS, CRM, and ERP engineered for durability.',
    problem: 'Off-the-shelf software is bloated, inflexible, expensive, and fails to match unique business logic, forcing companies to bend their operations to fit the tool.',
    solution: 'We architect bespoke web platforms, high-throughput microservices, robust internal tools, and modular CRM/ERP backends that scale without technical debt.',
    businessImpact: 'Complete ownership of your digital IP, lightning-fast interfaces, and software tailored 100% to your proprietary workflows.',
    capabilities: [
      {
        title: 'Enterprise Web Applications & SaaS',
        description: 'End-to-end fullstack platforms with React, TypeScript, Node/Go backends, rock-solid security, and resilient distributed databases.',
        techTags: ['React / Next.js', 'TypeScript', 'Go / Node.js', 'PostgreSQL / Redis']
      },
      {
        title: 'Custom CRM & ERP Engines',
        description: 'Tailored customer relationship and enterprise resource planning systems designed specifically around your sales cycles and supply chain logic.',
        techTags: ['Custom Data Models', 'RBAC Security', 'Audit Trails', 'REST / GraphQL']
      },
      {
        title: 'Internal Tools & Operations Portals',
        description: 'Intuitive back-office administration portals, operations dashboards, and multi-tenant management consoles.',
        techTags: ['Role Hierarchy', 'High-Density Tables', 'Real-Time Sync', 'Fast Search']
      },
      {
        title: 'Scalable Microservices & APIs',
        description: 'High-availability RESTful and gRPC API ecosystems designed for high concurrency, zero downtime deployments, and seamless third-party consumption.',
        techTags: ['gRPC / REST', 'Docker / Kubernetes', 'API Gateways', 'Rate Limiting']
      }
    ],
    architectureHighlights: [
      'Clean modular architecture with zero vendor lock-in',
      'Strict TypeScript typing across frontend and backend boundaries',
      'Automated CI/CD pipelines with automated unit, integration, and load tests'
    ],
    sampleDeliverables: [
      'Custom Multi-Tenant B2B SaaS Platform',
      'Tailored ERP System with Live Multi-Warehouse Inventory',
      'Executive Client Portal with Granular Permissions'
    ],
    caseSnippet: {
      clientType: 'Manufacturing & Distribution Group',
      outcome: 'Replaced legacy monolith with modular cloud ERP & unified operations portal.',
      metric: '3.4x Faster Ops'
    }
  },
  {
    id: 'data-analytics',
    title: 'Data & Analytics',
    categoryTag: 'Decision Intelligence',
    iconName: 'BarChart3',
    headline: 'Transform siloed datasets into real-time visual telemetry and actionable intelligence.',
    problem: 'Leadership operates in the dark when revenue, customer metrics, inventory, and marketing data are locked in disparate spreadsheets and sluggish databases.',
    solution: 'ALGorith deploys unified streaming pipelines, data lakehouses, and low-latency interactive dashboards that deliver immediate clarity.',
    businessImpact: 'Zero-lag executive decision making, proactive churn prevention, and automated trend forecasting based on deterministic data.',
    capabilities: [
      {
        title: 'Real-Time Telemetry & Dashboards',
        description: 'Sub-second visual reporting interfaces tailored for executives, financial analysts, and operational team leads.',
        techTags: ['Interactive Dashboards', 'Sub-Second Queries', 'Tailored Visuals', 'Export Engines']
      },
      {
        title: 'Unified Data Pipelines & Lakehouses',
        description: 'Resilient ETL/ELT pipelines ingesting, cleansing, and normalizing structured and semi-structured data from hundreds of sources.',
        techTags: ['ETL/ELT', 'dbt', 'Snowflake / BigQuery', 'PostgreSQL / ClickHouse']
      },
      {
        title: 'Predictive Intelligence & Forecasting',
        description: 'Statistical modeling and ML pipelines predicting customer churn, seasonal demand fluctuations, and revenue trends.',
        techTags: ['Time-Series Models', 'Demand Forecasting', 'Churn Scoring', 'Confidence Bands']
      },
      {
        title: 'Natural Language Data Interfaces',
        description: 'AI-assisted SQL generation and text-to-chart interfaces allowing non-technical leaders to query complex databases intuitively.',
        techTags: ['Text-to-SQL', 'Semantic Layer', 'Granular Security', 'Instant Charting']
      }
    ],
    architectureHighlights: [
      'Single source of truth with automated schema validation and anomaly checks',
      'Columnar storage engine integration for lightning-fast aggregated queries',
      'Granular row-level data access security policies'
    ],
    sampleDeliverables: [
      'Enterprise Executive BI Dashboard & Financial Cockpit',
      'Unified Customer Telemetry & Lifetime Value Predictor',
      'Automated Inventory Optimization & Reorder Alert Engine'
    ],
    caseSnippet: {
      clientType: 'E-Commerce & Retail Conglomerate',
      outcome: 'Unified multi-channel sales lakehouse with real-time gross margin telemetry.',
      metric: '100% Real-Time'
    }
  },
  {
    id: 'digital-transformation',
    title: 'Digital Transformation',
    categoryTag: 'Modernization & Scale',
    iconName: 'Sparkles',
    headline: 'Modernize legacy infrastructure, optimize workflows, and engineer future-ready digital capabilities.',
    problem: 'Aging legacy systems, brittle on-premise infrastructure, and fragmented tech stacks stifle agility and create severe security risks.',
    solution: 'We guide end-to-end cloud migrations, decouple monolithic architectures, and implement modern digital ecosystems with zero operational downtime.',
    businessImpact: 'Substantial infrastructure cost savings, eliminated security vulnerabilities, and rapid agility for market opportunities.',
    capabilities: [
      {
        title: 'Legacy Monolith Modernization',
        description: 'Pragmatic refactoring and strangler-fig pattern migration from obsolete tech stacks to modern cloud-native architectures.',
        techTags: ['Strangler Migration', 'Cloud-Native', 'Zero-Downtime', 'Micro-Frontends']
      },
      {
        title: 'Cloud Infrastructure & DevOps',
        description: 'Terraform Infrastructure-as-Code (IaC), automated Kubernetes orchestration, FinOps cloud cost optimization, and CI/CD pipelines.',
        techTags: ['Terraform / IaC', 'AWS / GCP / Cloudflare', 'Docker / K8s', 'FinOps']
      },
      {
        title: 'Digital Customer Experiences',
        description: 'Modern, accessible, lightning-fast digital touchpoints, headless portals, and seamless omnichannel user journeys.',
        techTags: ['Headless Architecture', 'High Performance', 'Mobile-First', 'Accessibility']
      },
      {
        title: 'Systems & API Integration Architecture',
        description: 'Standardized enterprise service buses and unified API layers that harmonize communication across all business tools.',
        techTags: ['API Gateway', 'Unified Identity', 'OAuth / SAML', 'Message Brokers']
      }
    ],
    architectureHighlights: [
      'Comprehensive pre-migration audits and risk mitigation plans',
      'Infrastructure as code for 100% reproducible environments',
      'Enterprise security hardening with zero-trust network boundaries'
    ],
    sampleDeliverables: [
      'Cloud Modernization & Multi-Cloud Migration Strategy',
      'High-Conversion Headless Customer Portal',
      'Enterprise Single Sign-On (SSO) & Unified API Layer'
    ],
    caseSnippet: {
      clientType: 'Financial Services Enterprise',
      outcome: 'Modernized core transaction engine from on-premise servers to serverless cloud.',
      metric: '64% Cost Cut'
    }
  }
];
