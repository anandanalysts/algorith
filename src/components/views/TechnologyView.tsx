import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  BrainCircuit,
  Bot,
  Workflow,
  Database,
  BarChart3,
  Code2,
  ShieldCheck,
  Lock,
  ArrowRight,
  CheckCircle2,
  Layers,
  ChevronRight
} from 'lucide-react';
import { PageView } from '../../types/navigation';
import { TECH_STACK_LAYERS, ENGINEERING_PRINCIPLES } from '../../data/technology';

interface TechnologyViewProps {
  onNavigate: (view: PageView) => void;
}

export const TechnologyView: React.FC<TechnologyViewProps> = ({ onNavigate }) => {
  const [activeTier, setActiveTier] = useState<number>(0);
  const currentLayer = TECH_STACK_LAYERS[activeTier];

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100">
      
      {/* Hero Header */}
      <section className="py-20 lg:py-24 border-b border-white/8 bg-tech-grid">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300 mb-6">
            <span>ENGINEERING ARCHITECTURE</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-bold text-white tracking-tight mb-4">
            Technology
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            The architecture behind intelligent digital systems.
          </p>
        </div>
      </section>

      {/* 6-Layer Architecture Stack */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            System Stack
          </div>
          <h2 className="font-display text-3xl font-bold text-white tracking-tight">
            The Six Core Layers
          </h2>
          <p className="text-slate-400 text-sm">
            Deterministic data and reasoning flow from foundation models down to business applications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Layer Selector */}
          <div className="lg:col-span-5 space-y-2">
            {TECH_STACK_LAYERS.map((layer, idx) => {
              const isSelected = activeTier === idx;

              return (
                <div
                  key={layer.id}
                  onClick={() => setActiveTier(idx)}
                  className={`p-4 rounded-xl cursor-pointer border transition-all flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-[#10192D] border-[#12D9F5]/70 shadow-md'
                      : 'bg-[#0E1422] border-white/8 hover:bg-[#121A2B] hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded font-mono text-xs font-bold flex items-center justify-center ${
                      isSelected
                        ? 'bg-[#12D9F5] text-[#080C14]'
                        : 'bg-white/5 text-slate-400'
                    }`}>
                      0{layer.order}
                    </span>
                    <div>
                      <div className="font-display font-bold text-sm text-white">
                        {layer.name}
                      </div>
                      <div className="text-xs font-mono text-slate-400">
                        {layer.shortRole}
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

          {/* Layer Inspector Detail */}
          <div className="lg:col-span-7 bg-[#0E1422] border border-white/10 rounded-2xl p-7 sm:p-9 space-y-6">
            <div className="border-b border-white/8 pb-4 flex items-start justify-between">
              <div>
                <span className="font-mono text-[10px] text-[#12D9F5] uppercase tracking-wider">
                  Tier 0{currentLayer.order} Specs
                </span>
                <h3 className="font-display text-2xl font-bold text-white mt-0.5">
                  {currentLayer.name}
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400 bg-white/5 px-2.5 py-1 rounded border border-white/8">
                {currentLayer.shortRole}
              </span>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              {currentLayer.detailedDescription}
            </p>

            <div className="space-y-2">
              <div className="text-xs font-mono text-white font-bold uppercase tracking-wider">
                Internal Modules &amp; Subsystems:
              </div>
              <div className="space-y-1.5">
                {currentLayer.keyComponents.map((comp, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 font-mono">
                    <span className="text-[#12D9F5]">&bull;</span>
                    <span>{comp}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                Core Technologies &amp; Standards:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {currentLayer.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#080C14] text-slate-300 border border-white/8"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Engineering Principles */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            Disciplines
          </div>
          <h2 className="font-display text-3xl font-bold text-white tracking-tight">
            Engineering Principles
          </h2>
          <p className="text-slate-400 text-sm">
            The fundamental design constraints governing every line of software we engineer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ENGINEERING_PRINCIPLES.map((p, idx) => (
            <div key={idx} className="p-6 rounded-xl bg-[#0E1422] border border-white/8 space-y-3">
              <h3 className="font-display text-lg font-bold text-white">
                {p.title}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Security & Private VPC Governance */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-10 sm:p-12 rounded-2xl bg-[#0E1422] border border-white/10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950/40 border border-emerald-800/60 text-xs font-mono text-emerald-400">
            <Lock className="w-3.5 h-3.5" />
            <span>ENTERPRISE SECURITY &amp; COMPLIANCE</span>
          </div>

          <h2 className="font-display text-3xl font-bold text-white">
            Zero Data Retention &amp; Private VPC Deployment
          </h2>

          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            All AI agents and business platforms can be deployed inside your own private VPC (AWS, GCP, Azure, or on-premise) with zero third-party data retention and end-to-end encryption.
          </p>

          <div className="pt-2">
            <button
              onClick={() => onNavigate('contact')}
              className="btn-shimmer px-7 py-3 rounded-lg bg-[#1557E8] hover:bg-[#168CFF] text-white font-medium text-sm transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>Discuss Technical Requirements</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
