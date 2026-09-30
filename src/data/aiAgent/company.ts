export interface CompanyKnowledge {
  id: string;
  topic: string;
  title: string;
  content: string;
  verified: true;
  lastReviewed: string;
}

export const VERIFIED_COMPANY_DATA: CompanyKnowledge[] = [
  {
    id: "company-overview",
    topic: "overview",
    title: "ALGorith Technologies Overview",
    content: "ALGorith Technologies focuses on AI, software, data and automation solutions for modern businesses. ALGorith builds proprietary technology products and custom digital systems rather than traditional IT outsourcing.",
    verified: true,
    lastReviewed: "2026-09-30"
  },
  {
    id: "company-philosophy",
    topic: "philosophy",
    title: "Core Framework",
    content: "ALGorith's philosophy is THINK. BUILD. AUTOMATE. GROW. We believe technology should solve real problems, eliminate operational drag, and scale businesses without technical debt.",
    verified: true,
    lastReviewed: "2026-09-30"
  },
  {
    id: "company-pillars",
    topic: "pillars",
    title: "The Four Engineering Pillars",
    content: "1. Business-First Engineering: Real KPIs over novelty. 2. AI & Autonomy Native: Deterministic agent loops and vector memory. 3. Total IP Ownership: Zero vendor lock-in. 4. Built to Scale Resiliently: Type safety and event queues.",
    verified: true,
    lastReviewed: "2026-09-30"
  }
];
