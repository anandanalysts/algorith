import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  BrainCircuit,
  Building2,
  BarChart3,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  Code2,
  ArrowUpRight,
  Workflow
} from 'lucide-react';
import { PageView } from '../../types/navigation';
import { PRODUCTS_DATA, ProductItem } from '../../data/products';

interface ProductsViewProps {
  onNavigate: (view: PageView) => void;
}

export const ProductsView: React.FC<ProductsViewProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'AI' | 'Business Systems' | 'Data' | 'Automation'>('ALL');

  const filteredProducts = PRODUCTS_DATA.filter((p) => {
    if (selectedCategory === 'ALL') return true;
    if (selectedCategory === 'AI') return p.id === 'algorith-ai';
    if (selectedCategory === 'Business Systems') return p.id === 'algorith-crm' || p.id === 'algorith-erp';
    if (selectedCategory === 'Data') return p.id === 'algorith-analytics';
    if (selectedCategory === 'Automation') return p.id === 'algorith-ai' || p.id === 'algorith-erp';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100">
      
      {/* Hero Header */}
      <section className="py-20 lg:py-24 border-b border-white/8 bg-tech-grid">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300 mb-6">
            <span>PRODUCTS</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-bold text-white tracking-tight mb-4">
            Products
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed mb-8">
            Technology products designed for modern businesses.
          </p>

          {/* Categories */}
          <div className="inline-flex flex-wrap justify-center p-1 rounded-xl bg-white/5 border border-white/10 text-xs font-mono gap-1">
            {(['ALL', 'AI', 'Business Systems', 'Data', 'Automation'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-lg transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#1557E8] text-white font-medium shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat === 'ALL' ? 'All Products' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="p-8 rounded-2xl bg-[#0E1422] border border-white/8 hover:border-white/18 transition-all flex flex-col justify-between group shadow-lg"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[11px] text-[#12D9F5] uppercase">
                    {product.categoryLabel}
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/8">
                    {product.status}
                  </span>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold text-white mb-1">
                    {product.name}
                  </h2>
                  <p className="text-xs font-mono text-slate-400">
                    {product.tagline}
                  </p>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed">
                  {product.description}
                </p>

                <div className="space-y-2 pt-2">
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    Core Capabilities:
                  </div>
                  <div className="space-y-1.5">
                    {product.keyCapabilities.slice(0, 3).map((cap, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="text-[#12D9F5]">&bull;</span>
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/8 flex items-center justify-between">
                <button
                  onClick={() => onNavigate('contact')}
                  className="btn-shimmer px-4 py-2 rounded-lg bg-[#1557E8] hover:bg-[#168CFF] text-white text-xs font-medium transition-all inline-flex items-center gap-1.5"
                >
                  <span>Request Access</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onNavigate('technology')}
                  className="text-xs font-mono text-slate-400 hover:text-white transition-colors"
                >
                  Architecture &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 text-center border-t border-white/8">
        <div className="max-w-2xl mx-auto px-4 space-y-5">
          <h2 className="font-display text-3xl font-bold text-white">
            Need a custom integration or tailored deployment?
          </h2>
          <p className="text-slate-400 text-sm">
            We work directly with engineering and product leaders to deploy ALGorith products on your infrastructure.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('contact')}
              className="btn-shimmer px-7 py-3 rounded-lg bg-[#1557E8] hover:bg-[#168CFF] text-white font-medium text-sm transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>Schedule Architecture Review</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
