import { LearningMaterial } from '../types/learning';

export const INITIAL_LEARNING_MATERIALS: LearningMaterial[] = [
  {
    id: 'mat-1',
    title: 'Enterprise AI & Autonomous Agent Architecture 2026',
    description: 'A comprehensive 84-page architectural blueprint for designing, deploying, and governing multi-agent autonomous workflows in enterprise environments.',
    fileType: 'ebook',
    type: 'ebook',
    category: 'Automation & Agents',
    tags: ['Autonomous Agents', 'RAG', 'System Architecture', 'LLMOps', 'Security'],
    fileFormat: 'PDF',
    fileSize: '14.2 MB',
    pageCount: 84,
    downloadCount: 1420,
    downloadsCount: 1420,
    uploadDate: '2026-08-15',
    uploadedAt: '2026-08-15',
    level: 'Advanced',
    isFeatured: true,
    author: 'Dr. Evelyn Vance & ALGorith Labs',
    authorDetails: {
      name: 'Dr. Evelyn Vance & ALGorith Labs',
      role: 'Principal AI Architect',
    },
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    downloadFileName: 'ALGorith-Enterprise-AI-Agent-Architecture-2026.pdf',
    previewContent: `# Enterprise AI & Autonomous Agent Architecture 2026
Prepared by ALGorith Technologies & Research Labs

## Executive Summary
Autonomous agents represent the largest leap in enterprise automation since service-oriented architectures. Unlike static workflows or single-shot LLM prompts, multi-agent mesh networks possess memory, tool access, recursive planning, and cross-system execution capabilities.

### Key Pillars:
1. Deterministic Safeguards & Human-in-the-Loop Thresholds
2. State Graphs & Distributed Memory Pools (Episodic & Semantic)
3. Event-driven Orchestration & Zero-Trust Tool Calling
4. Autonomous Cost-Governor & Latency Optimizer

## 1. Multi-Agent Coordination Mesh
When designing agent architectures:
- Define strict domain boundaries per agent
- Implement arbitration agents for conflicting intent resolution
- Isolate runtime environments via micro-virtualization

## 2. Guardrails & Evaluation Loops
Every generation step must pass through:
1. PII Redaction & Encryption at Rest
2. Grounding Verification against Enterprise Graph DB
3. Token Budget Throttle per Tenant`
  },
  {
    id: 'mat-2',
    title: 'Zero to Production: Event-Driven Automation with Webhooks & AI',
    description: 'Practical technical manual and reference guide for building high-throughput, error-resilient business automation pipelines with async queues.',
    fileType: 'document',
    type: 'document',
    category: 'Software Engineering',
    tags: ['Automation', 'APIs', 'Webhooks', 'Async Queues', 'DevOps'],
    fileFormat: 'DOCX',
    fileSize: '4.8 MB',
    pageCount: 42,
    downloadCount: 980,
    downloadsCount: 980,
    uploadDate: '2026-08-28',
    uploadedAt: '2026-08-28',
    level: 'Intermediate',
    isFeatured: true,
    author: 'Marcus Sterling (Head of Automation)',
    authorDetails: {
      name: 'Marcus Sterling',
      role: 'Head of Automation Engineering',
    },
    thumbnailUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
    downloadFileName: 'ALGorith-Event-Driven-Automation-Guide.docx',
    previewContent: `# Event-Driven Automation Blueprint
ALGorith Engineering Technical Standard Series

### 1. Ingestion & Idempotency
Every incoming webhook payload must be stamped with a cryptographic idempotency key stored in distributed Redis cache with a 48-hour TTL.

### 2. Backpressure Management
Decouple webhook reception from heavy processing using priority message queues (Kafka / RabbitMQ / SQS).

### 3. AI Enrichment Workers
Enqueue payloads for semantic categorization with async fallback models:
\`\`\`typescript
interface AutomationPayload {
  eventId: string;
  source: 'CRM' | 'ERP' | 'STRIPE';
  timestamp: number;
  data: Record<string, any>;
  idempotencyHash: string;
}
\`\`\`

### 4. Dead Letter Queue & Auto-Healing
If worker fails 3 consecutive retries with exponential jitter, route to triage supervisor agent.`
  },
  {
    id: 'mat-3',
    title: 'Emerging Tech 2027: Quantum Computing, Neuro-Tech & Spatial UI',
    description: 'High-resolution infographic and visual landscape map analyzing the convergence of quantum supremacy, neural interfaces, and spatial compute.',
    fileType: 'image',
    type: 'image',
    category: 'Emerging Tech',
    tags: ['Quantum', 'Spatial Computing', 'Neural Interfaces', 'Tech Radar', 'Infographic'],
    fileFormat: 'PNG',
    fileSize: '8.6 MB',
    downloadCount: 2310,
    downloadsCount: 2310,
    uploadDate: '2026-09-01',
    uploadedAt: '2026-09-01',
    level: 'Beginner',
    isFeatured: true,
    author: 'ALGorith Horizon Research',
    authorDetails: {
      name: 'ALGorith Horizon Research',
      role: 'Emerging Tech Strategists',
    },
    thumbnailUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80',
    downloadFileName: 'ALGorith-Emerging-Tech-Radar-2027.png',
    previewContent: `[ALGorith Emerging Tech Radar 2027-2030]
1. Quantum-Assisted Vector Indexing (Speedup factor: 42x)
2. Brain-Computer Sensory Telemetry in Industrial Robots
3. Spatial Computing Operating Systems (Spatial OS)
4. Carbon-Neutral Edge Inference Hardware Clusters`
  },
  {
    id: 'mat-4',
    title: 'Masterclass: Building Enterprise RAG & Vector Intelligence',
    description: 'Complete 45-minute video tutorial breaking down chunking strategies, hybrid vector-BM25 search, semantic reranking, and hallucination containment.',
    fileType: 'video',
    type: 'video',
    category: 'AI & LLMs',
    tags: ['Vector DB', 'RAG', 'Video Masterclass', 'Python', 'Embeddings'],
    fileFormat: 'MP4',
    fileSize: '420 MB',
    duration: '45 mins',
    downloadCount: 1840,
    downloadsCount: 1840,
    uploadDate: '2026-08-10',
    uploadedAt: '2026-08-10',
    level: 'Advanced',
    isFeatured: true,
    author: 'Kavita Rao (Staff ML Engineer)',
    authorDetails: {
      name: 'Kavita Rao',
      role: 'Staff ML Engineer',
    },
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    downloadFileName: 'ALGorith-RAG-Vector-Masterclass-Session.mp4',
    previewContent: `VIDEO CHAPTERS:
00:00 - Introduction to Enterprise RAG Challenges
05:12 - Chunking: Semantic vs Fixed Token with Overlap
12:45 - Hybrid Search: Reciprocal Rank Fusion (RRF) with BM25
22:10 - Cross-Encoder Reranking at Scale
33:40 - Guardrail Verification & Real-time Citation Highlighting
41:00 - Live Q&A and Deployment Checklist`
  },
  {
    id: 'mat-5',
    title: 'Executive Podcast: The Next Wave of Autonomous Business Operations',
    description: 'Deep-dive audio discussion on how modern CEOs and CTOs are restructuring entire operational cost models around AI-first agent systems.',
    fileType: 'audio',
    type: 'audio',
    category: 'Innovation & Strategy',
    tags: ['Podcast', 'Executive Strategy', 'ROI', 'Transformation', 'Audio'],
    fileFormat: 'MP3',
    fileSize: '32.4 MB',
    duration: '34 mins',
    downloadCount: 890,
    downloadsCount: 890,
    uploadDate: '2026-08-30',
    uploadedAt: '2026-08-30',
    level: 'Executive',
    author: 'ALGorith Leadership Dialogue',
    authorDetails: {
      name: 'ALGorith Leadership Dialogue',
      role: 'Technology Advisory Group',
    },
    thumbnailUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=600&q=80',
    downloadFileName: 'ALGorith-Podcast-Autonomous-Operations-Wave.mp3',
    previewContent: `AUDIO EPISODE #14:
Topic: Transitioning from Point Solutions to Unified AI Ecosystems
Speakers: ALGorith Executive Engineering Board
Topics Covered:
- Why point AI SaaS solutions create integration debt
- Calculating True Cost of Ownership for in-house LLM fine-tuning vs API pipelines
- The 90-day blueprint for deploying enterprise agents with verifiable ROI`
  },
  {
    id: 'mat-6',
    title: 'Production Python Agent Starter Toolkit (LangGraph + FastAPI)',
    description: 'Production-ready codebase including deterministic schema validation, Redis persistent session memory, rate-limiting middlewares, and Pytest coverage.',
    fileType: 'code',
    type: 'code',
    category: 'Automation & Agents',
    tags: ['Python', 'FastAPI', 'LangGraph', 'Docker', 'Open Source'],
    fileFormat: 'ZIP',
    fileSize: '1.2 MB',
    downloadCount: 3120,
    downloadsCount: 3120,
    uploadDate: '2026-09-02',
    uploadedAt: '2026-09-02',
    level: 'Intermediate',
    isFeatured: true,
    author: 'ALGorith Open Source Team',
    authorDetails: {
      name: 'ALGorith Open Source Team',
      role: 'Software Core Division',
    },
    thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    downloadFileName: 'algorith-python-agent-starter-kit.zip',
    previewContent: `PROJECT STRUCTURE:
algorith-agent-kit/
├── app/
│   ├── api/
│   │   ├── routes.py
│   │   └── middlewares.py
│   ├── agents/
│   │   ├── supervisor.py
│   │   └── memory_store.py
│   ├── schemas/
│   │   └── payload.py
│   └── main.py
├── tests/
│   └── test_agent_graph.py
├── Dockerfile
└── requirements.txt`
  },
  {
    id: 'mat-7',
    title: 'The AI-First Board Pitch: Enterprise Digital Transformation Deck',
    description: 'Editable 32-slide presentation template designed to help technical leaders present AI adoption, security governance, and budget allocations to the board.',
    fileType: 'deck',
    type: 'deck',
    category: 'Innovation & Strategy',
    tags: ['Pitch Deck', 'Board Presentation', 'PowerPoint', 'Strategy', 'Keynote'],
    fileFormat: 'PPTX',
    fileSize: '18.5 MB',
    pageCount: 32,
    downloadCount: 1650,
    downloadsCount: 1650,
    uploadDate: '2026-07-22',
    uploadedAt: '2026-07-22',
    level: 'Executive',
    author: 'ALGorith Advisory Practice',
    authorDetails: {
      name: 'ALGorith Advisory Practice',
      role: 'Enterprise Strategy Lead',
    },
    thumbnailUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80',
    downloadFileName: 'ALGorith-Board-Pitch-AI-Transformation.pptx',
    previewContent: `SLIDE OUTLINE:
1. The Executive Imperative: Software vs Intelligence
2. Where Traditional Workflows Break Under Scale
3. The 3-Tier Enterprise AI Stack: Ingestion, Graph, Reasoning
4. Security & Compliance Architecture: SOC2 & ISO 27001 Alignment
5. Projected 24-Month ROI & Cost Avoidance Models`
  },
  {
    id: 'mat-8',
    title: 'Prompt Engineering & Deterministic JSON Schema Reference Guide',
    description: 'Battle-tested prompting patterns for eliciting perfectly typed JSON objects, avoiding hallucinations, and chaining multi-step reasoning steps reliably.',
    fileType: 'document',
    type: 'document',
    category: 'Prompt Engineering',
    tags: ['Prompt Engineering', 'JSON Schema', 'Few-Shot', 'LLM Guardrails'],
    fileFormat: 'PDF',
    fileSize: '3.1 MB',
    pageCount: 28,
    downloadCount: 4200,
    downloadsCount: 4200,
    uploadDate: '2026-08-05',
    uploadedAt: '2026-08-05',
    level: 'Beginner',
    isFeatured: true,
    author: 'Siddharth Nair',
    authorDetails: {
      name: 'Siddharth Nair',
      role: 'Lead Prompt Engineer',
    },
    thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
    downloadFileName: 'ALGorith-Prompt-Engineering-Schema-Guide.pdf',
    previewContent: `# Deterministic Prompt Engineering Guidelines
Authored by Siddharth Nair, ALGorith Technologies

## Principle 1: Never Ask for Freeform Text When Structuring Output
Always specify rigid JSON schemas with strict field definitions and regex constraints.

## Principle 2: The CoT (Chain of Thought) Sandbox
Instruct the LLM to write reasoning within an unexposed \`<reasoning>\` tag before emitting the final json block.

## Principle 3: Negative Constraints
State explicitly what NOT to invent (e.g. "Do not infer dates not present in input").`
  },
  {
    id: 'mat-9',
    title: 'Modern Data Mesh & Real-time Analytics Architecture Blueprint',
    description: 'High-level architectural blueprint detailing how to transition from legacy monolithic databases to decoupled, domain-driven data meshes.',
    fileType: 'ebook',
    type: 'ebook',
    category: 'Data & Analytics',
    tags: ['Data Mesh', 'PostgreSQL', 'DuckDB', 'ClickHouse', 'Real-Time'],
    fileFormat: 'PDF',
    fileSize: '9.4 MB',
    pageCount: 56,
    downloadCount: 1120,
    downloadsCount: 1120,
    uploadDate: '2026-07-14',
    uploadedAt: '2026-07-14',
    level: 'Advanced',
    author: 'Elena Rostova (Data Infrastructure Lead)',
    authorDetails: {
      name: 'Elena Rostova',
      role: 'Data Infrastructure Lead',
    },
    thumbnailUrl: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80',
    downloadFileName: 'ALGorith-Data-Mesh-Architecture-Guide.pdf',
    previewContent: `# Modern Data Mesh & Streaming Analytics
ALGorith Technical Reference Architecture

1. Domain-Oriented Data Ownership
2. Self-Serve Data Infrastructure Platforms
3. Federated Computational Governance
4. Streaming Ingestion via Kafka & Iceberg Lakehouses`
  },
  {
    id: 'mat-10',
    title: 'Microservices & High-Availability Kubernetes Cluster Diagram',
    description: 'Full-resolution vector diagram illustrating multi-region failover, Istio service mesh, ingress controller routing, and stateful database sharding.',
    fileType: 'image',
    type: 'image',
    category: 'Software Engineering',
    tags: ['Kubernetes', 'Cloud Infrastructure', 'Microservices', 'DevOps', 'Diagram'],
    fileFormat: 'SVG',
    fileSize: '2.4 MB',
    downloadCount: 1980,
    downloadsCount: 1980,
    uploadDate: '2026-08-20',
    uploadedAt: '2026-08-20',
    level: 'Advanced',
    author: 'ALGorith Cloud Architecture Team',
    authorDetails: {
      name: 'ALGorith Cloud Architecture Team',
      role: 'DevOps & SRE Group',
    },
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    downloadFileName: 'ALGorith-Kubernetes-Architecture-Topology.svg',
    previewContent: `[High-Availability Kubernetes Topology Diagram]
- Global Anycast CDN -> Edge Ingress Load Balancer
- Dual-Zone Control Plane with Raft Consensus
- Microservices Mesh (gRPC Internal, REST/GraphQL External)
- Distributed Multi-Master PostgreSQL with PgBouncer Pooling`
  },
  {
    id: 'mat-11',
    title: 'Robotics & Edge AI: Computer Vision in Automated Warehousing',
    description: 'Technical whitepaper on deploying quantized YOLOv11 and spatial depth sensors on edge compute nodes for real-time item tracking and package sorting.',
    fileType: 'document',
    type: 'document',
    category: 'Robotics & IoT',
    tags: ['Robotics', 'Computer Vision', 'Edge AI', 'TensorRT', 'IoT'],
    fileFormat: 'PDF',
    fileSize: '6.7 MB',
    pageCount: 38,
    downloadCount: 840,
    downloadsCount: 840,
    uploadDate: '2026-08-18',
    uploadedAt: '2026-08-18',
    level: 'Intermediate',
    author: 'Dr. Hiroshi Tanaka',
    authorDetails: {
      name: 'Dr. Hiroshi Tanaka',
      role: 'Robotics Research Lead',
    },
    thumbnailUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80',
    downloadFileName: 'ALGorith-Edge-AI-Warehousing-Whitepaper.pdf',
    previewContent: `# Edge Computer Vision in Warehouse Robotics
Authored by Dr. Hiroshi Tanaka, ALGorith Edge Group

### Hardware Selection
- NVIDIA Jetson Orin Nano / AGX Orin
- Global Shutter Stereo Depth Cameras

### Model Optimization Pipeline
- INT8 Quantization via TensorRT
- Sub-5ms Latency at 60 FPS under varying light conditions`
  },
  {
    id: 'mat-12',
    title: 'The AI Engineering Cheatsheet: Transformers, Vectors & APIs',
    description: 'Quick-reference 2-page printable cheatsheet summarizing embedding dimensions, context window math, token pricing calculations, and common API parameters.',
    fileType: 'document',
    type: 'document',
    category: 'AI & LLMs',
    tags: ['Cheatsheet', 'Transformers', 'Math', 'Quick Reference', 'Developers'],
    fileFormat: 'PDF',
    fileSize: '1.1 MB',
    pageCount: 2,
    downloadCount: 5600,
    downloadsCount: 5600,
    uploadDate: '2026-09-04',
    uploadedAt: '2026-09-04',
    level: 'Beginner',
    isFeatured: true,
    author: 'ALGorith Developer Relations',
    authorDetails: {
      name: 'ALGorith Developer Relations',
      role: 'Engineering Community',
    },
    thumbnailUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80',
    downloadFileName: 'ALGorith-AI-Engineering-Cheatsheet.pdf',
    previewContent: `ALGorith AI Engineering Quick Cheatsheet
========================================
1. Embedding Dimensions:
   - Small: 768 dims (Fast, memory-light)
   - Standard: 1536 / 3072 dims (High semantic fidelity)

2. Token Math:
   - ~1 Token = 0.75 English Words
   - 1,000 Words ≈ 1,333 Tokens

3. Cosine Similarity vs Dot Product:
   - Normalized vectors: Dot Product == Cosine Similarity (Faster compute)`
  }
];
