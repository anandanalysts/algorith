/**
 * Verified ALGorith Company Knowledge Base
 */

export interface VerifiedCompanyInfo {
  name: string;
  legalName: string;
  tagline: string;
  positioning: string;
  corePhilosophy: string[];
  summary: string;
  fourPillars: { title: string; description: string }[];
  headquarters: string;
  channels: { email: string; phone: string; website: string };
}

export const VERIFIED_COMPANY_KNOWLEDGE: VerifiedCompanyInfo = {
  name: "ALGorith Technologies",
  legalName: "ALGorith Technologies Inc.",
  tagline: "Technology that thinks, builds, automates and scales.",
  positioning: "AI • Software • Data • Automation",
  corePhilosophy: ["THINK", "BUILD", "AUTOMATE", "GROW"],
  summary: "ALGorith Technologies is a focused technology company building AI-powered software, data systems, and workflow automation for modern businesses. ALGorith engineers proprietary technology products and custom enterprise systems rather than traditional IT services.",
  fourPillars: [
    {
      title: "Business-First Engineering",
      description: "Technology engineered to directly solve operational bottlenecks and move key performance indicators."
    },
    {
      title: "AI & Autonomy Native",
      description: "Systems designed from inception with deterministic agent loops, semantic retrieval, and self-healing logic."
    },
    {
      title: "Total IP Ownership",
      description: "Clients retain 100% ownership of source code, models, schemas, and data pipelines with zero vendor lock-in."
    },
    {
      title: "Built for Resilient Scale",
      description: "Strict type safety, asynchronous event queues, and automated test coverage ensure uninterrupted operations."
    }
  ],
  headquarters: "Bangalore, India (with global distributed engineering delivery)",
  channels: {
    email: "contact@algorith.in",
    phone: "+91 98998 77478",
    website: "https://algorith.in"
  }
};
