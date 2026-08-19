export interface ProductItem {
  id: string;
  name: string;
  category: 'Platform' | 'Automation' | 'AI & Data' | 'Operations' | 'Creative';
  tagline: string;
  description: string;
  status: 'IN DEVELOPMENT' | 'COMING SOON' | 'LIVE APP' | 'LIVE PREVIEW';
  liveUrl?: string;
}

export const PRODUCTS: ProductItem[] = [
  {
    id: 'founder-os',
    name: 'ALGorith Founder OS',
    category: 'Platform',
    tagline: 'Executive Command Center',
    description: 'Unified command suite for visionary founders to manage roadmaps, metrics, equity, and strategic operations in real time.',
    status: 'LIVE APP',
    liveUrl: 'https://algorithfos.lovable.app'
  },
  {
    id: 'crm',
    name: 'ALGorith CRM',
    category: 'Automation',
    tagline: 'Context-Aware Relationship Engine',
    description: 'Intelligent customer relationship system with continuous lead enrichment, sentiment scoring, and automated pipeline progression.',
    status: 'LIVE APP',
    liveUrl: 'https://algocrm.netlify.app/'
  },
  {
    id: 'ai-core',
    name: 'ALGorith AI',
    category: 'AI & Data',
    tagline: 'Enterprise Agentic Framework',
    description: 'Enterprise AI assistant and context-aware RAG framework tailored for deep enterprise data silos and knowledge retrieval.',
    status: 'IN DEVELOPMENT'
  },
  {
    id: 'inventory',
    name: 'ALGorith Inventory',
    category: 'Operations',
    tagline: 'Predictive Stock & Supply Engine',
    description: 'Autonomous inventory synchronization, predictive stock reordering, and multi-warehouse supply-demand reconciliation.',
    status: 'IN DEVELOPMENT'
  },
  {
    id: 'prompt-eng',
    name: 'ALGorith Prompt Engineering',
    category: 'AI & Data',
    tagline: 'LLM Optimization & Evaluation Suite',
    description: 'Enterprise prompt benchmarking, structured output validation, token cost efficiency, and regression testing harness.',
    status: 'IN DEVELOPMENT'
  },
  {
    id: 'social',
    name: 'ALGorith Social',
    category: 'Automation',
    tagline: 'Multi-Channel Brand Orchestration',
    description: 'Autonomous multi-platform publishing, contextual audience engagement, and real-time social sentiment analytics.',
    status: 'LIVE APP',
    liveUrl: 'https://algosocial.netlify.app/'
  },
  {
    id: 'prep',
    name: 'ALGorith Prep',
    category: 'AI & Data',
    tagline: 'Intelligent Skill Assessment',
    description: 'Adaptive AI-driven technical assessment and interview readiness simulator with contextual real-time feedback.',
    status: 'COMING SOON'
  },
  {
    id: 'pm',
    name: 'ALGorith Project Management',
    category: 'Platform',
    tagline: 'Autonomous Sprint Orchestrator',
    description: 'Continuous milestone tracking, automated blocker triaging, and AI-assisted sprint capacity forecasting.',
    status: 'COMING SOON'
  },
  {
    id: 'hr',
    name: 'ALGorith HR Solutions',
    category: 'Operations',
    tagline: 'Smart Talent & Culture Pipeline',
    description: 'Intelligent resume matching, automated onboarding orchestration, and internal skill development mapping.',
    status: 'COMING SOON'
  },
  {
    id: 'graphic-studio',
    name: 'ALGorith Graphic Studio',
    category: 'Creative',
    tagline: 'Generative Design & Brand Sandbox',
    description: 'High-velocity design automation platform generating brand-compliant marketing collateral and visual layouts.',
    status: 'COMING SOON'
  },
  {
    id: 'learning',
    name: 'ALGorith Learning',
    category: 'AI & Data',
    tagline: 'Corporate Knowledge Graph',
    description: 'Interactive employee upskilling engine powered by dynamic company documentation and semantic AI search.',
    status: 'COMING SOON'
  }
];

export interface IndustryItem {
  icon: string;
  title: string;
  desc: string;
  focus: string[];
}

export const INDUSTRIES: IndustryItem[] = [
  {
    icon: '🚀',
    title: 'Startups',
    desc: 'Rapid MVP execution, scalable initial architectures, and AI feature integration to accelerate market validation.',
    focus: ['Rapid MVP Build', 'Zero-to-One Architecture', 'AI Prototype Sprints']
  },
  {
    icon: '🏢',
    title: 'SMEs & Scaleups',
    desc: 'Process automation, CRM integration, and operational efficiency upgrades designed for fast growth.',
    focus: ['Legacy Modernization', 'Workflow Automation', 'Executive Dashboards']
  },
  {
    icon: '🛍️',
    title: 'E-commerce',
    desc: 'Inventory pipeline automation, customer AI support agents, and predictive demand analytics.',
    focus: ['Inventory Automation', 'AI Customer Care', 'Checkout Conversion']
  },
  {
    icon: '⚖️',
    title: 'Professional Services',
    desc: 'Document automation, client portals, and workflow orchestration for law firms, accounting, and consulting.',
    focus: ['Document Parsing', 'Secure Client Portals', 'Automated Billing']
  },
  {
    icon: '🚚',
    title: 'Operations & Logistics',
    desc: 'Real-time telemetry tracking, automated dispatch orchestration, and warehouse throughput optimization.',
    focus: ['Dispatch Orchestration', 'Fleet Telemetry', 'Supply Chain APIs']
  },
  {
    icon: '🌐',
    title: 'Digital Businesses',
    desc: 'High-concurrency SaaS platforms, API infrastructure, and real-time subscription intelligence.',
    focus: ['Multi-tenant SaaS', 'API Microservices', 'Autonomous Billing']
  }
];

export interface InsightItem {
  id: string;
  tag: string;
  readTime: string;
  title: string;
  summary: string;
  date: string;
}

export const INSIGHTS: InsightItem[] = [
  {
    id: 'rag-architecture',
    tag: 'ARCHITECTURE',
    readTime: '4 min read',
    title: 'Engineering Deterministic RAG Systems for Enterprise Data',
    summary: 'How we eliminate hallucination risks through hybrid vector-keyword retrieval and reciprocal rank fusion.',
    date: 'August 2026'
  },
  {
    id: 'event-driven-automation',
    tag: 'SYSTEMS',
    readTime: '5 min read',
    title: 'Moving from Cron Polling to True Event-Driven Autonomous Pipelines',
    summary: 'Architecting resilient webhook meshes and message queues that survive upstream rate limits and network degradation.',
    date: 'July 2026'
  },
  {
    id: 'ai-agents-vs-rules',
    tag: 'STRATEGY',
    readTime: '3 min read',
    title: 'Autonomous Agents vs. Deterministic Rules: The Hybrid Formula',
    summary: 'Why the most scalable enterprise systems combine constrained state machines with generative agent intelligence.',
    date: 'June 2026'
  }
];
