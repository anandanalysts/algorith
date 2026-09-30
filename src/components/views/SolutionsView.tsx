import React from 'react';
import { motion } from 'motion/react';
import {
  Cpu,
  Code2,
  BarChart3,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Workflow
} from 'lucide-react';
import { PageView } from '../../types/navigation';
import { SOLUTIONS_DATA } from '../../data/solutions';

interface SolutionsViewProps {
  onNavigate: (view: PageView) => void;
}

export const SolutionsView: React.FC<SolutionsViewProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100">
      
      {/* Hero Header */}
      <section className="py-20 lg:py-24 border-b border-white/8 bg-tech-grid">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300 mb-6">
            <span>SOLUTIONS</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-bold text-white tracking-tight mb-4">
            Solutions
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Technology built around real business problems.
          </p>
        </div>
      </section>

      {/* Solutions Problem-Oriented Breakdown */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {SOLUTIONS_DATA.map((solution, idx) => (
          <div
            key={solution.id}
            id={solution.id}
            className="p-8 sm:p-10 rounded-2xl bg-[#0E1422] border border-white/8 shadow-xl relative"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/8 pb-6 mb-6">
              <div>
                <span className="font-mono text-xs uppercase text-[#12D9F5]">
                  0{idx + 1} &bull; {solution.categoryTag}
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-0.5">
                  {solution.title}
                </h2>
              </div>

              <span className="self-start sm:self-auto text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-3 py-1 rounded-md">
                Outcome: {solution.caseSnippet.metric}
              </span>
            </div>

            {/* 3 Core Questions: Problem -> Technology -> Outcome */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
              
              {/* 1. What problem does it solve? */}
              <div className="p-5 rounded-xl bg-[#080C14] border border-white/6 space-y-2">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  1. The Problem
                </div>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {solution.problem}
                </p>
              </div>

              {/* 2. What technology is involved? */}
              <div className="p-5 rounded-xl bg-[#080C14] border border-white/6 space-y-2">
                <div className="text-[11px] font-mono text-[#12D9F5] uppercase tracking-wider">
                  2. The Technology
                </div>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {solution.solution}
                </p>
              </div>

              {/* 3. What outcome does it enable? */}
              <div className="p-5 rounded-xl bg-[#080C14] border border-white/6 space-y-2">
                <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">
                  3. The Outcome
                </div>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {solution.businessImpact}
                </p>
              </div>

            </div>

            {/* Capabilities Summary */}
            <div className="space-y-3 mb-8">
              <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Key Technical Modules:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {solution.capabilities.map((cap, cIdx) => (
                  <div key={cIdx} className="p-3.5 rounded-lg bg-[#080C14] border border-white/5 space-y-1">
                    <div className="font-display font-semibold text-white text-sm">
                      {cap.title}
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-mono text-slate-400">
                Tailored engineering specifications delivered in 24 hours.
              </span>

              <button
                onClick={() => onNavigate('contact')}
                className="btn-shimmer px-5 py-2.5 rounded-lg bg-[#1557E8] hover:bg-[#168CFF] text-white font-medium text-xs transition-all shadow-md inline-flex items-center gap-2"
              >
                <span>Scope {solution.title}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        ))}
      </section>

    </div>
  );
};
