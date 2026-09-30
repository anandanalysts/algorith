import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  BrainCircuit,
  Building2,
  Workflow,
  ShieldCheck,
  CheckCircle2,
  Code2,
  BarChart3,
  Cpu,
  ChevronRight,
  Database,
  ArrowUpRight,
  Bot,
  Sparkles,
  Layers
} from 'lucide-react';
import { COMPANY, trackEvent } from '../../config';
import { PageView } from '../../types/navigation';
import { AIAgentChat } from '../common/AIAgentChat';
import { PRODUCTS_DATA } from '../../data/products';
import { SOLUTIONS_DATA } from '../../data/solutions';

interface HomeLandingViewProps {
  onNavigate: (view: PageView) => void;
}

interface TechFlowLayer {
  id: string;
  name: string;
  role: string;
  description: string;
}

const TECH_FLOW_LAYERS: TechFlowLayer[] = [
  {
    id: 'ai',
    name: 'AI',
    role: 'Intelligence and reasoning',
    description: 'Multimodal reasoning models, semantic embeddings, and deterministic prompt guardrails.'
  },
  {
    id: 'agents',
    name: 'AGENTS',
    role: 'Systems that can perform tasks',
    description: 'Goal-oriented multi-agent orchestration with working memory and secure tool-calling capabilities.'
  },
  {
    id: 'automation',
    name: 'AUTOMATION',
    role: 'Processes that run with less manual effort',
    description: 'Event-driven message queues, webhook bridges, and cryptographic idempotency schedules.'
  },
  {
    id: 'data',
    name: 'DATA',
    role: 'The information layer',
    description: 'ACID-compliant relational engines, columnar analytical lakehouses, and vector stores.'
  },
  {
    id: 'analytics',
    name: 'ANALYTICS',
    role: 'Turning data into insight',
    description: 'Sub-second visual telemetry, anomaly alerting, and predictive forecasting pipelines.'
  },
  {
    id: 'applications',
    name: 'APPLICATIONS',
    role: 'Technology people actually use',
    description: 'High-performance React/TypeScript web apps, business ERP/CRM suites, and internal tools.'
  }
];

export const HomeLandingView: React.FC<HomeLandingViewProps> = ({ onNavigate }) => {
  const [activeArchIndex, setActiveArchIndex] = useState<number>(0);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const scrollToAgent = () => {
    const el = document.getElementById('ai-agent-console');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="w-full bg-[#080C14] text-slate-100 selection:bg-[#12D9F5] selection:text-[#080C14]">

      {/* SECTION 01: HERO */}
      <section className="relative min-h-[85vh] flex items-center justify-center border-b border-white/8 bg-tech-grid">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center flex flex-col items-center">
          
          {/* Brand Category Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#12D9F5]" />
            <span className="tracking-wider">AI &bull; SOFTWARE &bull; DATA &bull; AUTOMATION</span>
          </div>

          {/* Primary Headline */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.08] mb-6">
            THINK. BUILD. <br className="hidden sm:inline" />
            <span className="text-gradient">AUTOMATE. GROW.</span>
          </h1>

          {/* Supporting Statement */}
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl font-light leading-relaxed mb-10">
            ALGorith Technologies builds AI-powered software, data systems and automation solutions for modern businesses.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
            <button
              onClick={() => onNavigate('contact')}
              className="btn-shimmer w-full sm:w-auto px-7 py-3 rounded-lg bg-[#1557E8] hover:bg-[#168CFF] text-white font-medium text-sm transition-all shadow-md flex items-center justify-center gap-2 group"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('products')}
              className="w-full sm:w-auto px-7 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 font-medium text-sm transition-all flex items-center justify-center gap-1.5"
            >
              <span>Explore Products</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Subtle Interactive System Visual Flow */}
          <div className="mt-16 pt-8 border-t border-white/6 w-full max-w-4xl">
            <div className="flex items-center justify-center gap-1 sm:gap-4 flex-wrap text-xs font-mono">
              {[
                { id: 'ai', label: 'AI' },
                { id: 'agents', label: 'AGENTS' },
                { id: 'automation', label: 'AUTOMATION' },
                { id: 'data', label: 'DATA' },
                { id: 'applications', label: 'APPLICATIONS' },
                { id: 'business', label: 'BUSINESS' }
              ].map((step, idx, arr) => (
                <React.Fragment key={step.id}>
                  <div
                    onMouseEnter={() => setHoveredNode(step.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    className={`px-2.5 py-1 rounded border transition-all cursor-default ${
                      hoveredNode === step.id
                        ? 'border-[#12D9F5] text-[#12D9F5] bg-[#12D9F5]/10'
                        : 'border-white/10 text-slate-400 bg-white/3'
                    }`}
                  >
                    {step.label}
                  </div>
                  {idx < arr.length - 1 && (
                    <span className="text-slate-600 select-none">&darr;</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 02: ALGorith AI AGENT (Major V2 Feature) */}
      <section id="ai-agent-console" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-b border-white/8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Context Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
              <Bot className="w-3.5 h-3.5 text-[#12D9F5]" />
              <span>CORE INTELLIGENCE</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              Meet ALGorith <br />
              <span className="text-[#12D9F5]">AI Agent</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Your intelligent technology assistant. Ask about AI, software, automation, data or business systems — and explore what ALGorith can build for you.
            </p>

            <div className="space-y-2.5 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Deterministic answers grounded in ALGorith architecture</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#12D9F5]" />
                <span>Zero-hallucination domain knowledge engine</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#12D9F5] hover:text-white transition-colors group"
              >
                <span>Need a tailored consultation with our team?</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* AI Agent Console Component */}
          <div className="lg:col-span-7">
            <AIAgentChat onNavigate={onNavigate} />
          </div>

        </div>
      </section>

      {/* SECTION 03: WHAT ALGorith BUILDS */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-b border-white/8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            Capabilities
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Technology built around your business.
          </h2>
          <p className="text-slate-400 text-sm">
            We architect and build durable technology assets across four core disciplines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* AI */}
          <div
            onClick={() => onNavigate('solutions')}
            className="group cursor-pointer p-6 rounded-xl bg-[#0E1422] border border-white/8 hover:border-[#12D9F5]/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#12D9F5] mb-5">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-[#12D9F5] transition-colors">
                AI
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                AI systems, AI agents, intelligent workflows and generative AI.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-mono text-slate-400 group-hover:text-white">
              <span>Explore AI</span>
              <ArrowRight className="w-3 h-3 text-[#12D9F5]" />
            </div>
          </div>

          {/* SOFTWARE */}
          <div
            onClick={() => onNavigate('solutions')}
            className="group cursor-pointer p-6 rounded-xl bg-[#0E1422] border border-white/8 hover:border-[#12D9F5]/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#1557E8] mb-5">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-[#12D9F5] transition-colors">
                SOFTWARE
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                Web applications, business platforms, SaaS, CRM and ERP systems.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-mono text-slate-400 group-hover:text-white">
              <span>Explore Software</span>
              <ArrowRight className="w-3 h-3 text-[#12D9F5]" />
            </div>
          </div>

          {/* DATA */}
          <div
            onClick={() => onNavigate('solutions')}
            className="group cursor-pointer p-6 rounded-xl bg-[#0E1422] border border-white/8 hover:border-[#12D9F5]/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#19DDB5] mb-5">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-[#12D9F5] transition-colors">
                DATA
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                Analytics, dashboards, reporting, business intelligence and data systems.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-mono text-slate-400 group-hover:text-white">
              <span>Explore Data</span>
              <ArrowRight className="w-3 h-3 text-[#12D9F5]" />
            </div>
          </div>

          {/* AUTOMATION */}
          <div
            onClick={() => onNavigate('solutions')}
            className="group cursor-pointer p-6 rounded-xl bg-[#0E1422] border border-white/8 hover:border-[#12D9F5]/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#60A5FA] mb-5">
                <Workflow className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-[#12D9F5] transition-colors">
                AUTOMATION
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                Workflow automation, integrations, operational automation and intelligent processes.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-mono text-slate-400 group-hover:text-white">
              <span>Explore Automation</span>
              <ArrowRight className="w-3 h-3 text-[#12D9F5]" />
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 04: PRODUCTS */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-b border-white/8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">
              Products
            </h2>
            <p className="text-slate-400 text-sm">
              Technology products built by ALGorith.
            </p>
          </div>

          <button
            onClick={() => onNavigate('products')}
            className="text-xs font-mono font-semibold text-[#12D9F5] hover:text-white transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>View All Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Product 1: ALGorith AI */}
          <div
            onClick={() => onNavigate('products')}
            className="p-7 rounded-xl bg-[#0E1422] border border-white/8 hover:border-white/18 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="font-mono text-[11px] text-[#12D9F5] uppercase">
                  ALGorith AI
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/8">
                  General Availability
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-[#12D9F5] transition-colors">
                ALGorith AI
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                AI and intelligent agent ecosystem.
              </p>
            </div>
            <div className="pt-4 border-t border-white/6 flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-white">
              <span>Learn More</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#12D9F5] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Product 2: ALGorith CRM */}
          <div
            onClick={() => onNavigate('products')}
            className="p-7 rounded-xl bg-[#0E1422] border border-white/8 hover:border-white/18 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="font-mono text-[11px] text-[#12D9F5] uppercase">
                  ALGorith Business
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/8">
                  Production Ready
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-[#12D9F5] transition-colors">
                ALGorith CRM
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Customer and relationship management.
              </p>
            </div>
            <div className="pt-4 border-t border-white/6 flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-white">
              <span>Learn More</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#12D9F5] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Product 3: ALGorith ERP */}
          <div
            onClick={() => onNavigate('products')}
            className="p-7 rounded-xl bg-[#0E1422] border border-white/8 hover:border-white/18 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="font-mono text-[11px] text-[#12D9F5] uppercase">
                  ALGorith Business
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/8">
                  Active Enterprise
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-[#12D9F5] transition-colors">
                ALGorith ERP
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Business operations and enterprise workflows.
              </p>
            </div>
            <div className="pt-4 border-t border-white/6 flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-white">
              <span>Learn More</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#12D9F5] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Product 4: ALGorith Analytics */}
          <div
            onClick={() => onNavigate('products')}
            className="p-7 rounded-xl bg-[#0E1422] border border-white/8 hover:border-white/18 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="font-mono text-[11px] text-[#12D9F5] uppercase">
                  ALGorith Business
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/8">
                  General Availability
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-[#12D9F5] transition-colors">
                ALGorith Analytics
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Business intelligence and data analytics.
              </p>
            </div>
            <div className="pt-4 border-t border-white/6 flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-white">
              <span>Learn More</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#12D9F5] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 05: SOLUTIONS */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-b border-white/8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            Solutions
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            From problem to technology.
          </h2>
          <p className="text-slate-400 text-sm">
            Four core solution areas engineered around real business challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          <div
            onClick={() => onNavigate('solutions')}
            className="p-8 rounded-xl bg-[#0E1422] border border-white/8 hover:border-white/18 transition-all cursor-pointer space-y-4"
          >
            <div className="text-xs font-mono text-[#12D9F5] uppercase">
              01 &bull; Intelligent Systems
            </div>
            <h3 className="font-display text-xl font-bold text-white">
              AI &amp; Automation
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Intelligent systems, agents and automated workflows.
            </p>
            <div className="text-xs font-mono text-slate-400 pt-2 flex items-center gap-1">
              <span>Explore Solution</span>
              <ArrowRight className="w-3 h-3 text-[#12D9F5]" />
            </div>
          </div>

          <div
            onClick={() => onNavigate('solutions')}
            className="p-8 rounded-xl bg-[#0E1422] border border-white/8 hover:border-white/18 transition-all cursor-pointer space-y-4"
          >
            <div className="text-xs font-mono text-[#12D9F5] uppercase">
              02 &bull; Core Platforms
            </div>
            <h3 className="font-display text-xl font-bold text-white">
              Software &amp; Business Systems
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Applications, SaaS, CRM and ERP.
            </p>
            <div className="text-xs font-mono text-slate-400 pt-2 flex items-center gap-1">
              <span>Explore Solution</span>
              <ArrowRight className="w-3 h-3 text-[#12D9F5]" />
            </div>
          </div>

          <div
            onClick={() => onNavigate('solutions')}
            className="p-8 rounded-xl bg-[#0E1422] border border-white/8 hover:border-white/18 transition-all cursor-pointer space-y-4"
          >
            <div className="text-xs font-mono text-[#12D9F5] uppercase">
              03 &bull; Data Intelligence
            </div>
            <h3 className="font-display text-xl font-bold text-white">
              Data &amp; Analytics
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Dashboards, reporting and business intelligence.
            </p>
            <div className="text-xs font-mono text-slate-400 pt-2 flex items-center gap-1">
              <span>Explore Solution</span>
              <ArrowRight className="w-3 h-3 text-[#12D9F5]" />
            </div>
          </div>

          <div
            onClick={() => onNavigate('solutions')}
            className="p-8 rounded-xl bg-[#0E1422] border border-white/8 hover:border-white/18 transition-all cursor-pointer space-y-4"
          >
            <div className="text-xs font-mono text-[#12D9F5] uppercase">
              04 &bull; Modernization
            </div>
            <h3 className="font-display text-xl font-bold text-white">
              Digital Transformation
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Modern digital infrastructure and business systems.
            </p>
            <div className="text-xs font-mono text-slate-400 pt-2 flex items-center gap-1">
              <span>Explore Solution</span>
              <ArrowRight className="w-3 h-3 text-[#12D9F5]" />
            </div>
          </div>

        </div>

        <div className="text-center">
          <button
            onClick={() => onNavigate('solutions')}
            className="px-6 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 font-mono text-xs transition-all inline-flex items-center gap-2"
          >
            <span>Explore All Solutions</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#12D9F5]" />
          </button>
        </div>
      </section>

      {/* SECTION 06: TECHNOLOGY ARCHITECTURE (Signature Section) */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-b border-white/8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            Architecture
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            The ALGorith Technology Architecture
          </h2>
          <p className="text-slate-400 text-sm">
            Hover or click to inspect how each layer operates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* 6 Layers Column */}
          <div className="lg:col-span-6 space-y-2">
            {TECH_FLOW_LAYERS.map((layer, idx) => {
              const isSelected = activeArchIndex === idx;

              return (
                <div
                  key={layer.id}
                  onClick={() => setActiveArchIndex(idx)}
                  className={`p-4 rounded-xl cursor-pointer border transition-all flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-[#10192D] border-[#12D9F5]/80 shadow-md'
                      : 'bg-[#0E1422] border-white/8 hover:bg-[#121A2B] hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded font-mono text-[11px] font-bold flex items-center justify-center ${
                      isSelected
                        ? 'bg-[#12D9F5] text-[#080C14]'
                        : 'bg-white/5 text-slate-400'
                    }`}>
                      0{idx + 1}
                    </span>
                    <div>
                      <div className="font-display font-bold text-sm text-white">
                        {layer.name}
                      </div>
                      <div className="text-xs font-mono text-slate-400">
                        {layer.role}
                      </div>
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 transition-transform ${
                    isSelected ? 'text-[#12D9F5] translate-x-1' : 'text-slate-600'
                  }`} />
                </div>
              );
            })}
          </div>

          {/* Active Layer Inspector */}
          <div className="lg:col-span-6 bg-[#0E1422] border border-white/10 rounded-2xl p-7 sm:p-9 space-y-6">
            {(() => {
              const activeLayer = TECH_FLOW_LAYERS[activeArchIndex];
              return (
                <>
                  <div className="border-b border-white/8 pb-4">
                    <div className="text-[10px] font-mono text-[#12D9F5] uppercase tracking-wider mb-1">
                      Layer 0{activeArchIndex + 1}
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white">
                      {activeLayer.name}
                    </h3>
                    <div className="text-xs font-mono text-slate-300 mt-1">
                      {activeLayer.role}
                    </div>
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed">
                    {activeLayer.description}
                  </p>

                  <div className="pt-2 border-t border-white/6 flex justify-end">
                    <button
                      onClick={() => onNavigate('technology')}
                      className="text-xs font-mono font-medium text-[#12D9F5] hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <span>View Full Technology Architecture</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </>
              );
            })()}
          </div>

        </div>
      </section>

      {/* SECTION 07: HOW WE WORK (01 THINK, 02 BUILD, 03 AUTOMATE, 04 GROW) */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-b border-white/8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            Methodology
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            THINK &bull; BUILD &bull; AUTOMATE &bull; GROW
          </h2>
          <p className="text-slate-400 text-sm">
            How we translate complex problems into scalable digital systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* 01 THINK */}
          <div className="p-7 rounded-xl bg-[#0E1422] border border-white/8 space-y-4">
            <span className="font-mono text-3xl font-bold text-slate-700 block">
              01
            </span>
            <h3 className="font-display text-lg font-bold text-white">
              THINK
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Understand the problem. Rigorous architecture auditing, discovery and data modeling.
            </p>
          </div>

          {/* 02 BUILD */}
          <div className="p-7 rounded-xl bg-[#0E1422] border border-white/8 space-y-4">
            <span className="font-mono text-3xl font-bold text-slate-700 block">
              02
            </span>
            <h3 className="font-display text-lg font-bold text-white">
              BUILD
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Engineer the solution. Resilient fullstack platforms, deterministic AI, and robust schemas.
            </p>
          </div>

          {/* 03 AUTOMATE */}
          <div className="p-7 rounded-xl bg-[#0E1422] border border-white/8 space-y-4">
            <span className="font-mono text-3xl font-bold text-slate-700 block">
              03
            </span>
            <h3 className="font-display text-lg font-bold text-white">
              AUTOMATE
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Connect systems and workflows. Remove repetitive drag with autonomous agent worker loops.
            </p>
          </div>

          {/* 04 GROW */}
          <div className="p-7 rounded-xl bg-[#0E1422] border border-white/8 space-y-4">
            <span className="font-mono text-3xl font-bold text-slate-700 block">
              04
            </span>
            <h3 className="font-display text-lg font-bold text-white">
              GROW
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Improve, measure and scale. Real-time telemetry, continuous optimization, and high availability.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 08: WHY ALGorith */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-b border-white/8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            Philosophy
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Why ALGorith
          </h2>
          <p className="text-slate-400 text-sm">
            Engineering standards that prioritize substance over noise.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
          
          <div className="p-5 rounded-xl bg-[#0E1422] border border-white/8">
            <div className="font-display font-bold text-white text-sm mb-1">
              Engineering first.
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Durable architecture over fragile marketing demos.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#0E1422] border border-white/8">
            <div className="font-display font-bold text-white text-sm mb-1">
              AI where it creates value.
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Deterministic models solving genuine operational bottlenecks.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#0E1422] border border-white/8">
            <div className="font-display font-bold text-white text-sm mb-1">
              Automation where it saves time.
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Event-driven pipelines eliminating manual drag.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#0E1422] border border-white/8">
            <div className="font-display font-bold text-white text-sm mb-1">
              Data where decisions matter.
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Sub-second telemetry enabling fast executive clarity.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#0E1422] border border-white/8">
            <div className="font-display font-bold text-white text-sm mb-1">
              Software built for scale.
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Zero vendor lock-in with total IP ownership.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 09: HOME CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <div className="p-10 sm:p-14 rounded-2xl bg-[#0E1422] border border-white/10 space-y-6 shadow-2xl">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Have a problem worth solving?
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto leading-relaxed font-light">
            Tell ALGorith what you&apos;re trying to build, automate or improve.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('contact')}
              className="btn-shimmer w-full sm:w-auto px-7 py-3 rounded-lg bg-[#1557E8] hover:bg-[#168CFF] text-white font-medium text-sm transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={scrollToAgent}
              className="w-full sm:w-auto px-7 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 font-medium text-sm transition-all flex items-center justify-center gap-2"
            >
              <Bot className="w-4 h-4 text-[#12D9F5]" />
              <span>Talk to AI Agent</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
