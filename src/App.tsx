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
  Maximize2,
  GraduationCap,
  Download,
  Upload,
  FileDown,
  FileText
} from 'lucide-react';

import { COMPANY, trackEvent } from './config';
import { PRODUCTS, INDUSTRIES, INSIGHTS, ECOSYSTEM_GROUPS, SERVICES, SOLUTIONS, ProductItem, InsightItem, ServiceItem, SolutionItem } from './data';
import { AlgorithLogo, AlgorithLogoIcon } from './components/Logo';
import { LearningHub } from './components/LearningHub';
import { INITIAL_LEARNING_MATERIALS } from './data/learningMaterials';
import { LearningMaterial } from './types/learning';

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

  // View Routing: Home vs Dedicated Learning Hub Page
  const [currentView, setCurrentView] = useState<'home' | 'learning'>(() => {
    return typeof window !== 'undefined' && window.location.hash === '#learning' ? 'learning' : 'home';
  });

  // 1-Click download toast for homepage quick downloads
  const [homeDownloadToast, setHomeDownloadToast] = useState<{ title: string; filename: string } | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#learning') {
        setCurrentView('learning');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '' || window.location.hash === '#' || window.location.hash.startsWith('#solutions') || window.location.hash.startsWith('#contact') || window.location.hash.startsWith('#services') || window.location.hash.startsWith('#products')) {
        setCurrentView('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleQuickDownload = (material: LearningMaterial, e: React.MouseEvent) => {
    e.stopPropagation();
    trackEvent('learning_quick_download', { id: material.id, title: material.title });
    const authorName = typeof material.author === 'string' ? material.author : material.author?.name || 'ALGorith Research';
    const filename = `${material.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.${material.fileFormat.toLowerCase()}`;
    const content = material.fileContent || `# ${material.title}\nCategory: ${material.category}\nFormat: ${material.fileFormat}\nAuthor: ${authorName}\nPublished by: ALGorith Technologies Learning Hub\n\n${material.description}\n\n=========================================\nALGorith Official Learning Resource\nThink. Build. Automate. Grow.\n=========================================`;
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);

    setHomeDownloadToast({ title: material.title, filename });
    setTimeout(() => setHomeDownloadToast(null), 3500);
  };

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

  // If currently navigating the full Learning Hub Page
  if (currentView === 'learning') {
    return (
      <LearningHub
        onBackToHome={() => {
          setCurrentView('home');
          window.location.hash = '';
        }}
      />
    );
  }

  return (
    <div className="min-h-screen text-[#F8FAFC] bg-[#061226] font-['Inter'] relative selection:bg-[#12D9F5]/30 selection:text-white bg-tech-grid">
      {/* 1-Click Download Notification Toast for Homepage */}
      <AnimatePresence>
        {homeDownloadToast && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 bg-[#0B1930] border border-[#19DDB5] text-white px-5 py-4 rounded-xl shadow-2xl shadow-cyan-500/20 flex items-start gap-4 max-w-md"
          >
            <div className="w-10 h-10 rounded-lg bg-[#19DDB5]/20 text-[#19DDB5] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h4 className="font-neo text-sm font-bold text-white flex items-center gap-2">
                1-Click Download Started!
              </h4>
              <p className="text-xs text-slate-300 font-sans mt-0.5 line-clamp-1">{homeDownloadToast.title}</p>
              <p className="text-[11px] font-mono text-[#12D9F5] mt-1">{homeDownloadToast.filename}</p>
            </div>
            <button
              onClick={() => setHomeDownloadToast(null)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
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
          <a href="#services" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-800/80 hover:text-[#12D9F5] transition-colors">Services</a>
          <a href="#products" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-800/80 hover:text-[#12D9F5] transition-colors">Products</a>
          <a href="#intelligence" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-800/80 hover:text-[#12D9F5] transition-colors">Intelligence</a>
          <a href="#learning" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-800/80 text-[#12D9F5] hover:text-[#19DDB5] transition-colors flex items-center justify-between">
            <span>Learning Hub</span>
            <span className="text-[10px] bg-[#12D9F5]/20 text-[#12D9F5] px-2 py-0.5 rounded font-mono">1-Click DL</span>
          </a>
          <a href="#vision" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-800/80 hover:text-[#12D9F5] transition-colors">Vision</a>
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
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              setCurrentView('home');
              window.location.hash = '';
            }}
            aria-label="ALGorith Technologies"
          >
            <AlgorithLogo size={32} />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            {['Solutions', 'Services', 'Products', 'Intelligence'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                onClick={() => setCurrentView('home')}
                className="hover:text-[#12D9F5] transition-colors relative py-1 group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#12D9F5] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}

            {/* Learning Hub Dedicated Nav Link */}
            <a 
              href="#learning" 
              onClick={() => {
                setCurrentView('learning');
                trackEvent('header_learning_hub_click');
              }}
              className="flex items-center gap-1.5 text-[#12D9F5] hover:text-white transition-colors relative py-1 group font-semibold"
            >
              <span>Learning</span>
              <span className="text-[10px] font-mono bg-[#12D9F5]/20 text-[#12D9F5] group-hover:bg-[#12D9F5] group-hover:text-[#061226] transition-colors px-1.5 py-0.2 rounded font-bold uppercase tracking-wider">
                Vault
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#12D9F5] transition-all duration-300 group-hover:w-full"></span>
            </a>

            {['Vision', 'Industries', 'Work', 'About', 'Insights'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                onClick={() => setCurrentView('home')}
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
                  onClick={() => trackEvent('hero_talk_click')}
                  className="btn-shimmer inline-flex items-center justify-center gap-2 bg-[#1557E8] hover:bg-[#168CFF] text-white font-semibold px-7 py-3.5 rounded-md shadow-lg shadow-blue-700/30 transition-all text-base"
                >
                  Talk to ALGorith →
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href="#products"
                  onClick={() => trackEvent('hero_explore_products_click')}
                  className="inline-flex items-center justify-center gap-2 bg-[#102544] hover:bg-[#16325B] text-slate-200 border border-slate-700/60 font-semibold px-7 py-3.5 rounded-md hover:border-[#12D9F5] hover:text-[#12D9F5] transition-all text-base"
                >
                  Explore Products
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
          <div className="flex justify-between items-center flex-wrap gap-6 font-neo text-sm sm:text-base font-bold tracking-wide text-slate-200">
            <div className="flex items-center gap-2 hover:text-[#12D9F5] transition-colors cursor-default"><span>⚡</span> AI</div>
            <span className="text-[#12D9F5]">•</span>
            <div className="flex items-center gap-2 hover:text-[#12D9F5] transition-colors cursor-default"><span>💻</span> SOFTWARE</div>
            <span className="text-[#12D9F5]">•</span>
            <div className="flex items-center gap-2 hover:text-[#12D9F5] transition-colors cursor-default"><span>📊</span> DATA</div>
            <span className="text-[#12D9F5]">•</span>
            <div className="flex items-center gap-2 hover:text-[#12D9F5] transition-colors cursor-default"><span>🔄</span> AUTOMATION</div>
            <span className="text-[#12D9F5]">•</span>
            <div className="flex items-center gap-2 hover:text-[#12D9F5] transition-colors cursor-default"><span>🏢</span> BUSINESS SYSTEMS</div>
            <span className="text-[#12D9F5]">•</span>
            <div className="flex items-center gap-2 hover:text-[#12D9F5] transition-colors cursor-default"><span>🚀</span> DIGITAL TRANSFORMATION</div>
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

      {/* Solutions Section (Customer Problem Focused) */}
      <section id="solutions" className="py-24 border-b border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#12D9F5]/10 border border-[#12D9F5]/30 text-[#12D9F5] font-['IBM_Plex_Mono'] text-xs font-semibold tracking-wider">
              BUSINESS SOLUTIONS
            </div>
            <h2 className="font-neo text-3xl sm:text-5xl font-bold tracking-tight text-white">
              WHAT ARE YOU LOOKING TO SOLVE?
            </h2>
            <p className="text-slate-400 text-lg">
              &ldquo;Clear technology solutions tailored around your real-world business challenges—no technical jargon required.&rdquo;
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SOLUTIONS.map((sol, idx) => (
              <SectionReveal key={sol.id} delay={idx * 0.06} className="h-full">
                <div 
                  onMouseMove={handleSpotlightMouseMove}
                  className="spotlight-card bg-[#0B1930] border border-slate-800 hover:border-[#12D9F5] rounded-xl p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-cyan-500/10 group h-full"
                >
                  <div className="space-y-5 relative z-10">
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-12 rounded-lg bg-[#102544] border border-slate-700 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:border-[#12D9F5] transition-all shadow-inner">
                        {sol.icon}
                      </div>
                      <span className="text-[11px] font-['IBM_Plex_Mono'] text-[#12D9F5] font-semibold tracking-wider uppercase bg-[#12D9F5]/10 border border-[#12D9F5]/30 px-2.5 py-1 rounded">
                        Solution 0{idx + 1}
                      </span>
                    </div>

                    <h3 className="font-neo text-2xl font-bold text-white group-hover:text-[#12D9F5] transition-colors">
                      {sol.title}
                    </h3>

                    {/* Problem → Approach → Relevant Products */}
                    <div className="space-y-3.5 pt-2 border-t border-slate-800/80 text-xs font-['IBM_Plex_Mono']">
                      <div className="bg-[#102544]/60 border-l-2 border-rose-400 p-2.5 rounded-r">
                        <span className="text-rose-400 font-bold block mb-0.5 uppercase tracking-wider text-[10px]">The Challenge</span>
                        <p className="text-slate-300 font-sans leading-relaxed text-xs">{sol.problem}</p>
                      </div>

                      <div className="bg-[#102544]/60 border-l-2 border-cyan-400 p-2.5 rounded-r">
                        <span className="text-cyan-400 font-bold block mb-0.5 uppercase tracking-wider text-[10px]">ALGorith Approach</span>
                        <p className="text-slate-300 font-sans leading-relaxed text-xs">{sol.approach}</p>
                      </div>

                      <div className="pt-1">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1.5">Relevant Products &amp; Services:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {sol.relevantProducts.map((p) => (
                            <span key={p} className="text-[11px] bg-[#102544] border border-slate-700 text-[#12D9F5] px-2 py-0.5 rounded font-mono">
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-mono">Tailored Implementation</span>
                    <a 
                      href="#contact" 
                      onClick={() => trackEvent('solution_find_click', { solution: sol.title })}
                      className="btn-shimmer inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded bg-[#1557E8] hover:bg-[#168CFF] text-white shadow-md shadow-blue-700/30 transition-all hover:scale-105"
                    >
                      Find Your Solution <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </SectionReveal>
            ))}
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

      {/* Product Ecosystem (ALGorith Ecosystem Groups) */}
      <section id="products" className="py-24 bg-[#0B1930] border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#12D9F5]/10 border border-[#12D9F5]/30 text-[#12D9F5] font-['IBM_Plex_Mono'] text-xs font-semibold tracking-wider">
              ALGORTH ECOSYSTEM &amp; PLATFORM SUITE
            </div>
            <h2 className="font-neo text-3xl sm:text-5xl font-bold tracking-tight text-white">
              COHERENT. INTELLIGENT. SCALABLE.
            </h2>
            <p className="text-slate-400 text-lg">
              &ldquo;An interconnected ecosystem of business operating systems, autonomous AI agent layers, and continuous learning frameworks.&rdquo;
            </p>
          </SectionReveal>

          {/* Ecosystem Groups */}
          <div className="space-y-20">
            {ECOSYSTEM_GROUPS.map((group, groupIdx) => (
              <SectionReveal key={group.name} delay={groupIdx * 0.1} className="space-y-8">
                {/* Group Header Banner */}
                <div className="border-l-4 border-[#12D9F5] pl-6 py-2 bg-gradient-to-r from-[#102544]/60 to-transparent rounded-r-xl">
                  <div className="font-['IBM_Plex_Mono'] text-xs font-semibold text-[#12D9F5] uppercase tracking-wider mb-1">
                    {group.badge}
                  </div>
                  <h3 className="font-neo text-2xl sm:text-3xl font-bold text-white mb-2">
                    {group.name} — <span className="text-slate-300 font-normal text-xl sm:text-2xl">{group.subtitle}</span>
                  </h3>
                  <p className="text-slate-400 text-sm max-w-4xl">
                    {group.description}
                  </p>
                </div>

                {/* Group Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.products.map((prod, prodIdx) => {
                    const isStrategic = prod.isStrategicFuture;
                    return (
                      <motion.div
                        key={prod.id}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: prodIdx * 0.05 }}
                        onMouseMove={handleSpotlightMouseMove}
                        className={`spotlight-card rounded-xl p-7 relative transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group ${
                          isStrategic
                            ? 'bg-gradient-to-br from-[#0B2347] via-[#061226] to-[#0A2E46] border-2 border-[#12D9F5]/70 shadow-xl shadow-cyan-500/15 ring-2 ring-[#12D9F5]/20'
                            : 'bg-[#061226] border border-slate-800 hover:border-[#12D9F5]'
                        }`}
                      >
                        {isStrategic && (
                          <div className="absolute -top-3 right-5 px-3 py-0.5 rounded-full bg-gradient-to-r from-[#12D9F5] to-[#19DDB5] text-[#061226] text-[10px] font-['IBM_Plex_Mono'] font-bold tracking-wider shadow-md uppercase">
                            Future Strategic Tech
                          </div>
                        )}

                        <div className="relative z-10">
                          <div className="flex justify-between items-start mb-3">
                            <span className="text-[11px] font-['IBM_Plex_Mono'] text-slate-400 uppercase tracking-wide">
                              {group.name}
                            </span>
                            <span 
                              className={`text-[10px] font-['IBM_Plex_Mono'] font-bold px-2.5 py-1 rounded uppercase border ${
                                prod.status === 'LIVE APP'
                                  ? 'bg-[#19DDB5]/20 text-[#19DDB5] border-[#19DDB5]/50 flex items-center gap-1.5'
                                  : prod.status === 'IN DEVELOPMENT'
                                  ? 'bg-[#12D9F5]/10 text-[#12D9F5] border-[#12D9F5]/30'
                                  : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                              }`}
                            >
                              {prod.status === 'LIVE APP' && <span className="w-1.5 h-1.5 rounded-full bg-[#19DDB5] animate-ping" />}
                              {prod.status}
                            </span>
                          </div>

                          <h4 className="font-neo text-xl font-bold text-white mb-1 group-hover:text-[#12D9F5] transition-colors">
                            ALGorith {prod.name}
                          </h4>
                          
                          <div className="text-xs font-['IBM_Plex_Mono'] text-[#12D9F5] mb-3 font-medium">
                            {prod.valueProp}
                          </div>

                          <div className="space-y-2 mb-6 border-t border-slate-800/80 pt-3">
                            <div className="text-[11px] font-['IBM_Plex_Mono'] text-slate-400 uppercase">Primary Use Case:</div>
                            <p className="text-slate-300 text-xs leading-relaxed">
                              {prod.primaryUseCase}
                            </p>
                          </div>
                        </div>

                        <div className="relative z-10 pt-2 border-t border-slate-800/80 flex items-center justify-between gap-3">
                          {prod.liveUrl ? (
                            <>
                              <a
                                href={prod.liveUrl}
                                target="_blank"
                                rel="noreferrer"
                                onClick={() => trackEvent('product_live_link_click', { product: prod.name, url: prod.liveUrl })}
                                className="btn-shimmer inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded bg-[#1557E8] hover:bg-[#168CFF] text-white shadow-md shadow-blue-700/30 transition-all hover:scale-105"
                              >
                                Explore &amp; Launch <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                              <a
                                href="#contact"
                                onClick={() => trackEvent('product_inquire_click', { product: prod.name })}
                                className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-[#12D9F5] transition-colors"
                              >
                                Request Demo <ArrowRight className="w-3 h-3" />
                              </a>
                            </>
                          ) : (
                            <a
                              href="#contact"
                              onClick={() => trackEvent('product_inquire_click', { product: prod.name })}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#12D9F5] hover:text-white transition-colors group-hover:translate-x-1"
                            >
                              Explore Roadmap &amp; Access <ArrowRight className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Services Section */}
      <section id="services" className="py-24 bg-[#061226] border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#12D9F5]/10 border border-[#12D9F5]/30 text-[#12D9F5] font-['IBM_Plex_Mono'] text-xs font-semibold tracking-wider">
              PROFESSIONAL ENGINEERING &amp; ADVISORY
            </div>
            <h2 className="font-neo text-3xl sm:text-5xl font-bold tracking-tight text-white">
              PRAGMATIC SOLUTIONS FOR COMPLEX BUSINESS CHALLENGES
            </h2>
            <p className="text-slate-400 text-lg">
              &ldquo;We translate operational friction into resilient software, automated workflows, and measurable business outcomes.&rdquo;
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((srv, idx) => (
              <SectionReveal key={srv.id} delay={idx * 0.08} className="h-full">
                <div
                  onMouseMove={handleSpotlightMouseMove}
                  className="spotlight-card bg-[#0B1930] border border-slate-800 hover:border-[#12D9F5] rounded-xl p-7 relative transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-cyan-500/10 flex flex-col justify-between h-full group"
                >
                  <div className="relative z-10 space-y-5">
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-12 rounded-lg bg-[#102544] border border-slate-700 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:border-[#12D9F5] transition-all shadow-inner">
                        {srv.icon}
                      </div>
                      <span className="text-[11px] font-['IBM_Plex_Mono'] text-[#12D9F5] font-semibold tracking-wider uppercase bg-[#12D9F5]/10 border border-[#12D9F5]/30 px-2.5 py-1 rounded">
                        Service 0{idx + 1}
                      </span>
                    </div>

                    <h3 className="font-neo text-2xl font-bold text-white group-hover:text-[#12D9F5] transition-colors">
                      {srv.title}
                    </h3>

                    {/* Problem → Solution → Business Outcome */}
                    <div className="space-y-3.5 pt-2 border-t border-slate-800/80 text-xs font-['IBM_Plex_Mono']">
                      <div className="bg-[#102544]/60 border-l-2 border-rose-400 p-2.5 rounded-r">
                        <span className="text-rose-400 font-bold block mb-0.5 uppercase tracking-wider text-[10px]">Problem</span>
                        <p className="text-slate-300 font-sans leading-relaxed text-xs">{srv.problem}</p>
                      </div>

                      <div className="bg-[#102544]/60 border-l-2 border-cyan-400 p-2.5 rounded-r">
                        <span className="text-cyan-400 font-bold block mb-0.5 uppercase tracking-wider text-[10px]">Solution</span>
                        <p className="text-slate-300 font-sans leading-relaxed text-xs">{srv.solution}</p>
                      </div>

                      <div className="bg-[#102544]/60 border-l-2 border-emerald-400 p-2.5 rounded-r">
                        <span className="text-emerald-400 font-bold block mb-0.5 uppercase tracking-wider text-[10px]">Business Outcome</span>
                        <p className="text-slate-300 font-sans leading-relaxed text-xs font-medium">{srv.businessOutcome}</p>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-mono">End-to-End Delivery</span>
                    <a
                      href="#contact"
                      onClick={() => trackEvent('service_cta_click', { service: srv.title })}
                      className="btn-shimmer inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded bg-[#1557E8] hover:bg-[#168CFF] text-white shadow-md shadow-blue-700/30 transition-all hover:scale-105"
                    >
                      Talk to ALGorith <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* The ALGorith Intelligence Layer */}
      <section id="intelligence" className="py-24 bg-[#0B1930] border-b border-slate-800/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#12D9F5]/5 via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionReveal className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#12D9F5]/10 border border-[#12D9F5]/30 text-[#12D9F5] font-['IBM_Plex_Mono'] text-xs font-semibold tracking-wider">
              TECHNOLOGY DIRECTION &amp; R&amp;D ROADMAP
            </div>
            <h2 className="font-neo text-3xl sm:text-5xl font-bold tracking-tight text-white">
              THE ALGorith INTELLIGENCE LAYER
            </h2>
            <p className="font-['IBM_Plex_Mono'] text-lg sm:text-xl text-[#12D9F5] tracking-wide font-medium">
              &ldquo;Intelligence that understands. Agents that act. Systems that grow.&rdquo;
            </p>
            <p className="text-slate-400 text-base max-w-2xl mx-auto leading-relaxed">
              ALGorith is building toward connected intelligent business systems—bridging foundational neural models, autonomous worker agents, event-driven automation, and live enterprise applications into a unified operational architecture.
            </p>
          </SectionReveal>

          {/* Visual Flow: AI -> Agents -> Automation -> Data -> Analytics -> Business Applications */}
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                step: '01',
                title: 'AI',
                subtitle: 'Foundational Intelligence & RAG Core',
                desc: 'Context-aware semantic knowledge ingestion and document retrieval tailored for enterprise data silos.',
                icon: '🧠'
              },
              {
                step: '02',
                title: 'Agents',
                subtitle: 'Autonomous Multi-Step Worker Agents',
                desc: 'Self-governing agent networks executing complex multi-system operations with human-in-the-loop validation checkpoints.',
                icon: '🤖'
              },
              {
                step: '03',
                title: 'Automation',
                subtitle: 'Event-Driven Workflow Orchestration',
                desc: 'Resilient webhook meshes and automated API triggers connecting disparate software without manual friction.',
                icon: '⚡'
              },
              {
                step: '04',
                title: 'Data',
                subtitle: 'Unified Enterprise Storage & Sync',
                desc: 'Secure real-time synchronization of customer, operational, and financial records across distributed systems.',
                icon: '🗄️'
              },
              {
                step: '05',
                title: 'Analytics',
                subtitle: 'Predictive Business Intelligence',
                desc: 'Real-time revenue forecasting, anomaly detection, and automated operational metric dashboards.',
                icon: '📈'
              },
              {
                step: '06',
                title: 'Business Applications',
                subtitle: 'Unified Command & Commercial Suite',
                desc: 'Production-ready operating systems (Founder OS, CRM, Social, Cowork, and Cart) empowering modern teams.',
                icon: '💻'
              }
            ].map((node, idx, arr) => (
              <div key={node.step} className="flex flex-col items-center">
                <SectionReveal delay={idx * 0.08} className="w-full">
                  <div 
                    onMouseMove={handleSpotlightMouseMove}
                    className="spotlight-card bg-[#061226] border border-slate-800 hover:border-[#12D9F5] rounded-xl p-6 sm:p-7 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-xl bg-[#102544] border border-slate-700 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:border-[#12D9F5] transition-all shrink-0">
                        {node.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-['IBM_Plex_Mono'] text-xs font-semibold text-[#12D9F5] uppercase tracking-wider">
                            Layer {node.step} — {node.title}
                          </span>
                        </div>
                        <h4 className="font-neo text-xl font-bold text-white group-hover:text-[#12D9F5] transition-colors">
                          {node.subtitle}
                        </h4>
                        <p className="text-slate-400 text-xs mt-1 max-w-xl leading-relaxed">
                          {node.desc}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 font-['IBM_Plex_Mono'] text-xs text-slate-400 bg-[#102544] border border-slate-700 px-3 py-1.5 rounded-md">
                      Architectural Node
                    </div>
                  </div>
                </SectionReveal>

                {/* Vertical flow arrow connector (except last item) */}
                {idx < arr.length - 1 && (
                  <div className="my-2 flex flex-col items-center justify-center text-[#12D9F5]">
                    <div className="w-0.5 h-6 bg-gradient-to-b from-[#12D9F5] to-[#19DDB5] animate-pulse"></div>
                    <div className="text-xs font-bold text-[#19DDB5] bg-[#061226] border border-[#12D9F5]/40 rounded-full w-6 h-6 flex items-center justify-center shadow-md">
                      ↓
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
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

      {/* Vision & Mission Section */}
      <section id="vision" className="py-24 bg-[#061226] border-b border-slate-800/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1557E8]/5 via-transparent to-[#12D9F5]/5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionReveal className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#12D9F5]/10 border border-[#12D9F5]/30 text-[#12D9F5] font-['IBM_Plex_Mono'] text-xs font-semibold tracking-wider">
              BRAND PHILOSOPHY &amp; DIRECTION
            </div>
            <h2 className="font-neo text-3xl sm:text-5xl font-bold tracking-tight text-white">
              VISION &amp; MISSION
            </h2>
            <div className="font-['IBM_Plex_Mono'] text-xl sm:text-2xl text-[#12D9F5] font-bold tracking-wide py-2">
              &ldquo;Think. Build. Automate. Grow.&rdquo;
            </div>
            <div className="bg-[#102544]/70 border border-slate-700/80 rounded-xl p-4 text-xs font-['IBM_Plex_Mono'] text-slate-300 max-w-xl mx-auto">
              MINDSET: <span className="text-white font-semibold">Build for today. Think for tomorrow. Prepare for the future.</span>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SectionReveal delay={0.1} className="h-full">
              <div 
                onMouseMove={handleSpotlightMouseMove}
                className="spotlight-card bg-[#0B1930] border border-slate-800 hover:border-[#12D9F5] rounded-2xl p-8 flex flex-col justify-between h-full transition-all duration-300 shadow-xl group"
              >
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-['IBM_Plex_Mono'] text-[#12D9F5] font-semibold tracking-wider uppercase bg-[#12D9F5]/10 border border-[#12D9F5]/30 px-3 py-1 rounded">
                      Our Vision
                    </span>
                    <span className="text-2xl">🔭</span>
                  </div>
                  <h3 className="font-neo text-2xl font-bold text-white group-hover:text-[#12D9F5] transition-colors">
                    The North Star of ALGorith
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed font-sans pt-2">
                    &ldquo;To build an intelligent technology ecosystem that helps businesses and people solve complex problems, automate work and create sustainable growth.&rdquo;
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-800 text-xs font-['IBM_Plex_Mono'] text-slate-400">
                  Long-Term Ecosystem Strategy
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2} className="h-full">
              <div 
                onMouseMove={handleSpotlightMouseMove}
                className="spotlight-card bg-[#0B1930] border border-slate-800 hover:border-[#12D9F5] rounded-2xl p-8 flex flex-col justify-between h-full transition-all duration-300 shadow-xl group"
              >
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-['IBM_Plex_Mono'] text-[#19DDB5] font-semibold tracking-wider uppercase bg-[#19DDB5]/10 border border-[#19DDB5]/30 px-3 py-1 rounded">
                      Our Mission
                    </span>
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h3 className="font-neo text-2xl font-bold text-white group-hover:text-[#19DDB5] transition-colors">
                    Daily Engineering Purpose
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed font-sans pt-2">
                    &ldquo;To design, build and deliver AI-powered software, data and automation solutions that turn complex challenges into simple, scalable outcomes.&rdquo;
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-800 text-xs font-['IBM_Plex_Mono'] text-slate-400">
                  Execution &amp; Delivery Standard
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* About Section: Architectural Principles & Philosophy */}
      <section id="about" className="py-24 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#12D9F5]/10 border border-[#12D9F5]/30 text-[#12D9F5] font-['IBM_Plex_Mono'] text-xs font-semibold tracking-wider">
              OUR PHILOSOPHY &amp; MINDSET
            </div>
            <h2 className="font-neo text-3xl sm:text-5xl font-bold tracking-tight text-white">
              ENGINEERING RIGOR OVER HYPE
            </h2>
            <div className="bg-[#102544]/80 border border-[#12D9F5]/40 rounded-xl p-4 text-cyan-300 font-['IBM_Plex_Mono'] text-sm tracking-wide shadow-lg">
              &ldquo;Build for today. Think for tomorrow. Prepare for the future.&rdquo;
            </div>
            <p className="text-slate-400 text-base">
              We operate as an AI-Native Technology &amp; Business Solutions Company, translating complex operational bottlenecks into resilient software and automated workflows.
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

      {/* Featured Learning Hub Showcase */}
      <section id="learning" className="py-24 bg-[#061226] border-b border-slate-800/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1557E8]/5 via-transparent to-[#12D9F5]/5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <SectionReveal className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#12D9F5]/10 border border-[#12D9F5]/30 text-[#12D9F5] font-['IBM_Plex_Mono'] text-xs font-semibold tracking-wider">
                <GraduationCap className="w-3.5 h-3.5" />
                OPEN KNOWLEDGE VAULT &bull; 1-CLICK FREE DOWNLOADS
              </div>
              <h2 className="font-neo text-3xl sm:text-5xl font-bold tracking-tight text-white">
                LEARNING HUB &amp; TECH ARCHIVES
              </h2>
              <p className="text-slate-400 text-base sm:text-lg">
                High-impact E-Books, technical whitepapers, infographics, audio briefings, and video masterclasses on AI, automation, and emerging technology.
              </p>
            </SectionReveal>

            <SectionReveal delay={0.1} className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => {
                  setCurrentView('learning');
                  window.location.hash = '#learning';
                  trackEvent('home_open_learning_hub_click');
                }}
                className="btn-shimmer inline-flex items-center gap-2 bg-[#1557E8] hover:bg-[#168CFF] text-white font-semibold text-xs px-5 py-3 rounded-xl shadow-lg shadow-blue-700/30 transition-all hover:scale-105"
              >
                <span>Explore Full Learning Hub ({INITIAL_LEARNING_MATERIALS.length}+ Resources)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </SectionReveal>
          </div>

          {/* Featured 3-column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INITIAL_LEARNING_MATERIALS.slice(0, 3).map((mat, idx) => (
              <SectionReveal key={mat.id} delay={idx * 0.1}>
                <div 
                  onMouseMove={handleSpotlightMouseMove}
                  className="spotlight-card bg-[#0B1930] border border-slate-800 hover:border-[#12D9F5] rounded-2xl overflow-hidden p-0 flex flex-col justify-between h-full transition-all duration-300 hover:-translate-y-1.5 group shadow-xl"
                >
                  <div className="relative h-44 w-full bg-[#102544] overflow-hidden">
                    {mat.thumbnailUrl && (
                      <img 
                        src={mat.thumbnailUrl} 
                        alt={mat.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1930] via-transparent to-black/40"></div>
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#061226]/80 text-[#12D9F5] border border-[#12D9F5]/30">
                        {mat.fileFormat} &bull; {mat.fileSize}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-white font-mono bg-[#061226]/90 px-2.5 py-1 rounded-md border border-slate-700">
                      {mat.type === 'ebook' && <BookOpen className="w-3.5 h-3.5 text-[#12D9F5]" />}
                      {mat.type === 'document' && <FileText className="w-3.5 h-3.5 text-[#19DDB5]" />}
                      {mat.type === 'image' && <BookOpen className="w-3.5 h-3.5 text-purple-400" />}
                      <span className="capitalize">{mat.type}</span>
                      {mat.pageCount && <span className="text-slate-400">({mat.pageCount} pgs)</span>}
                    </div>
                  </div>

                  <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="text-[11px] font-mono text-[#12D9F5] uppercase tracking-wider">
                        {mat.category}
                      </div>
                      <h3 className="font-neo text-lg font-bold text-white group-hover:text-[#12D9F5] transition-colors line-clamp-2">
                        {mat.title}
                      </h3>
                      <p className="text-xs text-slate-400 font-sans line-clamp-2 leading-relaxed">
                        {mat.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3 mt-4">
                      <div className="text-[11px] font-mono text-slate-400 truncate">
                        By {typeof mat.author === 'string' ? mat.author : mat.author?.name || 'ALGorith Research'}
                      </div>

                      {/* 1-CLICK INSTANT DOWNLOAD BUTTON */}
                      <button
                        onClick={(e) => handleQuickDownload(mat, e)}
                        title="1-Click Instant Download"
                        className="btn-shimmer flex items-center gap-1.5 bg-[#1557E8] hover:bg-[#168CFF] text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-md shadow-blue-700/20 transition-all hover:scale-105 active:scale-95 shrink-0"
                      >
                        <FileDown className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          {/* Bottom Banner */}
          <div className="mt-12 p-6 rounded-2xl bg-[#102544]/50 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#12D9F5]/10 border border-[#12D9F5]/30 flex items-center justify-center text-2xl shrink-0">
                📤
              </div>
              <div>
                <h4 className="font-neo text-base font-bold text-white">Have research, eBooks, or templates to share?</h4>
                <p className="text-xs text-slate-400">Upload your PDF documents, JPG/PNG diagrams, code or video masterclasses for the global community.</p>
              </div>
            </div>
            <button
              onClick={() => {
                setCurrentView('learning');
                window.location.hash = '#learning';
                trackEvent('home_upload_banner_click');
              }}
              className="inline-flex items-center gap-2 bg-[#0B1930] hover:bg-[#16325B] text-[#12D9F5] hover:text-white border border-[#12D9F5]/40 text-xs font-mono font-semibold px-5 py-2.5 rounded-xl transition-all shrink-0"
            >
              <Upload className="w-4 h-4" />
              <span>Upload to Learning Hub</span>
            </button>
          </div>
        </div>
      </section>

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

      {/* Conversion & Engagement Journey */}
      <section className="py-24 bg-[#061226] border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#12D9F5]/10 border border-[#12D9F5]/30 text-[#12D9F5] font-['IBM_Plex_Mono'] text-xs font-semibold tracking-wider">
              ENGAGEMENT ROADMAP
            </div>
            <h2 className="font-neo text-3xl sm:text-5xl font-bold tracking-tight text-white">
              YOUR PATH TO INTELLIGENT OPERATIONS
            </h2>
            <p className="text-slate-400 text-lg">
              &ldquo;A structured, frictionless journey from initial problem statement to verifiable customer success.&rdquo;
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {[
              {
                step: '01',
                title: 'Problem',
                desc: 'Identify operational bottlenecks & friction points.',
                icon: '🔍'
              },
              {
                step: '02',
                title: 'Solution',
                desc: 'Map challenges to pragmatic business solutions.',
                icon: '💡'
              },
              {
                step: '03',
                title: 'Product / Service',
                desc: 'Select ecosystem apps or engineering services.',
                icon: '⚙️'
              },
              {
                step: '04',
                title: 'Demo / Consultation',
                desc: 'Interactive preview & technical scoping session.',
                icon: '📅'
              },
              {
                step: '05',
                title: 'Pilot',
                desc: 'Risk-free scoped trial & prototype deployment.',
                icon: '🚀'
              },
              {
                step: '06',
                title: 'Customer',
                desc: 'Long-term operational scale & dedicated support.',
                icon: '🏆'
              }
            ].map((j, idx) => (
              <SectionReveal key={j.step} delay={idx * 0.08} className="h-full">
                <div 
                  onMouseMove={handleSpotlightMouseMove}
                  className="spotlight-card bg-[#0B1930] border border-slate-800 hover:border-[#12D9F5] rounded-xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 h-full group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-['IBM_Plex_Mono'] text-[#12D9F5] font-semibold">{j.step}</span>
                      <span className="text-xl">{j.icon}</span>
                    </div>
                    <h3 className="font-neo text-lg font-bold text-white group-hover:text-[#12D9F5] transition-colors">{j.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">{j.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] font-['IBM_Plex_Mono'] text-[#19DDB5] uppercase">
                    Stage {idx + 1} of 6
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          <div className="mt-12 text-center flex flex-wrap justify-center gap-4">
            <a
              href="#contact"
              onClick={() => trackEvent('journey_talk_click')}
              className="btn-shimmer inline-flex items-center gap-2 bg-[#1557E8] hover:bg-[#168CFF] text-white font-semibold px-7 py-3.5 rounded shadow-lg shadow-blue-700/30 transition-all text-sm"
            >
              Talk to ALGorith <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#products"
              onClick={() => trackEvent('journey_products_click')}
              className="inline-flex items-center gap-2 bg-[#102544] hover:bg-[#16325B] text-slate-200 border border-slate-700 font-semibold px-6 py-3.5 rounded hover:border-[#12D9F5] hover:text-[#12D9F5] transition-all text-sm"
            >
              Explore Products
            </a>
            <a
              href="#services"
              onClick={() => trackEvent('journey_services_click')}
              className="inline-flex items-center gap-2 bg-[#102544] hover:bg-[#16325B] text-slate-200 border border-slate-700 font-semibold px-6 py-3.5 rounded hover:border-[#12D9F5] hover:text-[#12D9F5] transition-all text-sm"
            >
              Explore Services
            </a>
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
              onClick={() => trackEvent('final_cta_talk_click')}
              className="btn-shimmer inline-flex items-center gap-2 bg-[#1557E8] hover:bg-[#168CFF] text-white font-semibold px-7 py-3 rounded text-sm shadow-lg shadow-blue-700/30 transition-all"
            >
              Talk to ALGorith →
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href="#services"
              onClick={() => trackEvent('final_cta_services_click')}
              className="inline-flex items-center gap-2 bg-[#102544] hover:bg-[#16325B] text-slate-200 border border-slate-700 text-sm font-semibold px-7 py-3 rounded hover:border-[#12D9F5] hover:text-[#12D9F5] transition-all"
            >
              Explore Services
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
                Resources &amp; Hub
              </h5>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li>
                  <a href="#learning" className="text-[#12D9F5] hover:text-[#19DDB5] font-semibold transition-colors flex items-center gap-1.5">
                    <span>Learning Hub</span>
                    <span className="text-[9px] font-mono bg-[#12D9F5]/20 text-[#12D9F5] px-1.5 py-0.5 rounded">1-CLICK</span>
                  </a>
                </li>
                <li><a href="#learning" className="hover:text-white transition-colors">AI E-Books &amp; Blueprints</a></li>
                <li><a href="#learning" className="hover:text-white transition-colors">System Architecture Diagrams</a></li>
                <li><a href="#learning" className="hover:text-white transition-colors">Masterclass Audio &amp; Video</a></li>
                <li><a href="#insights" className="hover:text-white transition-colors">Engineering Insights</a></li>
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
