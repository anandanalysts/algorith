export interface SolutionItem {
  id: string;
  title: string;
  icon: string;
  problem: string;
  approach: string;
  relevantProducts: string[];
}

export const SOLUTIONS: SolutionItem[] = [
  {
    id: 'grow-revenue',
    title: 'Grow Revenue',
    icon: '🚀',
    problem: 'Stagnant sales pipelines, unoptimized checkout flows, and poor conversion tracking limit top-line business growth.',
    approach: 'We deploy high-conversion headless checkout engines, automated sales tracking, and real-time revenue analytics to accelerate inbound conversions.',
    relevantProducts: ['ALGorith Cart', 'ALGorith CRM', 'ALGorith Analytics']
  },
  {
    id: 'automate-operations',
    title: 'Automate Operations',
    icon: '⚡',
    problem: 'Manual data entry, repetitive administrative tasks, and disconnected software systems create operational bottlenecks.',
    approach: 'We implement event-driven workflow automation, autonomous worker agents, and seamless enterprise system integrations.',
    relevantProducts: ['ALGorith Automation', 'ALGorith AI Agents', 'Founder OS']
  },
  {
    id: 'manage-customers',
    title: 'Manage Customers',
    icon: '🤝',
    problem: 'Scattered customer communications and lack of real-time lead context result in missed follow-ups and churned accounts.',
    approach: 'We provide context-aware relationship engines with continuous lead enrichment, sentiment scoring, and automated pipeline progression.',
    relevantProducts: ['ALGorith CRM', 'ALGorith Cowork']
  },
  {
    id: 'scale-marketing',
    title: 'Scale Marketing',
    icon: '📈',
    problem: 'Fragmented marketing channels and manual social posting lead to low brand visibility and high customer acquisition costs.',
    approach: 'We deploy multi-channel brand orchestration, autonomous publishing workflows, and digital growth automation suites.',
    relevantProducts: ['ALGorith Social', 'Digital Growth Services']
  },
  {
    id: 'understand-data',
    title: 'Understand Data',
    icon: '📊',
    problem: 'Siloed spreadsheets and lack of clear dashboards prevent leadership from making fast, data-backed decisions.',
    approach: 'We build centralized predictive business intelligence dashboards, anomaly detection models, and unified data pipelines.',
    relevantProducts: ['ALGorith Analytics', 'ALGorith AI']
  },
  {
    id: 'adopt-ai',
    title: 'Adopt AI',
    icon: '🧠',
    problem: 'Uncertainty around AI implementation and lack of proprietary data integration lead to stalled AI initiatives.',
    approach: 'We architect enterprise-grade RAG frameworks, AI assistants, and secure semantic knowledge retrieval systems.',
    relevantProducts: ['ALGorith AI', 'AI & Automation Consulting']
  },
  {
    id: 'build-digital-products',
    title: 'Build Digital Products',
    icon: '💻',
    problem: 'Slow development cycles and rigid legacy codebases prevent businesses from launching modern web apps and SaaS platforms.',
    approach: 'We engineer high-performance web applications, robust APIs, and production-grade MVPs with rigorous software standards.',
    relevantProducts: ['Founder OS', 'Software Development Services']
  }
];

export interface ServiceItem {
  id: string;
  title: string;
  icon: string;
  problem: string;
  solution: string;
  businessOutcome: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'ai-automation',
    title: 'AI & Automation',
    icon: '⚡',
    problem: 'Manual data entry and repetitive operational bottlenecks drain team productivity and slow down business growth.',
    solution: 'Deploy autonomous AI agents, workflow automation pipelines, and intelligent AI integrations connecting your core software.',
    businessOutcome: '70% reduction in manual overhead and 24/7 autonomous process execution.'
  },
  {
    id: 'software-dev',
    title: 'Software Development',
    icon: '💻',
    problem: 'Rigid legacy tools and slow development cycles prevent businesses from shipping high-performance digital products.',
    solution: 'Build robust web applications, enterprise SaaS platforms, custom business software, and scalable APIs with engineering rigor.',
    businessOutcome: 'Accelerated time-to-market and secure, resilient digital products built to scale.'
  },
  {
    id: 'data-analytics',
    title: 'Data & Analytics',
    icon: '📊',
    problem: 'Siloed data prevents executive teams from gaining real-time visibility into revenue, customer behavior, and operational health.',
    solution: 'Implement centralized business intelligence dashboards, predictive analytics models, and decision intelligence pipelines.',
    businessOutcome: 'Instant, data-backed strategic decisions and proactive anomaly detection.'
  },
  {
    id: 'digital-transformation',
    title: 'Digital Transformation',
    icon: '🔄',
    problem: 'Outdated legacy systems and disconnected spreadsheets create operational drag and high maintenance friction.',
    solution: 'Comprehensive process digitization, legacy system modernization, and seamless enterprise system integration.',
    businessOutcome: 'Future-proofed operational agility and streamlined cross-department workflows.'
  },
  {
    id: 'digital-growth',
    title: 'Digital Growth',
    icon: '📈',
    problem: 'Low digital visibility and fragmented marketing channels result in high customer acquisition costs and stagnant growth.',
    solution: 'Strategic digital marketing automation, multi-channel brand orchestration, and high-conversion e-commerce solutions.',
    businessOutcome: 'Scalable customer acquisition pipelines and heightened brand authority.'
  },
  {
    id: 'technology-consulting',
    title: 'Technology Consulting',
    icon: '🏢',
    problem: 'Uncertainty around AI adoption, tech stack selection, and automation strategy leads to wasted R&D capital.',
    solution: 'Expert advisory on AI adoption, technology strategy, product roadmap development, and workflow automation roadmaps.',
    businessOutcome: 'Clear technology roadmap, optimized R&D spend, and competitive market positioning.'
  }
];

export interface ProductItem {
  id: string;
  name: string;
  category: 'Platform' | 'Automation' | 'AI & Data' | 'Operations' | 'Creative';
  tagline: string;
  description: string;
  status: 'IN DEVELOPMENT' | 'COMING SOON' | 'LIVE APP' | 'LIVE PREVIEW';
  liveUrl?: string;
  isStrategicFuture?: boolean;
  groupName: 'ALGorith Business' | 'ALGorith AI' | 'ALGorith Learning';
}

export interface EcosystemGroup {
  name: string;
  badge: string;
  subtitle: string;
  description: string;
  products: {
    id: string;
    name: string;
    valueProp: string;
    primaryUseCase: string;
    status: 'IN DEVELOPMENT' | 'COMING SOON' | 'LIVE APP';
    liveUrl?: string;
    isStrategicFuture?: boolean;
  }[];
}

export const ECOSYSTEM_GROUPS: EcosystemGroup[] = [
  {
    name: 'ALGorith Business',
    badge: 'OPERATIONS & ENTERPRISE SUITE',
    subtitle: 'Unified Command & Commercial Systems',
    description: 'Resilient operational applications designed to orchestrate founders, customer pipelines, brand engagement, team workspaces, and commercial transactions.',
    products: [
      {
        id: 'founder-os',
        name: 'Founder OS',
        valueProp: 'Executive Command Center',
        primaryUseCase: 'Unified real-time management of roadmaps, metrics, equity, and strategic operations for visionary founders.',
        status: 'LIVE APP',
        liveUrl: 'https://algorithfos.lovable.app'
      },
      {
        id: 'crm',
        name: 'CRM',
        valueProp: 'Context-Aware Relationship Engine',
        primaryUseCase: 'Intelligent customer relationship management with continuous lead enrichment, sentiment scoring, and automated pipeline progression.',
        status: 'LIVE APP',
        liveUrl: 'https://algocrm.netlify.app/'
      },
      {
        id: 'social',
        name: 'Social',
        valueProp: 'Multi-Channel Brand Orchestration',
        primaryUseCase: 'Autonomous multi-platform publishing, contextual audience engagement, and real-time social sentiment analytics.',
        status: 'LIVE APP',
        liveUrl: 'https://algosocial.netlify.app/'
      },
      {
        id: 'cowork',
        name: 'Cowork',
        valueProp: 'Autonomous Team Workspace & Real-Time Sync',
        primaryUseCase: 'Decentralized team collaboration, live artifact co-authoring, and automated meeting orchestration for distributed teams.',
        status: 'IN DEVELOPMENT',
        isStrategicFuture: true
      },
      {
        id: 'cart',
        name: 'Cart',
        valueProp: 'High-Conversion Headless Checkout Engine',
        primaryUseCase: 'Frictionless multi-currency checkouts, dynamic tax calculation, and instant payment reconciliation for digital storefronts.',
        status: 'IN DEVELOPMENT'
      }
    ]
  },
  {
    name: 'ALGorith AI',
    badge: 'INTELLIGENCE & AUTOMATION LAYER',
    subtitle: 'Agentic Frameworks & Enterprise Intelligence',
    description: 'Next-generation neural and automation infrastructure powering autonomous decision-making, predictive data insights, and multi-step worker agents.',
    products: [
      {
        id: 'ai-core',
        name: 'ALGorith AI',
        valueProp: 'Enterprise Agentic Framework & RAG Engine',
        primaryUseCase: 'Deep enterprise data silo ingestion and context-aware semantic knowledge retrieval for secure internal teams.',
        status: 'IN DEVELOPMENT',
        isStrategicFuture: true
      },
      {
        id: 'ai-agents',
        name: 'AI Agents',
        valueProp: 'Autonomous Multi-Step Worker Agents',
        primaryUseCase: 'Self-governing agent networks executing complex multi-system operations with human-in-the-loop validation checkpoints.',
        status: 'IN DEVELOPMENT',
        isStrategicFuture: true
      },
      {
        id: 'automation',
        name: 'Automation',
        valueProp: 'Event-Driven Workflow Orchestration',
        primaryUseCase: 'Resilient webhook meshes and automated API triggers connecting disparate enterprise software without manual data entry.',
        status: 'IN DEVELOPMENT'
      },
      {
        id: 'analytics',
        name: 'Analytics',
        valueProp: 'Predictive Business Intelligence Suite',
        primaryUseCase: 'Real-time revenue forecasting, customer churn anomaly detection, and automated operational metric dashboards.',
        status: 'IN DEVELOPMENT'
      }
    ]
  },
  {
    name: 'ALGorith Learning',
    badge: 'KNOWLEDGE & SKILLS ECOSYSTEM',
    subtitle: 'Intelligent Upskilling & Assessment Platforms',
    description: 'Specialized cognitive frameworks designed for continuous professional assessment, interview readiness, and corporate knowledge graph indexing.',
    products: [
      {
        id: 'prep',
        name: 'Prep',
        valueProp: 'Adaptive AI Technical Assessment Engine',
        primaryUseCase: 'Dynamic skill evaluation, mock technical interview simulation, and instant remediation feedback for engineering talent.',
        status: 'COMING SOON'
      },
      {
        id: 'learning',
        name: 'Learning',
        valueProp: 'Corporate Knowledge Graph & Upskilling',
        primaryUseCase: 'Continuous employee capability mapping, automated training paths, and company documentation semantic indexing.',
        status: 'COMING SOON'
      }
    ]
  }
];

export const PRODUCTS: ProductItem[] = [
  {
    id: 'founder-os',
    name: 'ALGorith Founder OS',
    category: 'Platform',
    tagline: 'Executive Command Center',
    description: 'Unified command suite for visionary founders to manage roadmaps, metrics, equity, and strategic operations in real time.',
    status: 'LIVE APP',
    liveUrl: 'https://algorithfos.lovable.app',
    groupName: 'ALGorith Business'
  },
  {
    id: 'crm',
    name: 'ALGorith CRM',
    category: 'Automation',
    tagline: 'Context-Aware Relationship Engine',
    description: 'Intelligent customer relationship system with continuous lead enrichment, sentiment scoring, and automated pipeline progression.',
    status: 'LIVE APP',
    liveUrl: 'https://algocrm.netlify.app/',
    groupName: 'ALGorith Business'
  },
  {
    id: 'social',
    name: 'ALGorith Social',
    category: 'Automation',
    tagline: 'Multi-Channel Brand Orchestration',
    description: 'Autonomous multi-platform publishing, contextual audience engagement, and real-time social sentiment analytics.',
    status: 'LIVE APP',
    liveUrl: 'https://algosocial.netlify.app/',
    groupName: 'ALGorith Business'
  },
  {
    id: 'cowork',
    name: 'ALGorith Cowork',
    category: 'Platform',
    tagline: 'Autonomous Team Workspace & Real-Time Sync',
    description: 'Decentralized team collaboration, live artifact co-authoring, and automated meeting orchestration for distributed teams.',
    status: 'IN DEVELOPMENT',
    isStrategicFuture: true,
    groupName: 'ALGorith Business'
  },
  {
    id: 'cart',
    name: 'ALGorith Cart',
    category: 'Operations',
    tagline: 'High-Conversion Headless Checkout Engine',
    description: 'Frictionless multi-currency checkouts, dynamic tax calculation, and instant payment reconciliation.',
    status: 'IN DEVELOPMENT',
    groupName: 'ALGorith Business'
  },
  {
    id: 'ai-core',
    name: 'ALGorith AI',
    category: 'AI & Data',
    tagline: 'Enterprise Agentic Framework & RAG Engine',
    description: 'Enterprise AI assistant and context-aware RAG framework tailored for deep enterprise data silos.',
    status: 'IN DEVELOPMENT',
    isStrategicFuture: true,
    groupName: 'ALGorith AI'
  },
  {
    id: 'ai-agents',
    name: 'ALGorith AI Agents',
    category: 'AI & Data',
    tagline: 'Autonomous Multi-Step Worker Agents',
    description: 'Self-governing agent networks executing complex multi-system operations with human-in-the-loop checkpoints.',
    status: 'IN DEVELOPMENT',
    isStrategicFuture: true,
    groupName: 'ALGorith AI'
  },
  {
    id: 'automation',
    name: 'ALGorith Automation',
    category: 'Automation',
    tagline: 'Event-Driven Workflow Orchestration',
    description: 'Resilient webhook meshes and automated API triggers connecting disparate enterprise software.',
    status: 'IN DEVELOPMENT',
    groupName: 'ALGorith AI'
  },
  {
    id: 'analytics',
    name: 'ALGorith Analytics',
    category: 'AI & Data',
    tagline: 'Predictive Business Intelligence Suite',
    description: 'Real-time revenue forecasting, anomaly detection, and automated operational metric dashboards.',
    status: 'IN DEVELOPMENT',
    groupName: 'ALGorith AI'
  },
  {
    id: 'prep',
    name: 'ALGorith Prep',
    category: 'AI & Data',
    tagline: 'Adaptive AI Technical Assessment Engine',
    description: 'Dynamic skill evaluation, mock technical interview simulation, and instant remediation feedback.',
    status: 'COMING SOON',
    groupName: 'ALGorith Learning'
  },
  {
    id: 'learning',
    name: 'ALGorith Learning',
    category: 'AI & Data',
    tagline: 'Corporate Knowledge Graph & Upskilling',
    description: 'Interactive employee upskilling engine powered by dynamic company documentation and semantic AI search.',
    status: 'COMING SOON',
    groupName: 'ALGorith Learning'
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
