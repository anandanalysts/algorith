import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  ArrowRight,
  Sparkles,
  PhoneCall,
  Activity,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  Phone,
  Globe,
  Layers,
  ChevronRight,
  Bot
} from 'lucide-react';

import { COMPANY, trackEvent } from './config';
import { PageView, MAIN_NAV_ITEMS } from './types/navigation';
import { AlgorithBrandLockup } from './components/Logo';

// 6 Core Primary Views
import { HomeLandingView } from './components/views/HomeLandingView';
import { ProductsView } from './components/views/ProductsView';
import { SolutionsView } from './components/views/SolutionsView';
import { TechnologyView } from './components/views/TechnologyView';
import { AboutView } from './components/views/AboutView';
import { ContactView } from './components/views/ContactView';

export function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parseHashToView = (hash: string): PageView => {
    const clean = hash.replace(/^#\/?/, '').toLowerCase().split('?')[0];
    switch (clean) {
      case 'products':
      case 'tools':
      case 'ecosystem':
        return 'products';
      case 'solutions':
      case 'services':
      case 'consulting':
      case 'industries':
        return 'solutions';
      case 'technology':
      case 'tech':
      case 'stack':
      case 'architecture':
        return 'technology';
      case 'about':
      case 'vision':
      case 'mission':
      case 'philosophy':
        return 'about';
      case 'contact':
      case 'start-a-project':
      case 'project':
      case 'build':
        return 'contact';
      case 'home':
      default:
        return 'home';
    }
  };

  const [currentView, setCurrentView] = useState<PageView>(() => {
    if (typeof window !== 'undefined') {
      return parseHashToView(window.location.hash);
    }
    return 'home';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const targetView = parseHashToView(window.location.hash);
      setCurrentView(targetView);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view: PageView) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    trackEvent('page_navigation', { from: currentView, to: view });

    if (view === 'home') {
      window.location.hash = '';
      if (window.history.pushState) {
        window.history.pushState(null, '', window.location.pathname);
      }
    } else {
      window.location.hash = `#${view}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100 font-sans selection:bg-[#12D9F5] selection:text-[#080C14] flex flex-col justify-between">
      
      {/* Global Header & Navigation */}
      <header className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled 
          ? 'bg-[#080C14]/90 backdrop-blur-md border-b border-white/8 shadow-sm' 
          : 'bg-[#080C14]/60 backdrop-blur-sm border-b border-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo & Wordmark */}
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center group text-left shrink-0 hover:opacity-95 transition-opacity"
          >
            <AlgorithBrandLockup
              showIcon={true}
              showSlogan={true}
              wordmarkClassName="text-xl sm:text-2xl font-bold"
              sloganClassName="text-[8px] sm:text-[9px] tracking-[0.22em] text-[#7A8B9E] group-hover:text-slate-300 transition-colors"
              techBadgeClassName="text-[9px] px-1.5 py-0.5 rounded bg-[#0A1A2E] text-[#12D9F5]"
            />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {MAIN_NAV_ITEMS.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all relative flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#12D9F5] bg-white/5 border border-white/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/4 border border-transparent'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#12D9F5] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Start a Project CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('contact')}
              className="btn-shimmer hidden sm:inline-flex items-center gap-1.5 font-medium text-xs px-4 py-2 rounded-lg bg-[#1557E8] hover:bg-[#168CFF] text-white shadow-sm transition-all"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/5 text-slate-300 hover:text-white border border-white/10 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-[#0A101D] border-b border-white/10 px-4 py-6 space-y-2 overflow-hidden"
            >
              <div className="text-[10px] font-mono text-slate-500 uppercase px-3 mb-2">
                Navigation
              </div>

              {MAIN_NAV_ITEMS.map((item) => {
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigateTo(item.id)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-mono flex items-center justify-between ${
                      isActive
                        ? 'bg-[#1557E8] text-white font-medium'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                );
              })}

              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={() => navigateTo('contact')}
                  className="w-full btn-shimmer inline-flex items-center justify-center gap-2 bg-[#1557E8] text-white text-xs font-medium py-2.5 rounded-lg shadow-sm"
                >
                  <span>Start a Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main View Switcher */}
      <main className="flex-1">
        {currentView === 'home' && <HomeLandingView onNavigate={navigateTo} />}
        {currentView === 'products' && <ProductsView onNavigate={navigateTo} />}
        {currentView === 'solutions' && <SolutionsView onNavigate={navigateTo} />}
        {currentView === 'technology' && <TechnologyView onNavigate={navigateTo} />}
        {currentView === 'about' && <AboutView onNavigate={navigateTo} />}
        {currentView === 'contact' && <ContactView onNavigate={navigateTo} />}
      </main>

      {/* Global Footer */}
      <footer className="bg-[#05080F] border-t border-white/8 pt-16 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/8">
            
            {/* Column 1: Brand & Slogan */}
            <div className="lg:col-span-2 space-y-4">
              <button
                onClick={() => navigateTo('home')}
                className="group text-left"
              >
                <AlgorithBrandLockup
                  showIcon={true}
                  showSlogan={true}
                  wordmarkClassName="text-2xl font-bold"
                  sloganClassName="text-[9px] tracking-[0.2em] text-[#7A8B9E] group-hover:text-slate-300 transition-colors"
                  techBadgeClassName="text-[10px] px-2 py-0.5"
                />
              </button>

              <p className="text-slate-400 text-xs sm:text-sm max-w-sm leading-relaxed">
                Technology that thinks, builds, automates and scales. We engineer AI systems, bespoke software, data pipelines, and intelligent workflows.
              </p>

              <div className="pt-2 text-xs font-mono text-slate-400 space-y-1">
                <div>Email: <a href={`mailto:${COMPANY.email}`} className="text-slate-300 hover:text-[#12D9F5]">{COMPANY.email}</a></div>
                <div>Phone: <a href={`tel:${COMPANY.phoneRaw}`} className="text-slate-300 hover:text-[#12D9F5]">{COMPANY.phone}</a></div>
                <div>Web: <a href={`https://${COMPANY.domain}`} className="text-slate-300 hover:text-[#12D9F5]">{COMPANY.domain}</a></div>
              </div>
            </div>

            {/* Column 2: Products */}
            <div className="space-y-3">
              <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Products
              </div>
              <ul className="space-y-2 text-xs font-mono text-slate-400">
                <li>
                  <button onClick={() => navigateTo('products')} className="hover:text-[#12D9F5] transition-colors">
                    ALGorith AI
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('products')} className="hover:text-[#12D9F5] transition-colors">
                    ALGorith CRM
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('products')} className="hover:text-[#12D9F5] transition-colors">
                    ALGorith ERP
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('products')} className="hover:text-[#12D9F5] transition-colors">
                    ALGorith Analytics
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Solutions */}
            <div className="space-y-3">
              <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Solutions
              </div>
              <ul className="space-y-2 text-xs font-mono text-slate-400">
                <li>
                  <button onClick={() => navigateTo('solutions')} className="hover:text-[#12D9F5] transition-colors">
                    AI &amp; Automation
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('solutions')} className="hover:text-[#12D9F5] transition-colors">
                    Software &amp; Business Systems
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('solutions')} className="hover:text-[#12D9F5] transition-colors">
                    Data &amp; Analytics
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('solutions')} className="hover:text-[#12D9F5] transition-colors">
                    Digital Transformation
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Architecture & Company */}
            <div className="space-y-3">
              <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Company &amp; Stack
              </div>
              <ul className="space-y-2 text-xs font-mono text-slate-400">
                <li>
                  <button onClick={() => navigateTo('technology')} className="hover:text-[#12D9F5] transition-colors">
                    Technology Stack
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('about')} className="hover:text-[#12D9F5] transition-colors">
                    About ALGorith
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('about')} className="hover:text-[#12D9F5] transition-colors">
                    Vision &amp; 4 Pillars
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('contact')} className="hover:text-[#12D9F5] transition-colors text-[#12D9F5] font-semibold">
                    Start a Project &rarr;
                  </button>
                </li>
              </ul>
            </div>

          </div>

          {/* Footer Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
            <div>
              &copy; {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved.
            </div>

            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-[#19DDB5] animate-pulse"></span>
                Systems Operational &bull; Deterministic AI
              </span>
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-[#12D9F5] transition-colors"
              >
                Back to Top ↑
              </button>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
