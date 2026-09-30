import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  Phone,
  Globe,
  Send,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Bot
} from 'lucide-react';
import { COMPANY, trackEvent } from '../../config';
import { PageView } from '../../types/navigation';

interface ContactViewProps {
  onNavigate: (view: PageView) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    projectType: 'AI',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const projectTypes = [
    'AI',
    'Software',
    'CRM / ERP',
    'Data & Analytics',
    'Automation',
    'Digital Transformation',
    'Partnership',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    trackEvent('contact_form_submit', formData);

    setTimeout(() => {
      const refCode = `ALG-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedRef(refCode);
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100">
      
      {/* Hero Header */}
      <section className="py-20 lg:py-24 border-b border-white/8 bg-tech-grid">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300 mb-6">
            <span>CONTACT &bull; INQUIRY</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-bold text-white tracking-tight mb-4">
            Start a Project
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Tell us what you&apos;re trying to build, automate or improve.
          </p>
        </div>
      </section>

      {/* Main Form & Contact Information Grid */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Let's build something useful */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-2xl bg-[#0E1422] border border-white/8 space-y-6">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                Let&apos;s build something useful.
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed font-light">
                Whether you need an autonomous AI worker, a custom SaaS platform, or enterprise workflow automation, our engineering team is ready to evaluate your requirements.
              </p>

              <div className="space-y-3 pt-2 text-xs font-mono">
                <div className="text-slate-400">
                  <span className="text-slate-500 uppercase block text-[10px]">Email:</span>
                  <a href={`mailto:${COMPANY.email}`} className="text-slate-200 hover:text-[#12D9F5] text-sm">
                    {COMPANY.email}
                  </a>
                </div>

                <div className="text-slate-400">
                  <span className="text-slate-500 uppercase block text-[10px]">Phone:</span>
                  <a href={`tel:${COMPANY.phoneRaw}`} className="text-slate-200 hover:text-[#12D9F5] text-sm">
                    {COMPANY.phone}
                  </a>
                </div>

                <div className="text-slate-400">
                  <span className="text-slate-500 uppercase block text-[10px]">Website:</span>
                  <span className="text-slate-200 text-sm">{COMPANY.domain}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/8">
                <button
                  onClick={() => onNavigate('home')}
                  className="w-full py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 font-mono text-xs transition-all flex items-center justify-center gap-2"
                >
                  <Bot className="w-3.5 h-3.5 text-[#12D9F5]" />
                  <span>Talk to ALGorith AI Agent</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Professional Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#0E1422] border border-white/8 shadow-xl">
              
              {!submittedRef ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-display text-xl font-bold text-white mb-1">
                    Project Inquiry
                  </h3>

                  {/* Name & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300 block">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Vance"
                        className="w-full bg-[#080C14] border border-white/10 focus:border-[#12D9F5] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition-colors font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300 block">
                        Company
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Acme Corp"
                        className="w-full bg-[#080C14] border border-white/10 focus:border-[#12D9F5] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition-colors font-mono"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300 block">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full bg-[#080C14] border border-white/10 focus:border-[#12D9F5] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition-colors font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300 block">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-[#080C14] border border-white/10 focus:border-[#12D9F5] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition-colors font-mono"
                      />
                    </div>
                  </div>

                  {/* Project Type */}
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300 block">
                      Project Type
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-[#080C14] border border-white/10 focus:border-[#12D9F5] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition-colors font-mono"
                    >
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300 block">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe what you want to build, automate or improve..."
                      className="w-full bg-[#080C14] border border-white/10 focus:border-[#12D9F5] rounded-lg p-3 text-xs sm:text-sm text-white focus:outline-none transition-colors font-mono leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-shimmer py-3 rounded-lg bg-[#1557E8] hover:bg-[#168CFF] text-white font-medium text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Sending Enquiry...</span>
                    ) : (
                      <>
                        <span>Send Enquiry</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="py-10 text-center space-y-5">
                  <div className="w-14 h-14 rounded-full bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white">
                    Enquiry Sent
                  </h3>

                  <p className="text-slate-300 text-sm max-w-md mx-auto font-light leading-relaxed">
                    Thank you, <span className="text-white font-medium">{formData.name}</span>. We will review your specifications and get back to you within 24 hours.
                  </p>

                  <div className="p-3.5 rounded-lg bg-[#080C14] border border-white/8 max-w-xs mx-auto font-mono text-xs text-slate-300">
                    <div className="text-slate-500 text-[10px] uppercase">Reference ID:</div>
                    <div className="text-[#12D9F5] font-bold mt-0.5">{submittedRef}</div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => onNavigate('home')}
                      className="px-5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-mono text-xs border border-white/10"
                    >
                      Return to Home
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
