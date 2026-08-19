import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  Code2, 
  Database, 
  Cpu, 
  CheckCircle2, 
  Terminal, 
  Activity, 
  Sparkles, 
  ArrowRight, 
  Play, 
  ShieldCheck, 
  Clock, 
  Search, 
  Plus, 
  ChevronRight, 
  Menu, 
  X,
  Layers,
  Send,
  Building2,
  Rocket,
  ShoppingBag,
  Briefcase,
  Sliders,
  Mail,
  Phone,
  Globe,
  ExternalLink,
  BookOpen,
  Filter,
  Check,
  AlertCircle,
  Truck,
  MonitorCheck,
  Zap,
  Lock,
  ArrowUpRight,
  Maximize2
} from 'lucide-react';

import { COMPANY, trackEvent } from './config';
import { PRODUCTS, INDUSTRIES, INSIGHTS, ProductItem, InsightItem } from './data';
import { AlgorithLogo, AlgorithLogoIcon } from './components/Logo';

interface ScenarioData {
  title: string;
  steps: [string, string, string, string];
}

const scenarios: Record<string, ScenarioData> = {
  support: {
    title: "Customer Support Agent",
    steps: [
      "User Support Ticket Received",
      "Searching Internal Knowledge Base (RAG)",
      "Drafting Solution & Sentiment Score",
      "Auto-Reply Dispatched & Ticket Resolved"
    ]
  },
  docs: {
    title: "Document Parser",
    steps: [
      "PDF Invoice / Contract Uploaded",
      "OCR Extraction & Vision Embeddings",
      "Line-Item Structured JSON Validation",
      "Exported to Enterprise ERP / Ledger"
    ]
  },
  leads: {
    title: "Lead Scoring Agent",
    steps: [
      "Inbound Demo Form Submitted",
      "Company Metadata Enrichment & Validation",
      "AI Lead Score Computed (88/100)",
      "Calendar Invite & Rep Assigned Automatically"
    ]
  }
};

const stepData = {
  1: {
    phase: "PHASE 01 — STRATEGY",
    title: "THINK: Diagnostic & System Architecture",
    desc: "We map out business constraints, data silos, and operational objectives to design an optimal technical roadmap before writing code.",
    deliverables: [
      "Technical Architecture Blueprint",
      "Data Schema & Entity Relationship Mapping",
      "ROI & Automation Scope Specification"
    ]
  },
  2: {
    phase: "PHASE 02 — ENGINEERING",
    title: "BUILD: Scalable Software & AI Integration",
    desc: "High-performance software development, vector database configuration, and microservices implementation using rigorous code reviews.",
    deliverables: [
      "Production-Grade TypeScript / Full-stack Codebase",
      "Microservice REST / GraphQL APIs & Vector Stores",
      "Automated Test Suites & CI/CD Pipelines"
    ]
  },
  3: {
    phase: "PHASE 03 — AUTOMATION",
    title: "AUTOMATE: Workflow & Systems Orchestration",
    desc: "Connecting API endpoints, triggers, and autonomous agent loops to eliminate repetitive manual operational tasks.",
    deliverables: [
      "Cross-System Webhooks & Event Streams",
      "Autonomous AI Agent Pipelines",
      "Operational Health & Latency Dashboards"
    ]
  },
  4: {
    phase: "PHASE 04 — SCALING",
    title: "GROW: Optimization & Continuous Scaling",
    desc: "System deployment with continuous performance tracking, model accuracy tuning, and modular infrastructure growth.",
    deliverables: [
      "Production 99.98% SLA Monitoring",
      "Continuous Model Fine-Tuning & Evaluation",
      "Executive Analytics & Performance Insights"
    ]
  }
};

const faqs = [
  {
    q: "How quickly can your engineering team start?",
    a: "We typically initiate new project alignment within 5 to 7 business days following contract agreement and discovery completion."
  },
  {
    q: "Who owns the source code and IP created?",
    a: "You maintain 100% full intellectual property ownership of all custom code, documentation, schemas, and operational pipelines created."
  },
  {
    q: "What engagement models do you offer?",
    a: "We offer fixed-scope milestone projects, rapid MVP sprints, and dedicated full-stack engineering retainer engagements."
  },
  {
    q: "How do you ensure data security and AI privacy?",
    a: "We deploy isolated VPCs, zero-retention enterprise LLM agreements, role-based access control (RBAC), and strict end-to-end encryption."
  },
  {
    q: "Can you integrate with our existing stack?",
    a: "Yes. We build custom API connectors, webhooks, and middleware to seamlessly interface with modern cloud providers, legacy SQL databases, and SaaS tools."
  }
];

// Reusable Intersection-Observer Slide-Up Component
interface SectionRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  yOffset?: number;
  key?: React.Key;
}

function SectionReveal({
  children,
  delay = 0,
  className = "",
  yOffset = 36,
}: SectionRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Mobile Nav Drawer
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Terminal State
  const [activeTermTab, setActiveTermTab] = useState<'pipeline' | 'cli' | 'specs'>('pipeline');
  const [cliLogs, setCliLogs] = useState<Array<{ id: string; time: string; text: string; color?: string }>>([
    { id: '1', time: '09:00:12', text: '[SYSTEM] ALGorith Engine v2.4 initialized...' },
    { id: '2', time: '09:00:13', text: '[INFO] Connected to Vector Store (Qdrant Cloud)' },
    { id: '3', time: '09:00:14', text: '[INFO] RAG pipeline listening on port 8080' },
    { id: '4', time: '09:00:15', text: '> Ready for commands...', color: '#12D9F5' }
  ]);
  const [customCmd, setCustomCmd] = useState('');

  // AI Playground Simulator
  const [activeScenario, setActiveScenario] = useState<string>('support');
  const [runningStepIdx, setRunningStepIdx] = useState<number>(-1);
  const [isSimulating, setIsSimulating] = useState(false);

  // Method Framework Inspector
  const [selectedMethodStep, setSelectedMethodStep] = useState<1 | 2 | 3 | 4>(1);

  // Scope Estimator Calculator
  const [basePrice, setBasePrice] = useState<number>(12000);
  const [baseWeeks, setBaseWeeks] = useState<number>(4);
  const [scaleFactor, setScaleFactor] = useState<number>(2);
  const [addonSla, setAddonSla] = useState<boolean>(false);
  const [addonSec, setAddonSec] = useState<boolean>(false);

  // Animated Price State
  const [displayPrice, setDisplayPrice] = useState<number>(12000);

  // Product Filter
  const [productCategory, setProductCategory] = useState<string>('ALL');

  // FAQ Search & Accordion
  const [faqSearch, setFaqSearch] = useState<string>('');
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Selected Insight Modal
  const [selectedInsight, setSelectedInsight] = useState<InsightItem | null>(null);

  // Consultation Form
  const [selectedSlot, setSelectedSlot] = useState<string>('Mon — 10:00 AM EST');
  const [formData, setFormData] = useState({ name: '', email: '', need: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // Mouse interaction for spotlight cards
  const handleSpotlightMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  // Hero Canvas Animation with mouse interaction & physics
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    const mouse = { x: -1000, y: -1000, radius: 140 };

    const resize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    resize();
    window.addEventListener('resize', resize);
    canvas.parentElement?.addEventListener('mousemove', handleMouseMove);
    canvas.parentElement?.addEventListener('mouseleave', handleMouseLeave);

    class Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      radius: number;
      density: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.density = Math.random() * 20 + 5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse physics
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius && distance > 0) {
          const force = (mouse.radius - distance) / mouse.radius;
          const directionX = (dx / distance) * force * 1.5;
          const directionY = (dy / distance) * force * 1.5;
          this.x += directionX;
          this.y += directionY;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#12D9F5';
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#12D9F5';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const particleCount = window.innerWidth < 768 ? 22 : 48;
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect particles to mouse
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Mouse connection line
        const dxMouse = mouse.x - particles[i].x;
        const dyMouse = mouse.y - particles[i].y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(18, 217, 245, ${0.4 * (1 - distMouse / 130)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        // Particle to particle connection
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 115) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(18, 217, 245, ${0.7 * (1 - dist / 115)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.parentElement?.removeEventListener('mousemove', handleMouseMove);
      canvas.parentElement?.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Calculate Estimations
  const addonPrice = (addonSla ? 4000 : 0) + (addonSec ? 3500 : 0);
  const addonWeeks = (addonSla ? 1 : 0) + (addonSec ? 1 : 0);
  const targetMinPrice = Math.round(basePrice * (0.85 + scaleFactor * 0.25) + addonPrice);
  const targetMaxPrice = Math.round(targetMinPrice * 1.3);
  const estimatedMinWeeks = Math.round(baseWeeks * scaleFactor + addonWeeks);
  const estimatedMaxWeeks = estimatedMinWeeks + 2;

  // Smooth numeric counter effect
  useEffect(() => {
    let start = displayPrice;
    const end = targetMinPrice;
    if (start === end) return;

    const duration = 400;
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * ease);
      setDisplayPrice(current);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    const animId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animId);
  }, [targetMinPrice]);

  // Run CLI Commands
  const runCli = (cmd: string) => {
    trackEvent('cli_command_run', { command: cmd });
    const time = new Date().toLocaleTimeString();
    let responseText = '';
    let responseColor = '#19DDB5';

    if (cmd.includes('test-ai')) {
      responseText = `✔ LLM Benchmark: RAG Latency: 12ms | Accuracy: 99.8%`;
    } else if (cmd.includes('deploy')) {
      responseText = `✔ CI/CD Triggered: Kubernetes Cluster Active in us-east-1`;
      responseColor = '#12D9F5';
    } else if (cmd.includes('optimize')) {
      responseText = `✔ Vector Index: HNSW Rebuilt: 10M embeddings synced`;
    } else {
      responseText = `✔ Command executed: ${cmd} [OK: 200]`;
    }

    setCliLogs(prev => [
      ...prev,
      { id: Date.now().toString(), time, text: `> ${cmd}` },
      { id: (Date.now() + 1).toString(), time, text: responseText, color: responseColor }
    ]);
  };

  // Run Simulation Sequence
  const runAiSimulation = () => {
    if (isSimulating) return;
    trackEvent('ai_playground_simulated', { scenario: activeScenario });
    setIsSimulating(true);
    setRunningStepIdx(0);

    const stepIntervals = [0, 600, 1200, 1800];
    stepIntervals.forEach((time, index) => {
      setTimeout(() => {
        setRunningStepIdx(index);
        if (index === 3) {
          setTimeout(() => {
            setIsSimulating(false);
          }, 1500);
        }
      }, time);
    });
  };

  // Filter Products
  const filteredProducts = productCategory === 'ALL' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === productCategory);

  // Filter FAQs
  const filteredFaqs = faqs.filter(
    item =>
      item.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
      item.a.toLowerCase().includes(faqSearch.toLowerCase())
  );

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    trackEvent('consultation_form_submit_attempt', { slot: selectedSlot, need: formData.need });

    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      trackEvent('consultation_form_submit_success', { slot: selectedSlot, need: formData.need });
    }, 700);
  };

  return (
    <div className="min-h-screen text-[#F8FAFC] bg-[#061226] font-['Inter'] relative selection:bg-[#12D9F5]/30 selection:text-white bg-tech-grid">
      
      {/* Quick Live Status Widget */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        id="quick-status-widget"
        className="fixed bottom-6 right-6 z-40 bg-[#102544]/95 backdrop-blur-md border border-[#12D9F5]/40 px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-3 font-['IBM_Plex_Mono'] text-xs hover:border-[#12D9F5] transition-all hover:scale-105"
      >
        <span className="badge-pulse"></span>
        <span className="text-slate-200">
          SYS_STATUS: <span className="text-[#19DDB5] font-semibold">99.98% OPERATIONAL</span>
        </span>
        <a 
          href="#contact" 
          onClick={() => trackEvent('quick_status_build_click')}
          className="text-[#12D9F5] hover:text-white transition-colors underline font-medium ml-1 flex items-center gap-1"
        >
          Build <ArrowRight className="w-3 h-3" />
        </a>
      </motion.div>

      {/* Mobile Nav Backdrop Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#061226]/85 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <aside 
        id="mobile-drawer"
        className={`fixed top-0 right-0 w-[85%] max-w-sm h-full bg-[#0B1930] border-l border-slate-700/50 p-8 flex flex-col gap-6 z-50 transition-transform duration-300 ease-out lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center pb-4 border-b border-slate-800">
          <AlgorithLogo size={28} textClassName="text-lg" sloganClassName="text-[8px]" />
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-400 hover:text-white p-1"
            aria-label="Close Menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-3 text-base font-medium">
          <a href="#solutions" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-800/80 hover:text-[#12D9F5] transition-colors">Solutions</a>
          <a href="#products" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-800/80 hover:text-[#12D9F5] transition-colors">Products</a>
          <a href="#industries" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-800/80 hover:text-[#12D9F5] transition-colors">Industries</a>
          <a href="#work" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-800/80 hover:text-[#12D9F5] transition-colors">Work</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-800/80 hover:text-[#12D9F5] transition-colors">About</a>
          <a href="#insights" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-800/80 hover:text-[#12D9F5] transition-colors">Insights</a>
        </nav>

        <a 
          href="#contact" 
          onClick={() => {
            setMobileMenuOpen(false);
            trackEvent('mobile_cta_click');
          }}
          className="mt-4 w-full text-center bg-[#1557E8] hover:bg-[#168CFF] text-white font-semibold py-3 px-4 rounded-md shadow-lg shadow-blue-700/30 transition-all"
        >
          Let's Build →
        </a>
      </aside>

      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#061226]/90 backdrop-blur-md border-b border-slate-800/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#" aria-label="ALGorith Technologies">
            <AlgorithLogo size={32} />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            {['Solutions', 'Products', 'Industries', 'Work', 'About', 'Insights'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="hover:text-[#12D9F5] transition-colors relative py-1 group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#12D9F5] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Header CTA */}
          <div className="hidden lg:flex items-center">
            <motion.a 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href="#contact"
              onClick={() => trackEvent('header_cta_click')}
              className="btn-shimmer inline-flex items-center justify-center gap-2 bg-[#1557E8] hover:bg-[#168CFF] text-white text-sm font-semibold px-6 py-2.5 rounded-md shadow-lg shadow-blue-700/30 transition-all"
            >
              Let's Build →
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            id="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 text-slate-300 hover:text-white"
            aria-label="Toggle navigation"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:py-24 border-b border-slate-800/80 overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-auto opacity-70 z-0 cursor-crosshair" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pointer-events-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 pointer-events-auto">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#12D9F5]/10 border border-[#12D9F5]/30 text-[#12D9F5] font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider"
              >
                <span className="badge-pulse"></span>
                {COMPANY.positioning.toUpperCase()}
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-neo text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-white"
              >
                Think.<br />
                Build.<br />
                <span className="text-gradient">Automate.</span><br />
                Grow.
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-xl font-medium text-slate-100"
              >
                AI-powered software, data and automation solutions for modern businesses.
              </motion.p>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-slate-400 text-base max-w-xl leading-relaxed"
              >
                &ldquo;We design and build intelligent digital systems that help businesses automate operations, connect data and grow faster.&rdquo;
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="flex flex-wrap gap-4 pt-2"
              >
                <motion.a 
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href="#contact"
                  onClick={() => trackEvent('hero_lets_build_click')}
                  className="btn-shimmer inline-flex items-center justify-center gap-2 bg-[#1557E8] hover:bg-[#168CFF] text-white font-semibold px-7 py-3.5 rounded-md shadow-lg shadow-blue-700/30 transition-all text-base"
                >
                  Let's Build →
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href="#solutions"
                  onClick={() => trackEvent('hero_explore_solutions_click')}
                  className="inline-flex items-center justify-center gap-2 bg-[#102544] hover:bg-[#16325B] text-slate-200 border border-slate-700/60 font-semibold px-7 py-3.5 rounded-md hover:border-[#12D9F5] hover:text-[#12D9F5] transition-all text-base"
                >
                  Explore Solutions
                </motion.a>
              </motion.div>
            </div>

            {/* Hero Right: Interactive Terminal Widget */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 pointer-events-auto"
            >
              <div className="bg-[#0B1930] border border-[#12D9F5]/35 rounded-2xl overflow-hidden shadow-2xl shadow-blue-950/60 relative">
                <div className="terminal-scanline"></div>
                
                {/* Terminal Nav Header */}
                <div className="bg-[#102544] px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex gap-2">
                    {(['pipeline', 'cli', 'specs'] as const).map((tab) => (
                      <button 
                        key={tab}
                        onClick={() => {
                          setActiveTermTab(tab);
                          trackEvent('terminal_tab_switch', { tab });
                        }}
                        className={`font-['IBM_Plex_Mono'] text-xs px-3 py-1.5 rounded transition-all capitalize ${
                          activeTermTab === tab
                            ? 'bg-[#0B1930] text-[#12D9F5] border border-slate-700 shadow-sm'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {tab === 'cli' ? 'CLI Shell' : tab === 'specs' ? 'Live Specs' : 'Pipeline'}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 font-['IBM_Plex_Mono'] text-[11px] text-[#19DDB5] font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#19DDB5] animate-pulse"></span>
                    LIVE RUNTIME
                  </div>
                </div>

                {/* Terminal Content Body */}
                <div className="p-6 min-h-[340px] flex flex-col justify-center">
                  
                  {/* TAB 1: PIPELINE */}
                  {activeTermTab === 'pipeline' && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3.5 relative before:absolute before:left-[19px] before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-800"
                    >
                      {[
                        { num: '01', title: 'THINK', status: 'VERIFIED', statusColor: 'text-[#19DDB5]', desc: '> problem identified & architecture defined' },
                        { num: '02', title: 'BUILD', status: 'ACTIVE', statusColor: 'text-[#12D9F5]', desc: '> intelligent software & data models deployed' },
                        { num: '03', title: 'AUTOMATE', status: 'RUNNING', statusColor: 'text-[#12D9F5]', desc: '> autonomous workflows & APIs connected' },
                        { num: '04', title: 'GROW', status: 'OPTIMIZED', statusColor: 'text-[#19DDB5]', desc: '> system deployed — growth enabled' },
                      ].map((node, i) => (
                        <motion.div 
                          key={node.num} 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.08 }}
                          className="flex items-start gap-4 relative z-10"
                        >
                          <div className="w-10 h-10 rounded-full bg-[#1557E8] border border-[#12D9F5] shadow-lg shadow-cyan-500/20 text-white font-['IBM_Plex_Mono'] font-bold text-xs flex items-center justify-center shrink-0 relative">
                            <span className="relative z-10">{node.num}</span>
                            {node.status === 'RUNNING' && <div className="radar-wave"></div>}
                          </div>
                          <div className="bg-[#102544] border border-slate-700/80 rounded p-3 w-full hover:border-[#12D9F5]/60 transition-colors">
                            <div className="font-['IBM_Plex_Mono'] text-xs font-semibold text-[#12D9F5] flex justify-between items-center">
                              <span>{node.title}</span>
                              <span className={`text-[10px] ${node.statusColor}`}>{node.status}</span>
                            </div>
                            <div className="text-xs text-slate-400 mt-1 font-mono">{node.desc}</div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {/* TAB 2: CLI SHELL */}
                  {activeTermTab === 'cli' && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col h-full space-y-4"
                    >
                      <div className="bg-[#040A14] border border-slate-800 rounded p-3.5 font-['IBM_Plex_Mono'] text-xs text-slate-200 h-52 overflow-y-auto space-y-1.5">
                        {cliLogs.map((log) => (
                          <div key={log.id} style={{ color: log.color || '#CBD5E1' }}>
                            <span className="text-slate-500 text-[10px] mr-1.5">[{log.time}]</span>
                            {log.text}
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button 
                          onClick={() => runCli('run --test-ai')}
                          className="bg-[#102544] hover:bg-[#1557E8] text-[#12D9F5] hover:text-white border border-slate-700 text-xs font-mono py-1.5 px-3 rounded transition-colors active:scale-95"
                        >
                          run --test-ai
                        </button>
                        <button 
                          onClick={() => runCli('deploy --rag')}
                          className="bg-[#102544] hover:bg-[#1557E8] text-[#12D9F5] hover:text-white border border-slate-700 text-xs font-mono py-1.5 px-3 rounded transition-colors active:scale-95"
                        >
                          deploy --rag
                        </button>
                        <button 
                          onClick={() => runCli('optimize --pipeline')}
                          className="bg-[#102544] hover:bg-[#1557E8] text-[#12D9F5] hover:text-white border border-slate-700 text-xs font-mono py-1.5 px-3 rounded transition-colors active:scale-95"
                        >
                          optimize --pipeline
                        </button>
                      </div>

                      <form 
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (!customCmd.trim()) return;
                          runCli(customCmd.trim());
                          setCustomCmd('');
                        }}
                        className="flex gap-2"
                      >
                        <div className="relative flex-1">
                          <span className="absolute left-3 top-2.5 text-xs text-cyan-400 font-mono">$</span>
                          <input 
                            type="text"
                            value={customCmd}
                            onChange={(e) => setCustomCmd(e.target.value)}
                            placeholder="Type command (e.g., status --all)..."
                            className="w-full bg-[#040A14] border border-slate-800 rounded pl-7 pr-3 py-2 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-[#12D9F5]"
                          />
                        </div>
                        <button type="submit" className="bg-[#1557E8] hover:bg-[#168CFF] px-3 py-2 rounded text-white text-xs font-mono transition-transform active:scale-95">
                          Send
                        </button>
                      </form>
                    </motion.div>
                  )}

                  {/* TAB 3: LIVE SPECS */}
                  {activeTermTab === 'specs' && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div className="bg-[#102544] border border-slate-700/80 p-4 rounded-lg hover:border-[#19DDB5]/60 transition-colors">
                        <div className="font-neo text-3xl font-bold text-[#19DDB5]">14ms</div>
                        <div className="font-['IBM_Plex_Mono'] text-xs text-slate-400 mt-1">API Response Latency</div>
                      </div>
                      <div className="bg-[#102544] border border-slate-700/80 p-4 rounded-lg hover:border-[#12D9F5]/60 transition-colors">
                        <div className="font-neo text-3xl font-bold text-[#12D9F5]">99.98%</div>
                        <div className="font-['IBM_Plex_Mono'] text-xs text-slate-400 mt-1">System Reliability SLA</div>
                      </div>
                      <div className="bg-[#102544] border border-slate-700/80 p-4 rounded-lg hover:border-[#19DDB5]/60 transition-colors">
                        <div className="font-neo text-3xl font-bold text-[#19DDB5]">2.4M</div>
                        <div className="font-['IBM_Plex_Mono'] text-xs text-slate-400 mt-1">Daily Tokens Processed</div>
                      </div>
                      <div className="bg-[#102544] border border-slate-700/80 p-4 rounded-lg hover:border-[#12D9F5]/60 transition-colors">
                        <div className="font-neo text-3xl font-bold text-[#12D9F5]">&lt; 0.01%</div>
                        <div className="font-['IBM_Plex_Mono'] text-xs text-slate-400 mt-1">Error Rate Rate</div>
                      </div>
                    </motion.div>
                  )}

                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Capability Strip */}
      <SectionReveal className="bg-[#0B1930] border-b border-slate-800/80 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-around items-center flex-wrap gap-6 font-neo text-lg sm:text-xl font-bold tracking-wider text-slate-200">
            <div className="flex items-center gap-2 hover:text-[#12D9F5] transition-colors cursor-default"><span>⚡</span> AI</div>
            <div className="flex items-center gap-2 hover:text-[#12D9F5] transition-colors cursor-default"><span>💻</span> SOFTWARE</div>
            <div className="flex items-center gap-2 hover:text-[#12D9F5] transition-colors cursor-default"><span>📊</span> DATA</div>
            <div className="flex items-center gap-2 hover:text-[#12D9F5] transition-colors cursor-default"><span>🔄</span> AUTOMATION</div>
          </div>
        </div>
      </SectionReveal>

      {/* Continuous Marquee Banner */}
      <div className="bg-[#102544] border-b border-slate-800/80 py-3.5 overflow-hidden whitespace-nowrap">
        <div className="animate-marquee font-['IBM_Plex_Mono'] text-sm font-medium text-slate-400">
          {[1, 2].map((iter) => (
            <div key={iter} className="inline-flex items-center gap-8 pr-8">
              <span>AI</span> <span className="text-[#12D9F5]">•</span>
              <span>SOFTWARE</span> <span className="text-[#12D9F5]">•</span>
              <span>DATA</span> <span className="text-[#12D9F5]">•</span>
              <span>AUTOMATION</span> <span className="text-[#12D9F5]">•</span>
              <span>DIGITAL PRODUCTS</span> <span className="text-[#12D9F5]">•</span>
              <span>INTELLIGENT SYSTEMS</span> <span className="text-[#12D9F5]">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Solutions Section */}
      <section id="solutions" className="py-24 border-b border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#12D9F5]/10 border border-[#12D9F5]/30 text-[#12D9F5] font-['IBM_Plex_Mono'] text-xs font-semibold tracking-wider">
              SOLUTIONS &amp; CAPABILITIES
            </div>
            <h2 className="font-neo text-3xl sm:text-5xl font-bold tracking-tight text-white">
              TECHNOLOGY BUILT AROUND YOUR BUSINESS
            </h2>
            <p className="text-slate-400 text-lg">
              &ldquo;From intelligent automation to scalable software, ALGorith helps businesses transform complex processes into connected digital systems.&rdquo;
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: ALGorith AI */}
            <SectionReveal delay={0.1}>
              <div 
                onMouseMove={handleSpotlightMouseMove}
                className="spotlight-card bg-[#0B1930] border border-slate-800 hover:border-[#12D9F5] rounded-xl p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10 group h-full"
              >
                <div className="relative z-10">
                  <div className="font-['IBM_Plex_Mono'] text-xs text-[#12D9F5] font-semibold mb-4">01 — AI</div>
                  <div className="w-12 h-12 rounded bg-[#102544] border border-slate-700 flex items-center justify-center text-2xl text-[#12D9F5] mb-5 group-hover:scale-110 group-hover:border-[#12D9F5] transition-all">
                    🤖
                  </div>
                  <h3 className="font-neo text-2xl font-bold text-white mb-2">ALGorith AI</h3>
                  <p className="text-slate-400 text-sm mb-6">Build intelligent systems that understand, assist and act.</p>
                  <ul className="space-y-2 border-t border-slate-800/80 pt-4 text-xs text-slate-300 mb-8">
                    <li className="flex items-center gap-2"><span className="text-[#19DDB5] font-bold">›</span> AI Assistants &amp; Autonomous Agents</li>
                    <li className="flex items-center gap-2"><span className="text-[#19DDB5] font-bold">›</span> Generative AI &amp; LLM Integration</li>
                    <li className="flex items-center gap-2"><span className="text-[#19DDB5] font-bold">›</span> RAG / Custom Knowledge Systems</li>
                    <li className="flex items-center gap-2"><span className="text-[#19DDB5] font-bold">›</span> Intelligent Customer Support Pipelines</li>
                  </ul>
                </div>
                <a 
                  href="#contact" 
                  onClick={() => trackEvent('solution_card_cta', { solution: 'ALGorith AI' })}
                  className="relative z-10 w-full text-center bg-[#102544] hover:bg-[#16325B] hover:text-[#12D9F5] border border-slate-700 hover:border-[#12D9F5] text-xs font-semibold py-2.5 px-4 rounded transition-all"
                >
                  Request AI Scope →
                </a>
              </div>
            </SectionReveal>

            {/* Card 2: ALGorith Software */}
            <SectionReveal delay={0.2}>
              <div 
                onMouseMove={handleSpotlightMouseMove}
                className="spotlight-card bg-[#0B1930] border border-slate-800 hover:border-[#12D9F5] rounded-xl p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10 group h-full"
              >
                <div className="relative z-10">
                  <div className="font-['IBM_Plex_Mono'] text-xs text-[#12D9F5] font-semibold mb-4">02 — SOFTWARE</div>
                  <div className="w-12 h-12 rounded bg-[#102544] border border-slate-700 flex items-center justify-center text-2xl text-[#12D9F5] mb-5 group-hover:scale-110 group-hover:border-[#12D9F5] transition-all">
                    💻
                  </div>
                  <h3 className="font-neo text-2xl font-bold text-white mb-2">ALGorith Software</h3>
                  <p className="text-slate-400 text-sm mb-6">Build scalable digital products and business software.</p>
                  <ul className="space-y-2 border-t border-slate-800/80 pt-4 text-xs text-slate-300 mb-8">
                    <li className="flex items-center gap-2"><span className="text-[#19DDB5] font-bold">›</span> High-Performance Web Applications</li>
                    <li className="flex items-center gap-2"><span className="text-[#19DDB5] font-bold">›</span> Enterprise SaaS Platforms &amp; Portals</li>
                    <li className="flex items-center gap-2"><span className="text-[#19DDB5] font-bold">›</span> Robust APIs &amp; Microservices</li>
                    <li className="flex items-center gap-2"><span className="text-[#19DDB5] font-bold">›</span> Rapid Production-Grade MVP Development</li>
                  </ul>
                </div>
                <a 
                  href="#contact" 
                  onClick={() => trackEvent('solution_card_cta', { solution: 'ALGorith Software' })}
                  className="relative z-10 w-full text-center bg-[#102544] hover:bg-[#16325B] hover:text-[#12D9F5] border border-slate-700 hover:border-[#12D9F5] text-xs font-semibold py-2.5 px-4 rounded transition-all"
                >
                  Request Software Scope →
                </a>
              </div>
            </SectionReveal>

            {/* Card 3: ALGorith Data */}
            <SectionReveal delay={0.3}>
              <div 
                onMouseMove={handleSpotlightMouseMove}
                className="spotlight-card bg-[#0B1930] border border-slate-800 hover:border-[#12D9F5] rounded-xl p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10 group h-full"
              >
                <div className="relative z-10">
                  <div className="font-['IBM_Plex_Mono'] text-xs text-[#12D9F5] font-semibold mb-4">03 — DATA</div>
                  <div className="w-12 h-12 rounded bg-[#102544] border border-slate-700 flex items-center justify-center text-2xl text-[#12D9F5] mb-5 group-hover:scale-110 group-hover:border-[#12D9F5] transition-all">
                    📊
                  </div>
                  <h3 className="font-neo text-2xl font-bold text-white mb-2">ALGorith Data</h3>
                  <p className="text-slate-400 text-sm mb-6">Turn business data into actionable decisions.</p>
                  <ul className="space-y-2 border-t border-slate-800/80 pt-4 text-xs text-slate-300 mb-8">
                    <li className="flex items-center gap-2"><span className="text-[#19DDB5] font-bold">›</span> Data Engineering &amp; ETL Pipelines</li>
                    <li className="flex items-center gap-2"><span className="text-[#19DDB5] font-bold">›</span> Executive KPI Dashboards</li>
                    <li className="flex items-center gap-2"><span className="text-[#19DDB5] font-bold">›</span> Automated Reporting Infrastructure</li>
                    <li className="flex items-center gap-2"><span className="text-[#19DDB5] font-bold">›</span> Predictive &amp; BI Analytics</li>
                  </ul>
                </div>
                <a 
                  href="#contact" 
                  onClick={() => trackEvent('solution_card_cta', { solution: 'ALGorith Data' })}
                  className="relative z-10 w-full text-center bg-[#102544] hover:bg-[#16325B] hover:text-[#12D9F5] border border-slate-700 hover:border-[#12D9F5] text-xs font-semibold py-2.5 px-4 rounded transition-all"
                >
                  Explore Data Architecture →
                </a>
              </div>
            </SectionReveal>

            {/* Card 4: ALGorith Automation */}
            <SectionReveal delay={0.4}>
              <div 
                onMouseMove={handleSpotlightMouseMove}
                className="spotlight-card bg-[#0B1930] border border-slate-800 hover:border-[#12D9F5] rounded-xl p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10 group h-full"
              >
                <div className="relative z-10">
                  <div className="font-['IBM_Plex_Mono'] text-xs text-[#12D9F5] font-semibold mb-4">04 — AUTOMATION</div>
                  <div className="w-12 h-12 rounded bg-[#102544] border border-slate-700 flex items-center justify-center text-2xl text-[#12D9F5] mb-5 group-hover:scale-110 group-hover:border-[#12D9F5] transition-all">
                    ⚙️
                  </div>
                  <h3 className="font-neo text-2xl font-bold text-white mb-2">ALGorith Automation</h3>
                  <p className="text-slate-400 text-sm mb-6">Remove repetitive work and connect business processes.</p>
                  <ul className="space-y-2 border-t border-slate-800/80 pt-4 text-xs text-slate-300 mb-8">
                    <li className="flex items-center gap-2"><span className="text-[#19DDB5] font-bold">›</span> Cross-System Workflow Automation</li>
                    <li className="flex items-center gap-2"><span className="text-[#19DDB5] font-bold">›</span> CRM, Lead &amp; Sales Operations</li>
                    <li className="flex items-center gap-2"><span className="text-[#19DDB5] font-bold">›</span> Intelligent Document Processing</li>
                    <li className="flex items-center gap-2"><span className="text-[#19DDB5] font-bold">›</span> Automated Communications &amp; Routing</li>
                  </ul>
                </div>
                <a 
                  href="#contact" 
                  onClick={() => trackEvent('solution_card_cta', { solution: 'ALGorith Automation' })}
                  className="relative z-10 w-full text-center bg-[#102544] hover:bg-[#16325B] hover:text-[#12D9F5] border border-slate-700 hover:border-[#12D9F5] text-xs font-semibold py-2.5 px-4 rounded transition-all"
                >
                  Build Automation Pipeline →
                </a>
              </div>
            </SectionReveal>

          </div>

          {/* AI Playground: Interactive Demonstration */}
          <SectionReveal delay={0.2} className="mt-16 bg-[#0B1930] border border-[#12D9F5]/35 rounded-2xl p-6 sm:p-10 shadow-2xl">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#12D9F5]/10 border border-[#12D9F5]/30 text-[#12D9F5] font-['IBM_Plex_Mono'] text-xs font-semibold mb-2">
                  AI PLAYGROUND • INTERACTIVE DEMONSTRATION
                </div>
                <h3 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-white">
                  SIMULATE AN ALGORITH INTELLIGENT WORKFLOW
                </h3>
              </div>

              {/* Scenario Toggles */}
              <div className="flex flex-wrap gap-2">
                {Object.entries(scenarios).map(([key, data]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveScenario(key);
                      setRunningStepIdx(-1);
                      trackEvent('scenario_switch', { scenario: key });
                    }}
                    className={`px-3.5 py-2 rounded text-xs font-['IBM_Plex_Mono'] transition-all ${
                      activeScenario === key
                        ? 'bg-[#1557E8] text-white border border-[#12D9F5] shadow-md scale-105'
                        : 'bg-[#102544] text-slate-400 border border-slate-700 hover:text-white'
                    }`}
                  >
                    {data.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Credibility disclaimer note */}
            <div className="bg-[#102544]/60 border border-slate-700/60 rounded-lg p-3 text-xs text-slate-400 font-mono mb-8 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#12D9F5] shrink-0" />
              <span>
                Demonstration purpose only. Production deployments are engineered with custom enterprise infrastructure, private VPCs, and verified SLAs.
              </span>
            </div>

            {/* Workflow Step Cards with Animated Glowing Pulse */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {scenarios[activeScenario].steps.map((stepText, idx) => {
                const isActive = runningStepIdx >= idx;
                const isCurrent = runningStepIdx === idx;
                return (
                  <motion.div 
                    key={idx}
                    animate={isCurrent ? { scale: [1, 1.03, 1], transition: { repeat: Infinity, duration: 1 } } : { scale: 1 }}
                    className={`p-5 rounded-xl border transition-all duration-300 relative overflow-hidden ${
                      isCurrent
                        ? 'bg-[#16325B] border-[#12D9F5] shadow-lg shadow-cyan-500/25'
                        : isActive
                        ? 'bg-[#102544] border-slate-600 text-white'
                        : 'bg-[#102544]/60 border-slate-800 text-slate-400'
                    }`}
                  >
                    {isCurrent && (
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#12D9F5] to-transparent animate-pulse"></div>
                    )}
                    <div className="font-['IBM_Plex_Mono'] text-[11px] font-semibold text-[#12D9F5] uppercase mb-2 flex items-center justify-between">
                      <span>Step 0{idx + 1}</span>
                      {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-[#19DDB5]" />}
                    </div>
                    <div className="text-sm font-medium text-slate-200">
                      {stepText}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-8 flex justify-end">
              <motion.button 
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={runAiSimulation}
                disabled={isSimulating}
                className="btn-shimmer inline-flex items-center gap-2 bg-[#1557E8] hover:bg-[#168CFF] text-white text-sm font-semibold px-6 py-3 rounded shadow-lg shadow-blue-700/30 transition-all disabled:opacity-50"
              >
                <Play className="w-4 h-4 fill-white" />
                {isSimulating ? 'Simulating Pipeline Execution...' : 'Run AI Simulation ▶'}
              </motion.button>
            </div>
          </SectionReveal>

        </div>
      </section>

      {/* The ALGorith Method */}
      <section id="method" className="py-24 bg-[#0B1930] border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#12D9F5]/10 border border-[#12D9F5]/30 text-[#12D9F5] font-['IBM_Plex_Mono'] text-xs font-semibold tracking-wider">
              OUR FRAMEWORK
            </div>
            <h2 className="font-neo text-3xl sm:text-5xl font-bold tracking-tight text-white">
              THE ALGORITH METHOD
            </h2>
            <p className="text-slate-400 text-lg font-['IBM_Plex_Mono']">
              {COMPANY.slogan}
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: 1 as const, title: 'THINK', sub: 'Diagnose → Research → Define' },
              { num: 2 as const, title: 'BUILD', sub: 'Architect → Design → Develop' },
              { num: 3 as const, title: 'AUTOMATE', sub: 'Integrate → Automate → Optimize' },
              { num: 4 as const, title: 'GROW', sub: 'Launch → Measure → Scale' }
            ].map((st, i) => (
              <SectionReveal key={st.num} delay={i * 0.1}>
                <motion.div 
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedMethodStep(st.num);
                    trackEvent('method_step_click', { step: st.title });
                  }}
                  className={`p-6 rounded-xl border cursor-pointer transition-all duration-200 h-full ${
                    selectedMethodStep === st.num
                      ? 'bg-[#102544] border-[#12D9F5] shadow-xl shadow-cyan-500/15'
                      : 'bg-[#061226]/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="font-['Space_Grotesk'] text-3xl font-bold text-[#1557E8] mb-1">
                    0{st.num}
                  </div>
                  <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white mb-1">
                    {st.title}
                  </h3>
                  <p className="text-xs text-slate-400">{st.sub}</p>
                </motion.div>
              </SectionReveal>
            ))}
          </div>

          {/* Interactive Step Inspector with Smooth AnimatePresence */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedMethodStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="mt-8 bg-[#102544] border border-[#12D9F5]/35 rounded-2xl p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 shadow-xl"
            >
              <div>
                <div className="font-['IBM_Plex_Mono'] text-xs text-[#12D9F5] font-semibold mb-2">
                  {stepData[selectedMethodStep].phase}
                </div>
                <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-white mb-3">
                  {stepData[selectedMethodStep].title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {stepData[selectedMethodStep].desc}
                </p>
              </div>
              <div className="bg-[#0B1930] border border-slate-800 p-6 rounded-xl">
                <div className="font-['IBM_Plex_Mono'] text-xs text-[#19DDB5] font-semibold mb-4 uppercase">
                  Key Deliverables
                </div>
                <ul className="space-y-2.5 text-sm text-slate-200">
                  {stepData[selectedMethodStep].deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#19DDB5] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* Scope Estimator Calculator with Animated Numbers */}
      <section id="estimator" className="py-24 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#12D9F5]/10 border border-[#12D9F5]/30 text-[#12D9F5] font-['IBM_Plex_Mono'] text-xs font-semibold tracking-wider">
              PROJECT SCOPE CALCULATOR
            </div>
            <h2 className="font-neo text-3xl sm:text-5xl font-bold tracking-tight text-white">
              ESTIMATE YOUR INVESTMENT &amp; TIMELINE
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div className="bg-[#0B1930] border border-[#12D9F5]/35 rounded-2xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 shadow-2xl">
              
              {/* Controls */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <label className="font-['IBM_Plex_Mono'] text-xs uppercase text-[#12D9F5] font-semibold block mb-3">
                    1. Primary Focus Area
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { label: 'Software Platform', desc: 'Custom Web / SaaS', price: 12000, weeks: 4 },
                      { label: 'AI Agent Pipeline', desc: 'RAG / Custom LLMs', price: 16000, weeks: 5 },
                      { label: 'Workflow Automation', desc: 'CRM & Docs Sync', price: 10000, weeks: 3 },
                      { label: 'Enterprise System', desc: 'Software + AI + Data', price: 24000, weeks: 8 }
                    ].map((opt) => (
                      <motion.div 
                        key={opt.label}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setBasePrice(opt.price);
                          setBaseWeeks(opt.weeks);
                          trackEvent('estimator_focus_area_change', { focus: opt.label });
                        }}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          basePrice === opt.price
                            ? 'bg-[#12D9F5]/10 border-[#12D9F5] shadow-md ring-1 ring-[#12D9F5]'
                            : 'bg-[#102544] border-slate-700/80 hover:border-slate-600'
                        }`}
                      >
                        <div className="font-semibold text-white text-sm">{opt.label}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{opt.desc}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-['IBM_Plex_Mono'] text-xs uppercase text-[#12D9F5] font-semibold">
                      2. Scale / Complexity Factor
                    </label>
                    <span className="text-xs font-mono text-cyan-300 font-bold">
                      {scaleFactor === 1 ? 'MVP Tier (1x)' : scaleFactor === 2 ? 'Standard Scale (2x)' : 'Enterprise Scale (3x)'}
                    </span>
                  </div>
                  <input 
                    type="range"
                    min="1"
                    max="3"
                    step="1"
                    value={scaleFactor}
                    onChange={(e) => setScaleFactor(parseInt(e.target.value))}
                    className="w-full accent-[#12D9F5] cursor-pointer h-2 bg-[#102544] rounded-lg"
                  />
                </div>

                <div>
                  <label className="font-['IBM_Plex_Mono'] text-xs uppercase text-[#12D9F5] font-semibold block mb-3">
                    3. Add-on Modules
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setAddonSla(!addonSla)}
                      className={`p-3.5 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                        addonSla ? 'bg-[#12D9F5]/10 border-[#12D9F5] ring-1 ring-[#12D9F5]' : 'bg-[#102544] border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-semibold text-white">24/7 SLA Support</div>
                        <div className="text-xs text-slate-400">+$4,000 / +1 wk</div>
                      </div>
                      {addonSla && <CheckCircle2 className="w-4 h-4 text-[#19DDB5]" />}
                    </motion.div>

                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setAddonSec(!addonSec)}
                      className={`p-3.5 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                        addonSec ? 'bg-[#12D9F5]/10 border-[#12D9F5] ring-1 ring-[#12D9F5]' : 'bg-[#102544] border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-semibold text-white">Security Audit</div>
                        <div className="text-xs text-slate-400">+$3,500 / +1 wk</div>
                      </div>
                      {addonSec && <CheckCircle2 className="w-4 h-4 text-[#19DDB5]" />}
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Results Panel */}
              <div className="lg:col-span-5 bg-[#102544] border border-[#12D9F5]/40 rounded-xl p-8 flex flex-col justify-between text-center relative overflow-hidden">
                <div>
                  <div className="font-['IBM_Plex_Mono'] text-xs text-slate-400 uppercase tracking-wider">
                    ESTIMATED BUDGET SCOPE
                  </div>
                  <div className="font-neo text-3xl sm:text-4xl font-bold text-[#12D9F5] my-4 tracking-tight">
                    ${displayPrice.toLocaleString()} - ${Math.round(displayPrice * 1.3).toLocaleString()}
                  </div>
                  <div className="font-['IBM_Plex_Mono'] text-xs text-[#19DDB5] font-medium bg-[#0B1930] py-2 px-3 rounded-md inline-block">
                    ⏱️ Delivery Window: {estimatedMinWeeks} - {estimatedMaxWeeks} Weeks
                  </div>
                </div>

                <div className="mt-8">
                  <motion.a 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    href="#contact"
                    onClick={() => trackEvent('estimator_lock_in_scope_click', { price: displayPrice })}
                    className="btn-shimmer w-full inline-flex items-center justify-center gap-2 bg-[#1557E8] hover:bg-[#168CFF] text-white font-semibold py-3.5 px-6 rounded shadow-lg shadow-blue-700/30 transition-all text-sm"
                  >
                    Lock In Scope Call →
                  </motion.a>
                </div>
              </div>

            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Product Ecosystem (Proprietary R&D) */}
      <section id="products" className="py-24 bg-[#0B1930] border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#12D9F5]/10 border border-[#12D9F5]/30 text-[#12D9F5] font-['IBM_Plex_Mono'] text-xs font-semibold tracking-wider">
              PRODUCT ECOSYSTEM
            </div>
            <h2 className="font-neo text-3xl sm:text-5xl font-bold tracking-tight text-white">
              BUILT ONCE. IMPROVED CONTINUOUSLY.
            </h2>
            <p className="text-slate-400 text-lg">
              &ldquo;ALGorith Technologies is engineering a cohesive suite of intelligent enterprise digital products.&rdquo;
            </p>
          </SectionReveal>

          {/* Category Filter Pills */}
          <SectionReveal delay={0.1} className="flex flex-wrap justify-center gap-2 mb-12">
            {['ALL', 'Platform', 'Automation', 'AI & Data', 'Operations', 'Creative'].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setProductCategory(cat);
                  trackEvent('product_filter_click', { category: cat });
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-['IBM_Plex_Mono'] transition-all ${
                  productCategory === cat
                    ? 'bg-[#12D9F5] text-[#061226] font-bold shadow-lg shadow-cyan-500/20 scale-105'
                    : 'bg-[#102544] text-slate-300 border border-slate-700 hover:border-slate-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </SectionReveal>

          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredProducts.map((prod, idx) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  key={prod.id}
                  onMouseMove={handleSpotlightMouseMove}
                  className="spotlight-card bg-[#061226] border border-slate-800 hover:border-[#12D9F5] rounded-xl p-7 relative transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-cyan-500/10 flex flex-col justify-between group"
                >
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[11px] font-['IBM_Plex_Mono'] text-slate-400 uppercase">
                        {prod.category}
                      </span>
                      <span 
                        className={`text-[10px] font-['IBM_Plex_Mono'] font-bold px-2.5 py-1 rounded uppercase border ${
                          prod.status === 'LIVE APP' || prod.status === 'LIVE PREVIEW'
                            ? 'bg-[#19DDB5]/20 text-[#19DDB5] border-[#19DDB5]/50 flex items-center gap-1.5'
                            : prod.status === 'IN DEVELOPMENT'
                            ? 'bg-[#19DDB5]/10 text-[#19DDB5] border-[#19DDB5]/30'
                            : 'bg-[#12D9F5]/10 text-[#12D9F5] border-[#12D9F5]/30'
                        }`}
                      >
                        {prod.status === 'LIVE APP' && <span className="w-1.5 h-1.5 rounded-full bg-[#19DDB5] animate-ping" />}
                        {prod.status}
                      </span>
                    </div>

                    <h3 className="font-neo text-xl font-bold text-white mb-1 group-hover:text-[#12D9F5] transition-colors">
                      {prod.name}
                    </h3>
                    <div className="text-xs font-mono text-[#12D9F5] mb-3">
                      {prod.tagline}
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed mb-6">
                      {prod.description}
                    </p>
                  </div>

                  {prod.liveUrl ? (
                    <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-2">
                      <a
                        href={prod.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => trackEvent('product_live_link_click', { product: prod.name, url: prod.liveUrl })}
                        className="btn-shimmer inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded bg-[#1557E8] hover:bg-[#168CFF] text-white shadow-md shadow-blue-700/30 transition-all hover:scale-105"
                      >
                        Launch Live App <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href="#contact"
                        onClick={() => trackEvent('product_inquire_click', { product: prod.name })}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-[#12D9F5] transition-colors"
                      >
                        Request Demo <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  ) : (
                    <a
                      href="#contact"
                      onClick={() => trackEvent('product_inquire_click', { product: prod.name })}
                      className="relative z-10 inline-flex items-center gap-1.5 text-xs font-semibold text-[#12D9F5] hover:text-white transition-colors group-hover:translate-x-1"
                    >
                      Request Early Access <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Industries We Help (All 6 domains) */}
      <section id="industries" className="py-24 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#12D9F5]/10 border border-[#12D9F5]/30 text-[#12D9F5] font-['IBM_Plex_Mono'] text-xs font-semibold tracking-wider">
              DOMAINS &amp; SECTORS
            </div>
            <h2 className="font-neo text-3xl sm:text-5xl font-bold tracking-tight text-white">
              INDUSTRIES WE HELP
            </h2>
            <p className="text-slate-400 text-base">
              Startups • SMEs • E-commerce • Professional Services • Operations &amp; Logistics • Digital Businesses
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDUSTRIES.map((ind, idx) => (
              <SectionReveal key={idx} delay={idx * 0.08}>
                <div 
                  onMouseMove={handleSpotlightMouseMove}
                  className="spotlight-card bg-[#0B1930] border border-slate-800 hover:border-[#12D9F5] p-7 rounded-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-cyan-500/10 group h-full"
                >
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded bg-[#102544] border border-slate-700 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 group-hover:border-[#12D9F5] transition-all">
                      {ind.icon}
                    </div>
                    <h4 className="font-neo text-xl font-bold text-white mb-2">{ind.title}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed mb-4">{ind.desc}</p>
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
                      {ind.focus.map((tag, tIdx) => (
                        <span key={tIdx} className="bg-[#102544] text-slate-300 text-[10px] font-mono px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Work (Credibility & Verifiable Architecture) */}
      <section id="work" className="py-24 bg-[#0B1930] border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#12D9F5]/10 border border-[#12D9F5]/30 text-[#12D9F5] font-['IBM_Plex_Mono'] text-xs font-semibold tracking-wider">
              PROVEN ENGINEERING
            </div>
            <h2 className="font-neo text-3xl sm:text-5xl font-bold tracking-tight text-white">
              SELECTED WORK
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div 
              onMouseMove={handleSpotlightMouseMove}
              className="spotlight-card bg-[#061226] border border-slate-800 rounded-2xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover:border-[#12D9F5]/60 transition-colors shadow-2xl"
            >
              <div className="lg:col-span-8 space-y-6 relative z-10">
                <div className="font-['IBM_Plex_Mono'] text-xs text-[#12D9F5] font-semibold uppercase tracking-wider">
                  OPERATIONS &amp; AI AUTOMATION
                </div>
                <h3 className="font-neo text-2xl sm:text-3xl font-bold text-white">
                  Customer Support Workflow Automation
                </h3>

                <div className="space-y-4 text-sm">
                  <div>
                    <div className="font-['IBM_Plex_Mono'] text-xs text-slate-400 uppercase font-semibold mb-1">
                      PROBLEM
                    </div>
                    <p className="text-slate-300">
                      High response times and manual triage bottlenecks in multi-channel support tickets.
                    </p>
                  </div>

                  <div>
                    <div className="font-['IBM_Plex_Mono'] text-xs text-slate-400 uppercase font-semibold mb-1">
                      SOLUTION
                    </div>
                    <p className="text-slate-300">
                      Deployed an AI-powered classification and automated routing pipeline connected directly to CRM workflows.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 bg-[#102544] border border-slate-700/80 rounded-xl p-8 text-center relative z-10 hover:border-[#19DDB5] transition-colors group">
                <div className="font-neo text-5xl sm:text-6xl font-bold text-[#19DDB5] group-hover:scale-105 transition-transform">
                  90%
                </div>
                <div className="font-['IBM_Plex_Mono'] text-xs text-slate-300 uppercase tracking-wider mt-2">
                  Triage Time Reduction
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* About Section: Architectural Principles & Philosophy */}
      <section id="about" className="py-24 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#12D9F5]/10 border border-[#12D9F5]/30 text-[#12D9F5] font-['IBM_Plex_Mono'] text-xs font-semibold tracking-wider">
              OUR PHILOSOPHY
            </div>
            <h2 className="font-neo text-3xl sm:text-5xl font-bold tracking-tight text-white">
              ENGINEERING RIGOR OVER HYPE
            </h2>
            <p className="text-slate-400 text-base">
              We operate as a high-conviction technology partner, translating complex operational bottlenecks into resilient software and automated workflows.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'Business First', desc: 'We start with the problem, unit economics, and operational ROI before writing a single line of code.' },
              { num: '02', title: 'AI Ready', desc: 'System architectures intentionally designed to integrate modern LLMs, vector stores, and agent pipelines.' },
              { num: '03', title: 'One Partner', desc: 'End-to-end full-stack software, data architecture, and workflow orchestration unified in one engineering unit.' },
              { num: '04', title: 'Built to Scale', desc: 'Modular, decoupled cloud infrastructure that expands gracefully as data volumes and user traffic grow.' },
            ].map((pillar, pIdx) => (
              <SectionReveal key={pillar.num} delay={pIdx * 0.1}>
                <div 
                  onMouseMove={handleSpotlightMouseMove}
                  className="spotlight-card bg-[#0B1930] border border-slate-800 hover:border-[#12D9F5] p-6 rounded-xl transition-all duration-200 hover:-translate-y-1.5 h-full"
                >
                  <div className="relative z-10">
                    <div className="font-['IBM_Plex_Mono'] text-xs text-[#1557E8] font-bold mb-2">{pillar.num}</div>
                    <h3 className="font-neo text-xl font-bold text-white mb-2">{pillar.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">{pillar.desc}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Insights Section with Interactive Reader Modal */}
      <section id="insights" className="py-24 bg-[#0B1930] border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#12D9F5]/10 border border-[#12D9F5]/30 text-[#12D9F5] font-['IBM_Plex_Mono'] text-xs font-semibold tracking-wider">
              TECHNICAL BRIEFINGS
            </div>
            <h2 className="font-neo text-3xl sm:text-5xl font-bold tracking-tight text-white">
              ENGINEERING INSIGHTS
            </h2>
            <p className="text-slate-400 text-base">
              Field notes, architecture teardowns, and design patterns from our engineering team.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INSIGHTS.map((item, idx) => (
              <SectionReveal key={item.id} delay={idx * 0.1}>
                <div 
                  onMouseMove={handleSpotlightMouseMove}
                  onClick={() => {
                    setSelectedInsight(item);
                    trackEvent('insight_open_modal', { insightId: item.id });
                  }}
                  className="spotlight-card bg-[#061226] border border-slate-800 hover:border-[#12D9F5] rounded-xl p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 cursor-pointer group shadow-xl h-full"
                >
                  <div className="relative z-10">
                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 mb-3">
                      <span className="text-[#12D9F5] font-bold">{item.tag}</span>
                      <span>{item.readTime}</span>
                    </div>
                    <h3 className="font-neo text-xl font-bold text-white mb-3 leading-snug group-hover:text-[#12D9F5] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed mb-6">
                      {item.summary}
                    </p>
                  </div>

                  <div className="relative z-10 flex justify-between items-center text-xs font-mono text-slate-400 border-t border-slate-800/80 pt-4">
                    <span>{item.date}</span>
                    <span className="text-[#12D9F5] group-hover:text-white font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-all">
                      Read Briefing <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Insight Detail Modal */}
      <AnimatePresence>
        {selectedInsight && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#061226]/85 backdrop-blur-md"
              onClick={() => setSelectedInsight(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#0B1930] border border-[#12D9F5]/40 rounded-2xl p-8 max-w-2xl w-full relative z-10 shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-mono text-[#12D9F5] font-semibold tracking-wider">
                    {selectedInsight.tag} • {selectedInsight.readTime}
                  </span>
                  <h3 className="font-neo text-2xl font-bold text-white mt-1">
                    {selectedInsight.title}
                  </h3>
                </div>
                <button 
                  onClick={() => setSelectedInsight(null)}
                  className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-sm text-slate-300 space-y-4 leading-relaxed font-['Inter'] border-t border-slate-800 pt-4">
                <p className="text-slate-200 font-medium">
                  {selectedInsight.summary}
                </p>
                <div className="bg-[#061226] border border-slate-800 p-4 rounded-xl font-mono text-xs text-slate-300 space-y-2">
                  <div className="text-[#19DDB5] font-semibold">// Core Architecture Principle</div>
                  <p>1. Decouple retrieval embeddings from inference execution.</p>
                  <p>2. Enforce strict JSON schema guarantees on all LLM responses.</p>
                  <p>3. Maintain idempotent retry backoffs across third-party webhooks.</p>
                </div>
                <p>
                  In high-throughput enterprise environments, reliability is achieved not by hoping the generative model behaves, but by establishing strict deterministic boundaries, automated evaluation monitors, and deterministic fallback loops.
                </p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <span className="text-xs font-mono text-slate-500">Published {selectedInsight.date}</span>
                <a 
                  href="#contact"
                  onClick={() => {
                    setSelectedInsight(null);
                    trackEvent('insight_modal_cta_click', { insightId: selectedInsight.id });
                  }}
                  className="btn-shimmer bg-[#1557E8] hover:bg-[#168CFF] text-white text-xs font-semibold px-4 py-2 rounded transition-all"
                >
                  Discuss Architecture With Us →
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FAQ Section */}
      <section id="faq" className="py-24 border-b border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#12D9F5]/10 border border-[#12D9F5]/30 text-[#12D9F5] font-['IBM_Plex_Mono'] text-xs font-semibold tracking-wider">
              FAQ
            </div>
            <h2 className="font-neo text-3xl sm:text-5xl font-bold tracking-tight text-white">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </SectionReveal>

          {/* Search Input */}
          <SectionReveal delay={0.1} className="relative mb-8">
            <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
            <input 
              type="text"
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              placeholder="Search questions (e.g., 'IP', 'timeline', 'pricing', 'security')..."
              className="w-full bg-[#0B1930] border border-slate-700/80 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#12D9F5] transition-colors"
            />
          </SectionReveal>

          {/* Accordion with Smooth Expansion */}
          <div className="space-y-4">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-sm font-mono">
                No matching questions found.
              </div>
            ) : (
              filteredFaqs.map((item, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <SectionReveal key={idx} delay={idx * 0.06}>
                    <div 
                      className={`bg-[#0B1930] border rounded-xl overflow-hidden transition-all duration-200 ${
                        isOpen ? 'border-[#12D9F5]' : 'border-slate-800'
                      }`}
                    >
                      <button 
                        onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                        className="w-full p-5 text-left font-neo text-lg font-bold text-white flex justify-between items-center gap-4 hover:text-[#12D9F5] transition-colors"
                      >
                        <span>{item.q}</span>
                        <motion.span 
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          className="text-[#12D9F5] font-mono text-xl shrink-0"
                        >
                          +
                        </motion.span>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
                              {item.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </SectionReveal>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Consultation / Contact Section */}
      <section id="contact" className="py-24 bg-[#0B1930] border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div 
              onMouseMove={handleSpotlightMouseMove}
              className="spotlight-card bg-[#061226] border border-[#12D9F5]/35 rounded-2xl p-8 sm:p-14 grid grid-cols-1 lg:grid-cols-12 gap-12 shadow-2xl"
            >
              {/* Left Info & Channels */}
              <div className="lg:col-span-5 space-y-6 relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#12D9F5]/10 border border-[#12D9F5]/30 text-[#12D9F5] font-['IBM_Plex_Mono'] text-xs font-semibold">
                  INITIATE ENGAGEMENT
                </div>
                <h2 className="font-neo text-3xl sm:text-4xl font-bold text-white">
                  LET'S BUILD SOMETHING INTELLIGENT.
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  &ldquo;Tell us what you're trying to build, automate or improve.&rdquo;
                </p>

                {/* Direct Channels */}
                <div className="space-y-3 pt-2">
                  <a 
                    href={`mailto:${COMPANY.email}`}
                    onClick={() => trackEvent('email_contact_click')}
                    className="flex items-center gap-3 p-3 rounded-lg bg-[#102544] border border-slate-800 hover:border-[#12D9F5] text-slate-200 text-xs font-mono transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#12D9F5]" />
                    <span>{COMPANY.email}</span>
                  </a>

                  <a 
                    href={`tel:${COMPANY.phoneRaw}`}
                    onClick={() => trackEvent('phone_contact_click')}
                    className="flex items-center gap-3 p-3 rounded-lg bg-[#102544] border border-slate-800 hover:border-[#12D9F5] text-slate-200 text-xs font-mono transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#19DDB5]" />
                    <span>{COMPANY.phone}</span>
                  </a>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-[#102544] border border-slate-800 text-slate-200 text-xs font-mono">
                    <Globe className="w-4 h-4 text-[#12D9F5]" />
                    <span>{COMPANY.domain}</span>
                  </div>
                </div>

                <div>
                  <label className="font-['IBM_Plex_Mono'] text-xs uppercase text-[#12D9F5] font-semibold block mb-3">
                    Select Preferred Consultation Slot
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      'Mon — 10:00 AM EST',
                      'Tue — 02:00 PM EST',
                      'Wed — 11:00 AM EST',
                      'Thu — 04:00 PM EST'
                    ].map((slot) => (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-2.5 rounded font-['IBM_Plex_Mono'] text-xs transition-all text-left ${
                          selectedSlot === slot
                            ? 'bg-[#1557E8] text-white border border-[#12D9F5] font-semibold shadow-md ring-1 ring-[#12D9F5]'
                            : 'bg-[#102544] text-slate-400 border border-slate-700 hover:text-white'
                        }`}
                      >
                        {slot}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Form */}
              <div className="lg:col-span-7 relative z-10">
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-['IBM_Plex_Mono'] text-xs uppercase text-slate-400 block mb-1.5">
                        Full Name *
                      </label>
                      <input 
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Mercer"
                        className="w-full bg-[#102544] border border-slate-700 rounded p-3 text-sm text-white focus:outline-none focus:border-[#12D9F5]"
                      />
                    </div>
                    <div>
                      <label className="font-['IBM_Plex_Mono'] text-xs uppercase text-slate-400 block mb-1.5">
                        Work Email *
                      </label>
                      <input 
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full bg-[#102544] border border-slate-700 rounded p-3 text-sm text-white focus:outline-none focus:border-[#12D9F5]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-['IBM_Plex_Mono'] text-xs uppercase text-slate-400 block mb-1.5">
                      Primary Need *
                    </label>
                    <select
                      required
                      value={formData.need}
                      onChange={(e) => setFormData({ ...formData, need: e.target.value })}
                      className="w-full bg-[#102544] border border-slate-700 rounded p-3 text-sm text-white focus:outline-none focus:border-[#12D9F5]"
                    >
                      <option value="">Select Primary Requirement</option>
                      <option value="ai">AI System / Agent Integration</option>
                      <option value="software">Custom Web Platform / SaaS Software</option>
                      <option value="data">Data Engineering &amp; Analytics Dashboard</option>
                      <option value="automation">Process &amp; Workflow Automation</option>
                      <option value="product_ecosystem">Product Ecosystem Access</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-['IBM_Plex_Mono'] text-xs uppercase text-slate-400 block mb-1.5">
                      Project Scope Details
                    </label>
                    <textarea 
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe your requirements..."
                      className="w-full bg-[#102544] border border-slate-700 rounded p-3 text-sm text-white focus:outline-none focus:border-[#12D9F5]"
                    ></textarea>
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-shimmer w-full bg-[#1557E8] hover:bg-[#168CFF] text-white font-semibold py-3.5 rounded shadow-lg shadow-blue-700/30 transition-all text-sm disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>Submitting Inquiry...</span>
                      </>
                    ) : (
                      <span>Start the Conversation →</span>
                    )}
                  </motion.button>

                  {formSubmitted && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 bg-[#19DDB5]/10 border border-[#19DDB5] text-[#19DDB5] font-['IBM_Plex_Mono'] text-xs rounded space-y-1"
                    >
                      <div className="font-bold flex items-center gap-1.5">
                        <Check className="w-4 h-4" /> Inquiry Received
                      </div>
                      <div>
                        Thank you{formData.name ? `, ${formData.name}` : ''}! Your consultation request for {selectedSlot} has been logged. Our engineering team at {COMPANY.domain} will contact you via {formData.email || 'your email'} within 1 business day.
                      </div>
                    </motion.div>
                  )}
                </form>
              </div>

            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="py-20 bg-gradient-to-b from-[#0B1930] to-[#061226] border-b border-slate-800/80 text-center">
        <SectionReveal className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="font-neo text-3xl sm:text-5xl font-bold text-white">
            Ready to build something smarter?
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            &ldquo;Tell us what you're trying to solve. We'll help you turn the idea into an intelligent digital system.&rdquo;
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <motion.a 
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href="#contact"
              onClick={() => trackEvent('final_cta_build_click')}
              className="btn-shimmer inline-flex items-center gap-2 bg-[#1557E8] hover:bg-[#168CFF] text-white font-semibold px-7 py-3 rounded text-sm shadow-lg shadow-blue-700/30 transition-all"
            >
              Let's Build →
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href="#solutions"
              onClick={() => trackEvent('final_cta_solutions_click')}
              className="inline-flex items-center gap-2 bg-[#102544] hover:bg-[#16325B] text-slate-200 border border-slate-700 text-sm font-semibold px-7 py-3 rounded hover:border-[#12D9F5] hover:text-[#12D9F5] transition-all"
            >
              Explore Solutions
            </motion.a>
          </div>
        </SectionReveal>
      </section>

      {/* Footer */}
      <footer className="bg-[#030A16] pt-16 pb-8 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            
            <div className="lg:col-span-2 space-y-4">
              <a href="#" aria-label="ALGorith Technologies">
                <AlgorithLogo size={32} />
              </a>
              <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
                An AI-first technology and digital innovation company building intelligent software, data and automation solutions.
              </p>
              <div className="text-xs font-mono text-slate-400 space-y-1">
                <div>Email: <a href={`mailto:${COMPANY.email}`} className="text-[#12D9F5] hover:underline">{COMPANY.email}</a></div>
                <div>Phone: <a href={`tel:${COMPANY.phoneRaw}`} className="text-[#19DDB5] hover:underline">{COMPANY.phone}</a></div>
                <div>Web: <a href={`https://${COMPANY.domain}`} className="text-white hover:underline">{COMPANY.domain}</a></div>
              </div>
            </div>

            <div>
              <h5 className="font-['IBM_Plex_Mono'] text-xs font-semibold text-[#12D9F5] uppercase tracking-wider mb-4">
                Solutions
              </h5>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li><a href="#solutions" className="hover:text-white transition-colors">ALGorith AI</a></li>
                <li><a href="#solutions" className="hover:text-white transition-colors">ALGorith Software</a></li>
                <li><a href="#solutions" className="hover:text-white transition-colors">ALGorith Data</a></li>
                <li><a href="#solutions" className="hover:text-white transition-colors">ALGorith Automation</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-['IBM_Plex_Mono'] text-xs font-semibold text-[#12D9F5] uppercase tracking-wider mb-4">
                Products
              </h5>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li>
                  <a 
                    href="https://algorithfos.lovable.app" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="hover:text-white text-slate-300 transition-colors inline-flex items-center gap-1"
                  >
                    ALGorith Founder OS <ExternalLink className="w-3 h-3 text-[#19DDB5]" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://algosocial.netlify.app/" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="hover:text-white text-slate-300 transition-colors inline-flex items-center gap-1"
                  >
                    ALGorith Social <ExternalLink className="w-3 h-3 text-[#19DDB5]" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://algocrm.netlify.app/" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="hover:text-white text-slate-300 transition-colors inline-flex items-center gap-1"
                  >
                    ALGorith CRM <ExternalLink className="w-3 h-3 text-[#19DDB5]" />
                  </a>
                </li>
                <li><a href="#products" className="hover:text-white transition-colors">ALGorith AI</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">ALGorith Inventory</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">View All Ecosystem →</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-['IBM_Plex_Mono'] text-xs font-semibold text-[#12D9F5] uppercase tracking-wider mb-4">
                Company &amp; Social
              </h5>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li><a href="#method" className="hover:text-white transition-colors">Method</a></li>
                <li><a href="#industries" className="hover:text-white transition-colors">Industries</a></li>
                <li><a href="#work" className="hover:text-white transition-colors">Work</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#insights" className="hover:text-white transition-colors">Insights</a></li>
                <li><a href={COMPANY.social.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#12D9F5] transition-colors">LinkedIn</a></li>
                <li><a href={COMPANY.social.x} target="_blank" rel="noreferrer" className="hover:text-[#12D9F5] transition-colors">X / Twitter</a></li>
              </ul>
            </div>

          </div>

          <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 font-['IBM_Plex_Mono'] text-xs text-slate-400">
            <div>&copy; 2026 {COMPANY.legalName} All rights reserved.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Brand Statement Banner */}
      <div className="bg-[#02060E] border-t border-slate-900 py-3 text-center font-neo text-xs tracking-widest text-slate-400">
        {COMPANY.name} — {COMPANY.slogan}
      </div>
    </div>
  );
}
