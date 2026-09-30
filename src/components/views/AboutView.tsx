import React from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Cpu,
  ArrowRight,
  Globe,
  Layers,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { COMPANY } from '../../config';
import { PageView } from '../../types/navigation';

interface AboutViewProps {
  onNavigate: (view: PageView) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100">
      
      {/* Hero Header */}
      <section className="py-20 lg:py-24 border-b border-white/8 bg-tech-grid">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300 mb-6">
            <span>ABOUT ALGORITH TECHNOLOGIES</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight max-w-4xl mx-auto mb-6 leading-tight">
            Technology should solve problems, not create complexity.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            ALGorith Technologies is a focused technology company building intelligent software, AI systems, data pipelines, and automation.
          </p>
        </div>
      </section>

      {/* Sections: Who We Are, Vision, Mission, Philosophy */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Who We Are */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#0E1422] border border-white/8 space-y-4">
          <div className="text-xs font-mono text-[#12D9F5] uppercase tracking-wider">
            Who We Are
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
            An Engineering-Driven Technology Company
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            We are software engineers, AI architects, and data practitioners who believe that enterprise technology should be deterministic, fast, and maintainable. Rather than acting as a traditional outsourcing agency, we build and own technology products while engineering bespoke digital systems for forward-looking enterprises.
          </p>
        </div>

        {/* Vision & Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Vision */}
          <div className="p-8 rounded-2xl bg-[#0E1422] border border-white/8 space-y-4">
            <div className="text-xs font-mono text-[#12D9F5] uppercase tracking-wider">
              Vision
            </div>
            <h3 className="font-display text-2xl font-bold text-white">
              Autonomous, Deterministic Systems
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed font-light">
              We envision businesses operating with seamless autonomous worker loops and real-time telemetry, removing repetitive operational friction so human teams can focus entirely on strategic growth.
            </p>
          </div>

          {/* Mission */}
          <div className="p-8 rounded-2xl bg-[#0E1422] border border-white/8 space-y-4">
            <div className="text-xs font-mono text-[#12D9F5] uppercase tracking-wider">
              Mission
            </div>
            <h3 className="font-display text-2xl font-bold text-white">
              Engineering Over Hype
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed font-light">
              Our mission is to translate recent breakthroughs in AI, distributed computing, and data streaming into reliable, production-grade systems that directly improve business operations.
            </p>
          </div>

        </div>

        {/* Philosophy: 4 Pillars */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Philosophy
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
              The Four Principles
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            
            <div className="p-6 rounded-xl bg-[#0E1422] border border-white/8 space-y-2.5">
              <span className="font-mono text-xs text-[#12D9F5]">01</span>
              <h4 className="font-display text-base font-bold text-white">
                Business First
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Technology must solve a measurable bottleneck or create clear operational leverage.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#0E1422] border border-white/8 space-y-2.5">
              <span className="font-mono text-xs text-[#12D9F5]">02</span>
              <h4 className="font-display text-base font-bold text-white">
                AI &amp; Autonomy Native
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Architected from day one with deterministic agent loops and semantic memory.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#0E1422] border border-white/8 space-y-2.5">
              <span className="font-mono text-xs text-[#12D9F5]">03</span>
              <h4 className="font-display text-base font-bold text-white">
                Total IP Ownership
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                You own 100% of your source code, models, schemas, and pipelines. Zero lock-in.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#0E1422] border border-white/8 space-y-2.5">
              <span className="font-mono text-xs text-[#12D9F5]">04</span>
              <h4 className="font-display text-base font-bold text-white">
                Built for Scale
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Type safety, event queues, and automated testing ensure long-term stability.
              </p>
            </div>

          </div>
        </div>

      </section>

      {/* Global Delivery CTA */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center border-t border-white/8">
        <div className="p-10 rounded-2xl bg-[#0E1422] border border-white/8 space-y-5">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
            Engineering Hub &amp; Global Partnerships
          </h2>
          <p className="text-slate-300 text-sm max-w-lg mx-auto font-light leading-relaxed">
            Headquartered in India with a global engineering model, we partner with teams worldwide.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => onNavigate('contact')}
              className="btn-shimmer px-6 py-2.5 rounded-lg bg-[#1557E8] hover:bg-[#168CFF] text-white font-medium text-xs transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>Start a Conversation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
