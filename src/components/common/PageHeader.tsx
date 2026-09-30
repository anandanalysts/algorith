import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { PageView } from '../../types/navigation';

interface PageHeaderProps {
  badge: string;
  title: string;
  description?: string;
  onNavigate: (view: PageView) => void;
  nextPage?: { view: PageView; label: string };
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  badge,
  title,
  description,
  onNavigate,
  nextPage,
}) => {
  return (
    <div className="border-b border-slate-800/80 bg-gradient-to-b from-[#0B1930] to-[#061226] py-10 md:py-14 relative overflow-hidden">
      <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 text-xs font-['IBM_Plex_Mono'] text-slate-400">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[#12D9F5] transition-colors font-bold text-slate-300"
            >
              <span>ALGorith</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-[#12D9F5] font-semibold">{title}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#102544] hover:bg-[#16325B] text-slate-300 hover:text-white border border-slate-700/80 text-xs font-['IBM_Plex_Mono'] transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            {nextPage && (
              <button
                onClick={() => onNavigate(nextPage.view)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1557E8]/30 hover:bg-[#1557E8] text-[#12D9F5] hover:text-white border border-[#12D9F5]/40 text-xs font-['IBM_Plex_Mono'] transition-all"
              >
                <span>Next: {nextPage.label}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Title & Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-3 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#12D9F5]/10 border border-[#12D9F5]/30 text-[#12D9F5] font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider">
            <span className="badge-pulse"></span>
            {badge}
          </div>
          <h1 className="font-neo text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            {title}
          </h1>
          {description && (
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed pt-1">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};
