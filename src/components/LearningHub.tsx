import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Upload,
  Download,
  BookOpen,
  FileText,
  Image as ImageIcon,
  Video,
  Headphones,
  Code,
  Layers,
  Sparkles,
  Filter,
  CheckCircle2,
  X,
  Eye,
  Share2,
  Bookmark,
  BookmarkCheck,
  TrendingUp,
  Tag,
  User,
  Clock,
  HardDrive,
  ArrowLeft,
  FileDown,
  HelpCircle,
  Plus,
  Play,
  FileSpreadsheet,
  ShieldCheck,
  Lock,
  Trash2,
  LogOut,
  Key,
  ShieldAlert
} from 'lucide-react';
import { LearningMaterial, MaterialCategory, MaterialType, LearningLevel } from '../types/learning';
import { INITIAL_LEARNING_MATERIALS } from '../data/learningMaterials';
import { AlgorithLogo } from './Logo';
import { COMPANY, trackEvent } from '../config';
import { AdminUser, getAuthSession, clearAuthSession, isAuthorizedUploader } from '../utils/learningAuth';
import { AdminAuthModal } from './learning/AdminAuthModal';

interface LearningHubProps {
  onBackToHome?: () => void;
}

const CATEGORIES: MaterialCategory[] = [
  'All',
  'Artificial Intelligence',
  'Autonomous Agents',
  'Automation & Workflows',
  'Emerging Tech',
  'Software Architecture',
  'Innovation & Strategy',
  'Data Science & Analytics',
  'Robotics & IoT'
];

const TYPES: { id: MaterialType | 'all'; label: string; icon: React.ReactNode }[] = [
  { id: 'all', label: 'All Formats', icon: <Layers className="w-3.5 h-3.5" /> },
  { id: 'ebook', label: 'E-Books', icon: <BookOpen className="w-3.5 h-3.5" /> },
  { id: 'document', label: 'Documents & Guides', icon: <FileText className="w-3.5 h-3.5" /> },
  { id: 'image', label: 'Images & Infographics', icon: <ImageIcon className="w-3.5 h-3.5" /> },
  { id: 'video', label: 'Videos & Masterclasses', icon: <Video className="w-3.5 h-3.5" /> },
  { id: 'audio', label: 'Audio & Podcasts', icon: <Headphones className="w-3.5 h-3.5" /> },
  { id: 'code', label: 'Code & Notebooks', icon: <Code className="w-3.5 h-3.5" /> }
];

const STORAGE_KEY = 'algorith_learning_materials_v2';
const BOOKMARKS_KEY = 'algorith_learning_bookmarks_v1';

const getAuthorName = (author: any): string => {
  if (!author) return 'ALGorith Contributor';
  if (typeof author === 'string') return author;
  return author.name || 'ALGorith Contributor';
};

export const LearningHub: React.FC<LearningHubProps> = ({ onBackToHome }) => {
  // Materials state loaded from localStorage or initial seed
  const [materials, setMaterials] = useState<LearningMaterial[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore fallback to initial
    }
    return INITIAL_LEARNING_MATERIALS;
  });

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(BOOKMARKS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MaterialCategory>('All');
  const [selectedType, setSelectedType] = useState<MaterialType | 'all'>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'trending' | 'newest' | 'downloads'>('trending');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  // Modals & Active Material for preview
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => getAuthSession());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [deleteConfirmMaterial, setDeleteConfirmMaterial] = useState<LearningMaterial | null>(null);
  const [previewMaterial, setPreviewMaterial] = useState<LearningMaterial | null>(null);
  const [downloadNotification, setDownloadNotification] = useState<{ title: string; filename: string } | null>(null);
  const [copyShareNotification, setCopyShareNotification] = useState(false);

  // Upload Form State
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    category: 'Artificial Intelligence' as MaterialCategory,
    type: 'ebook' as MaterialType,
    level: 'Intermediate' as LearningLevel,
    tags: '',
    authorName: '',
    authorRole: '',
    fileFormat: 'PDF',
    fileSize: '3.2 MB',
    pageCount: '',
    duration: '',
    customThumbnail: '',
    fileName: '',
    fileDataUri: '',
    fileTextContent: ''
  });
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isSubmittingUpload, setIsSubmittingUpload] = useState(false);
  const [uploadSuccessToast, setUploadSuccessToast] = useState(false);

  // Persist materials to localStorage when updated
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(materials));
    } catch {
      // ignore
    }
  }, [materials]);

  // Persist bookmarks
  useEffect(() => {
    try {
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    } catch {
      // ignore
    }
  }, [bookmarks]);

  // Handle Bookmarks
  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarks(prev => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter(b => b !== id) : [...prev, id];
      trackEvent('learning_bookmark_toggle', { materialId: id, active: !exists });
      return next;
    });
  };

  // 1-CLICK INSTANT DOWNLOAD FUNCTIONALITY
  const handleOneClickDownload = (material: LearningMaterial, e: React.MouseEvent) => {
    e.stopPropagation();
    trackEvent('learning_material_download', { id: material.id, title: material.title, format: material.fileFormat });

    // Increment downloads count in local state
    setMaterials(prev =>
      prev.map(m =>
        m.id === material.id
          ? { ...m, downloadsCount: (m.downloadsCount || m.downloadCount || 0) + 1 }
          : m
      )
    );

    const filename = `${material.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.${material.fileFormat.toLowerCase()}`;

    // If user uploaded a real file or data URI
    if (material.fileUrl && material.fileUrl.startsWith('data:')) {
      const link = document.createElement('a');
      link.href = material.fileUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Generate synthetic document / rich text package or trigger direct blob download
      const authorName = getAuthorName(material.author);
      const content = material.fileContent || `# ${material.title}\nCategory: ${material.category}\nFormat: ${material.fileFormat}\nAuthor: ${authorName}\nPublished by: ALGorith Technologies Learning Hub\n\n${material.description}\n\n=========================================\nALGorith Official Learning Resource\nThink. Build. Automate. Grow.\n=========================================\n\nFull study document contents and architecture specs verified for download.`;
      
      const mimeType = material.fileFormat === 'PDF' 
        ? 'application/pdf' 
        : material.fileFormat === 'DOCX' 
        ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
        : 'text/plain;charset=utf-8';
      
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    setDownloadNotification({ title: material.title, filename });
    setTimeout(() => {
      setDownloadNotification(null);
    }, 4000);
  };

  // Handle Drag & Drop / File Input in Upload Modal
  const processUploadedFile = (file: File) => {
    setUploadError(null);
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
    const extension = file.name.split('.').pop()?.toUpperCase() || 'FILE';

    // Auto-detect type from extension
    let detectedType: MaterialType = 'document';
    const extLower = extension.toLowerCase();
    if (['pdf', 'epub', 'mobi'].includes(extLower)) {
      detectedType = 'ebook';
    } else if (['jpg', 'jpeg', 'png', 'webp', 'svg', 'gif'].includes(extLower)) {
      detectedType = 'image';
    } else if (['mp4', 'mov', 'webm', 'mkv'].includes(extLower)) {
      detectedType = 'video';
    } else if (['mp3', 'wav', 'aac', 'ogg', 'm4a'].includes(extLower)) {
      detectedType = 'audio';
    } else if (['ts', 'tsx', 'js', 'jsx', 'py', 'json', 'sh', 'zip', 'ipynb'].includes(extLower)) {
      detectedType = 'code';
    }

    // Auto-fill form fields
    const cleanTitle = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setUploadForm(prev => ({
        ...prev,
        title: prev.title || cleanTitle,
        fileFormat: extension,
        fileSize: sizeInMb,
        type: detectedType,
        fileName: file.name,
        fileDataUri: result,
        customThumbnail: detectedType === 'image' ? result : prev.customThumbnail
      }));
    };

    if (file.type.startsWith('text/') || extLower === 'json' || extLower === 'md') {
      const textReader = new FileReader();
      textReader.onload = (e) => {
        setUploadForm(prev => ({
          ...prev,
          fileTextContent: (e.target?.result as string) || ''
        }));
      };
      textReader.readAsText(file);
    }

    reader.readAsDataURL(file);
  };

  const handleOpenUploadClick = () => {
    if (isAuthorizedUploader(adminUser)) {
      setUploadForm(prev => ({
        ...prev,
        authorName: prev.authorName || adminUser?.name || '',
        authorRole: prev.authorRole || (adminUser?.role === 'owner' ? 'Owner & Lead Architect' : 'System Administrator')
      }));
      setIsUploadModalOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleLogout = () => {
    clearAuthSession();
    setAdminUser(null);
    setIsUploadModalOpen(false);
  };

  const handleDeleteMaterial = (material: LearningMaterial, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteConfirmMaterial(material);
  };

  const confirmDelete = () => {
    if (!deleteConfirmMaterial) return;
    setMaterials(prev => prev.filter(m => m.id !== deleteConfirmMaterial.id));
    setDeleteConfirmMaterial(null);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // STRICT OWNER/ADMIN CHECK
    if (!isAuthorizedUploader(adminUser)) {
      setUploadError('Access Restricted: Only the Owner or verified Admins can upload learning materials.');
      setIsAuthModalOpen(true);
      return;
    }

    if (!uploadForm.title.trim()) {
      setUploadError('Please provide a title for the learning material.');
      return;
    }
    if (!uploadForm.description.trim()) {
      setUploadError('Please write a brief summary / overview of the material.');
      return;
    }

    setIsSubmittingUpload(true);

    const verifiedRole = adminUser?.role === 'owner' ? 'Owner & System Architect' : 'System Administrator';
    const verifiedName = uploadForm.authorName.trim() || adminUser?.name || 'ALGorith Lead';

    const newMaterial: LearningMaterial = {
      id: `usr-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: uploadForm.title.trim(),
      description: uploadForm.description.trim(),
      category: uploadForm.category,
      type: uploadForm.type,
      fileType: uploadForm.type,
      fileFormat: uploadForm.fileFormat || 'PDF',
      fileSize: uploadForm.fileSize || '2.4 MB',
      downloadsCount: 1,
      downloadCount: 1,
      uploadedAt: new Date().toISOString().split('T')[0],
      uploadDate: new Date().toISOString().split('T')[0],
      isUserUploaded: true,
      level: uploadForm.level,
      tags: uploadForm.tags
        .split(',')
        .map(t => t.trim())
        .filter(Boolean),
      author: {
        name: verifiedName,
        role: uploadForm.authorRole.trim() || verifiedRole
      },
      fileUrl: uploadForm.fileDataUri || undefined,
      fileContent: uploadForm.fileTextContent || undefined,
      thumbnailUrl: uploadForm.customThumbnail || (
        uploadForm.type === 'ebook' ? 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80' :
        uploadForm.type === 'video' ? 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=600&q=80' :
        uploadForm.type === 'audio' ? 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80' :
        uploadForm.type === 'image' ? 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80' :
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80'
      )
    };

    setMaterials(prev => [newMaterial, ...prev]);
    setIsSubmittingUpload(false);
    setIsUploadModalOpen(false);
    setUploadSuccessToast(true);
    trackEvent('learning_upload_success', { id: newMaterial.id, type: newMaterial.type });

    // Reset Form
    setUploadForm({
      title: '',
      description: '',
      category: 'Artificial Intelligence',
      type: 'ebook',
      level: 'Intermediate',
      tags: '',
      authorName: '',
      authorRole: '',
      fileFormat: 'PDF',
      fileSize: '3.2 MB',
      pageCount: '',
      duration: '',
      customThumbnail: '',
      fileName: '',
      fileDataUri: '',
      fileTextContent: ''
    });

    setTimeout(() => {
      setUploadSuccessToast(false);
    }, 4000);
  };

  // Filtered & Sorted Materials
  const filteredMaterials = useMemo(() => {
    return materials.filter(item => {
      // Search query filter
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        getAuthorName(item.author).toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;

      // Type / Format filter
      const matchesType =
        selectedType === 'all' || item.type === selectedType || item.fileType === selectedType;

      // Level filter
      const matchesLevel =
        selectedLevel === 'All' || item.level === selectedLevel;

      // Bookmarks only filter
      const matchesBookmark = !showBookmarksOnly || bookmarks.includes(item.id);

      return matchesSearch && matchesCategory && matchesType && matchesLevel && matchesBookmark;
    }).sort((a, b) => {
      if (sortBy === 'trending') {
        return (b.downloadsCount || b.downloadCount || 0) - (a.downloadsCount || a.downloadCount || 0);
      }
      if (sortBy === 'newest') {
        return (b.uploadedAt || b.uploadDate || '').localeCompare(a.uploadedAt || a.uploadDate || '');
      }
      if (sortBy === 'downloads') {
        return (b.downloadsCount || b.downloadCount || 0) - (a.downloadsCount || a.downloadCount || 0);
      }
      return 0;
    });
  }, [materials, searchQuery, selectedCategory, selectedType, selectedLevel, sortBy, showBookmarksOnly, bookmarks]);

  const handleShareMaterial = (item: LearningMaterial, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      const shareUrl = `${window.location.origin}/#learning`;
      navigator.clipboard.writeText(`${item.title} — Download free from ALGorith Learning Hub: ${shareUrl}`);
      setCopyShareNotification(true);
      setTimeout(() => setCopyShareNotification(false), 2500);
    }
  };

  return (
    <div className="min-h-screen text-[#F8FAFC] bg-[#061226] font-['Inter'] relative selection:bg-[#12D9F5]/30 selection:text-white bg-tech-grid pb-24">
      
      {/* 1-Click Download Toast Notification */}
      <AnimatePresence>
        {downloadNotification && (
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
              <p className="text-xs text-slate-300 font-sans mt-0.5 line-clamp-1">{downloadNotification.title}</p>
              <p className="text-[11px] font-mono text-[#12D9F5] mt-1">{downloadNotification.filename}</p>
            </div>
            <button
              onClick={() => setDownloadNotification(null)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Toast Notification */}
      <AnimatePresence>
        {copyShareNotification && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 right-6 z-50 bg-[#0B1930] border border-[#12D9F5] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 font-mono text-xs"
          >
            <CheckCircle2 className="w-4 h-4 text-[#12D9F5]" />
            <span>Share link &amp; title copied to clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Success Toast */}
      <AnimatePresence>
        {uploadSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 right-6 z-50 bg-[#0B1930] border border-[#19DDB5] text-white px-5 py-4 rounded-xl shadow-2xl flex items-center gap-3 font-mono text-xs"
          >
            <Sparkles className="w-5 h-5 text-[#19DDB5]" />
            <div>
              <div className="font-bold text-white">Material Published!</div>
              <div className="text-slate-400 text-[11px]">Your learning asset is now live and downloadable by 1-click.</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#061226]/90 backdrop-blur-md border-b border-slate-800/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-2 text-xs font-mono font-medium text-slate-400 hover:text-[#12D9F5] transition-colors py-2 px-3 rounded-lg bg-[#0B1930] border border-slate-800 hover:border-slate-700"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Main Site</span>
            </button>
            <div className="hidden sm:block h-5 w-[1px] bg-slate-800"></div>
            <a href="#" onClick={onBackToHome} aria-label="ALGorith Technologies">
              <AlgorithLogo size={28} />
            </a>
          </div>

          <div className="flex items-center gap-3">
            {adminUser ? (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-semibold">{adminUser.role === 'owner' ? `Owner: ${adminUser.name}` : `Admin: ${adminUser.name}`}</span>
                <button
                  onClick={handleLogout}
                  title="Sign out of Admin Session"
                  className="ml-1 text-slate-400 hover:text-rose-400 p-0.5 rounded transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0B1930] hover:bg-[#102544] border border-slate-800 text-slate-400 hover:text-white text-xs font-mono transition-all"
                title="Owner or Admin Authentication"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Admin Login</span>
              </button>
            )}

            <button
              onClick={() => setShowBookmarksOnly(prev => !prev)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono transition-all border ${
                showBookmarksOnly
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                  : 'bg-[#0B1930] border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span className="hidden sm:inline">Saved</span>
              <span className="bg-amber-500/30 text-amber-300 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                {bookmarks.length}
              </span>
            </button>

            <button
              onClick={handleOpenUploadClick}
              className="btn-shimmer flex items-center gap-2 bg-[#1557E8] hover:bg-[#168CFF] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-blue-700/30 transition-all"
            >
              {adminUser ? (
                <>
                  <Upload className="w-4 h-4" />
                  <span>Upload Material</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-amber-300" />
                  <span>Upload Material</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner for Learning Hub */}
      <section className="relative py-16 sm:py-20 border-b border-slate-800/80 overflow-hidden bg-gradient-to-b from-[#0B1930]/60 to-[#061226]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12D9F5]/10 border border-[#12D9F5]/30 text-[#12D9F5] font-['IBM_Plex_Mono'] text-xs font-semibold tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              ALGorith OPEN KNOWLEDGE VAULT &bull; 100% FREE 1-CLICK ACCESS
            </div>
            <h1 className="font-neo text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              OPEN LEARNING &amp; TECH ARCHIVES
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-sans">
              Download curated E-Books, technical whitepapers, architectural blueprints, infographics, and audiovisual masterclasses on AI, autonomous agents, process automation, and emerging technologies with a single click.
            </p>
          </div>

          {/* Quick Vault Metrics Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-8 border-t border-slate-800/80">
            <div className="bg-[#0B1930]/80 border border-slate-800 p-4 rounded-xl">
              <div className="text-2xl font-bold font-neo text-white">{materials.length}+</div>
              <div className="text-xs font-mono text-slate-400 mt-1">Available Resources</div>
            </div>
            <div className="bg-[#0B1930]/80 border border-slate-800 p-4 rounded-xl">
              <div className="text-2xl font-bold font-neo text-[#12D9F5]">1-Click</div>
              <div className="text-xs font-mono text-slate-400 mt-1">Instant Direct Downloads</div>
            </div>
            <div className="bg-[#0B1930]/80 border border-slate-800 p-4 rounded-xl">
              <div className="text-2xl font-bold font-neo text-[#19DDB5]">All Formats</div>
              <div className="text-xs font-mono text-slate-400 mt-1">PDF, EPUB, AV, Code</div>
            </div>
            <div className="bg-[#0B1930]/80 border border-slate-800 p-4 rounded-xl">
              <div className="text-2xl font-bold font-neo text-purple-400">Vault Security</div>
              <div className="text-xs font-mono text-slate-400 mt-1">Owner &amp; Admin Uploaded</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area: Controls, Search, and Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Search & Filter Bar */}
        <div className="space-y-6 mb-10">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search learning materials by topic, keywords, author, or tech..."
                className="w-full bg-[#0B1930] border border-slate-700/80 rounded-xl pl-12 pr-10 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#12D9F5] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort & Quick Actions */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-[#0B1930] border border-slate-700/80 rounded-xl p-1 text-xs font-mono">
                <span className="text-slate-400 pl-2">Sort:</span>
                <button
                  onClick={() => setSortBy('trending')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    sortBy === 'trending' ? 'bg-[#1557E8] text-white font-semibold' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Trending
                </button>
                <button
                  onClick={() => setSortBy('newest')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    sortBy === 'newest' ? 'bg-[#1557E8] text-white font-semibold' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Newest
                </button>
              </div>

              <button
                onClick={handleOpenUploadClick}
                className="hidden sm:flex items-center gap-1.5 text-xs font-mono bg-[#102544] hover:bg-[#16325B] text-[#12D9F5] border border-[#12D9F5]/40 px-3.5 py-3 rounded-xl transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Material</span>
              </button>
            </div>
          </div>

          {/* Format Types Pill Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {TYPES.map(t => (
              <button
                key={t.id}
                onClick={() => setSelectedType(t.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                  selectedType === t.id
                    ? 'bg-[#12D9F5]/15 border-[#12D9F5] text-[#12D9F5] shadow-sm shadow-cyan-500/20'
                    : 'bg-[#0B1930] border-slate-800 text-slate-300 hover:border-slate-600 hover:text-white'
                }`}
              >
                {t.icon}
                <span>{t.label}</span>
              </button>
            ))}
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all border ${
                  selectedCategory === cat
                    ? 'bg-[#1557E8] border-[#1557E8] text-white font-semibold shadow-md shadow-blue-700/30'
                    : 'bg-[#0B1930]/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-xs font-mono text-slate-400">
            Showing <span className="text-white font-bold">{filteredMaterials.length}</span> materials
            {selectedCategory !== 'All' && <span> in <span className="text-[#12D9F5] font-semibold">{selectedCategory}</span></span>}
            {showBookmarksOnly && <span className="text-amber-400 font-semibold"> (Bookmarked Only)</span>}
          </div>

          {filteredMaterials.length > 0 && (
            <div className="text-[11px] font-mono text-[#19DDB5] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>All assets enabled for Instant 1-Click Download</span>
            </div>
          )}
        </div>

        {/* Materials Grid */}
        {filteredMaterials.length === 0 ? (
          <div className="text-center py-20 bg-[#0B1930]/40 border border-slate-800 rounded-2xl p-8 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-[#102544] border border-slate-700 flex items-center justify-center mx-auto text-slate-400">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="font-neo text-xl font-bold text-white">No Learning Materials Found</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              We couldn't find any resources matching your search or filters. Try adjusting your query or upload a new material for the community!
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedType('all');
                  setShowBookmarksOnly(false);
                }}
                className="px-4 py-2 bg-[#0B1930] hover:bg-slate-800 border border-slate-700 text-xs font-mono text-white rounded-lg transition-colors"
              >
                Reset Filters
              </button>
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="btn-shimmer px-4 py-2 bg-[#1557E8] hover:bg-[#168CFF] text-xs font-semibold text-white rounded-lg transition-colors"
              >
                Upload First Material
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((mat) => {
              const isBookmarked = bookmarks.includes(mat.id);

              return (
                <div
                  key={mat.id}
                  onClick={() => setPreviewMaterial(mat)}
                  className="spotlight-card bg-[#0B1930] border border-slate-800 hover:border-[#12D9F5] rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 group cursor-pointer shadow-xl relative"
                >
                  <div>
                    {/* Thumbnail / Header */}
                    <div className="relative h-48 w-full bg-[#102544] overflow-hidden">
                      {mat.thumbnailUrl ? (
                        <img
                          src={mat.thumbnailUrl}
                          alt={mat.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#102544] to-[#0B1930]">
                          <BookOpen className="w-12 h-12 text-[#12D9F5]/40" />
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1930] via-transparent to-black/50"></div>

                      {/* Top badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#061226]/80 backdrop-blur-md text-[#12D9F5] border border-[#12D9F5]/30">
                          {mat.fileFormat} &bull; {mat.fileSize}
                        </span>

                        <div className="flex items-center gap-1.5">
                          {adminUser && (
                            <button
                              onClick={(e) => handleDeleteMaterial(mat, e)}
                              title="Delete Material (Admin)"
                              className="p-1.5 rounded-lg backdrop-blur-md border bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/25 transition-all"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            onClick={(e) => toggleBookmark(mat.id, e)}
                            title={isBookmarked ? "Remove Bookmark" : "Save Bookmark"}
                            className={`p-1.5 rounded-lg backdrop-blur-md border transition-all ${
                              isBookmarked
                                ? 'bg-amber-500/20 border-amber-400 text-amber-400'
                                : 'bg-[#061226]/80 border-slate-700 text-slate-300 hover:text-white'
                            }`}
                          >
                            {isBookmarked ? (
                              <BookmarkCheck className="w-3.5 h-3.5" />
                            ) : (
                              <Bookmark className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Format tag badge on bottom left */}
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-white font-mono bg-[#061226]/90 px-2.5 py-1 rounded-md border border-slate-700">
                        {mat.type === 'ebook' && <BookOpen className="w-3.5 h-3.5 text-[#12D9F5]" />}
                        {mat.type === 'document' && <FileText className="w-3.5 h-3.5 text-[#19DDB5]" />}
                        {mat.type === 'image' && <ImageIcon className="w-3.5 h-3.5 text-purple-400" />}
                        {mat.type === 'video' && <Video className="w-3.5 h-3.5 text-rose-400" />}
                        {mat.type === 'audio' && <Headphones className="w-3.5 h-3.5 text-amber-400" />}
                        {mat.type === 'code' && <Code className="w-3.5 h-3.5 text-emerald-400" />}
                        <span className="capitalize">{mat.type}</span>
                        {mat.duration && <span className="text-slate-400">({mat.duration})</span>}
                        {mat.pageCount && <span className="text-slate-400">({mat.pageCount} pgs)</span>}
                      </div>
                    </div>

                    {/* Body content */}
                    <div className="p-5 space-y-3">
                      <div className="text-[11px] font-mono text-[#12D9F5] uppercase tracking-wider">
                        {mat.category}
                      </div>

                      <h3 className="font-neo text-lg font-bold text-white group-hover:text-[#12D9F5] transition-colors line-clamp-2 leading-snug">
                        {mat.title}
                      </h3>

                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed font-sans">
                        {mat.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {mat.tags.slice(0, 3).map(tag => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono bg-[#102544] text-slate-300 px-2 py-0.5 rounded border border-slate-800"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer with author info & ONE-CLICK DOWNLOAD button */}
                  <div className="p-5 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <div className="w-7 h-7 rounded-full bg-[#102544] border border-slate-700 flex items-center justify-center text-xs text-slate-300 shrink-0">
                        {getAuthorName(mat.author).charAt(0)}
                      </div>
                      <div className="truncate">
                        <div className="text-[11px] font-medium text-slate-200 truncate">{getAuthorName(mat.author)}</div>
                        <div className="text-[10px] font-mono text-slate-500">{mat.downloadsCount || mat.downloadCount || 1} downloads</div>
                      </div>
                    </div>

                    {/* PRIMARY 1-CLICK DOWNLOAD ACTION */}
                    <button
                      onClick={(e) => handleOneClickDownload(mat, e)}
                      title="Instant 1-Click Download"
                      className="btn-shimmer flex items-center gap-1.5 bg-[#1557E8] hover:bg-[#168CFF] text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-md shadow-blue-700/20 transition-all shrink-0 hover:scale-105 active:scale-95"
                    >
                      <FileDown className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Material Detail & Preview Modal */}
      <AnimatePresence>
        {previewMaterial && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0B1930] border border-slate-700 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col"
            >
              {/* Modal Header with Thumbnail */}
              <div className="relative h-56 w-full bg-[#102544] shrink-0">
                {previewMaterial.thumbnailUrl && (
                  <img
                    src={previewMaterial.thumbnailUrl}
                    alt={previewMaterial.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1930] via-transparent to-black/60"></div>

                <button
                  onClick={() => setPreviewMaterial(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-[#061226]/80 text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-4 left-6 right-6">
                  <div className="inline-block text-[11px] font-mono text-[#12D9F5] bg-[#061226]/80 px-2.5 py-1 rounded border border-[#12D9F5]/30 mb-2">
                    {previewMaterial.category} &bull; {previewMaterial.fileFormat} ({previewMaterial.fileSize})
                  </div>
                  <h3 className="font-neo text-2xl sm:text-3xl font-bold text-white">
                    {previewMaterial.title}
                  </h3>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6 flex-1">
                
                {/* Description */}
                <div>
                  <h4 className="font-mono text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Overview &amp; Learning Objectives
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed font-sans bg-[#102544]/40 p-4 rounded-xl border border-slate-800">
                    {previewMaterial.description}
                  </p>
                </div>

                {/* Document preview if content exists */}
                {previewMaterial.fileContent && (
                  <div>
                    <h4 className="font-mono text-xs font-bold text-[#12D9F5] uppercase tracking-wider mb-2">
                      Document Sample &amp; Structural Preview
                    </h4>
                    <pre className="bg-[#061226] border border-slate-800 p-4 rounded-xl text-xs font-mono text-slate-300 whitespace-pre-wrap max-h-60 overflow-y-auto leading-relaxed">
                      {previewMaterial.fileContent}
                    </pre>
                  </div>
                )}

                {/* Meta details */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-[#102544]/50 border border-slate-800 p-3 rounded-lg">
                    <div className="text-[10px] font-mono text-slate-400">Author</div>
                    <div className="text-xs font-semibold text-white truncate">{getAuthorName(previewMaterial.author)}</div>
                  </div>
                  <div className="bg-[#102544]/50 border border-slate-800 p-3 rounded-lg">
                    <div className="text-[10px] font-mono text-slate-400">Total Downloads</div>
                    <div className="text-xs font-semibold text-[#12D9F5]">{previewMaterial.downloadsCount || previewMaterial.downloadCount || 1}</div>
                  </div>
                  <div className="bg-[#102544]/50 border border-slate-800 p-3 rounded-lg">
                    <div className="text-[10px] font-mono text-slate-400">Published Date</div>
                    <div className="text-xs font-semibold text-slate-200">{previewMaterial.uploadedAt || previewMaterial.uploadDate || '2026-03'}</div>
                  </div>
                  <div className="bg-[#102544]/50 border border-slate-800 p-3 rounded-lg">
                    <div className="text-[10px] font-mono text-slate-400">License / Access</div>
                    <div className="text-xs font-semibold text-emerald-400">Open Public Access</div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {previewMaterial.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono bg-[#102544] text-[#12D9F5] px-2.5 py-1 rounded-md border border-slate-800">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="p-6 border-t border-slate-800 bg-[#061226]/60 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleShareMaterial(previewMaterial, e)}
                    className="p-2.5 rounded-xl bg-[#0B1930] hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white flex items-center gap-2 text-xs font-mono transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                  <button
                    onClick={(e) => toggleBookmark(previewMaterial.id, e)}
                    className="p-2.5 rounded-xl bg-[#0B1930] hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white flex items-center gap-2 text-xs font-mono transition-colors"
                  >
                    <Bookmark className="w-4 h-4" />
                    <span>{bookmarks.includes(previewMaterial.id) ? 'Saved' : 'Bookmark'}</span>
                  </button>
                </div>

                {/* 1-CLICK DOWNLOAD MODAL CTA */}
                <button
                  onClick={(e) => handleOneClickDownload(previewMaterial, e)}
                  className="btn-shimmer flex items-center gap-2 bg-[#1557E8] hover:bg-[#168CFF] text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-lg shadow-blue-700/30 transition-all hover:scale-105"
                >
                  <Download className="w-4 h-4" />
                  <span>Download {previewMaterial.fileFormat} ({previewMaterial.fileSize})</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Upload Material Modal */}
      <AnimatePresence>
        {isUploadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0B1930] border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-[#0B1930]/95 backdrop-blur-md z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1557E8]/20 border border-[#1557E8] text-[#12D9F5] flex items-center justify-center">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-neo text-xl font-bold text-white">Upload Learning Material</h3>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono font-bold uppercase">
                        <ShieldCheck className="w-3 h-3" />
                        {adminUser?.role === 'owner' ? 'Owner Verified' : 'Admin Verified'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Publishing as <strong className="text-white">{adminUser?.name}</strong> ({adminUser?.email})
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsUploadModalOpen(false)}
                  className="p-2 rounded-lg bg-[#102544] hover:bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleUploadSubmit} className="p-6 space-y-5">
                {uploadError && (
                  <div className="p-3 bg-rose-500/10 border border-rose-500/40 rounded-lg text-rose-400 text-xs font-mono">
                    {uploadError}
                  </div>
                )}

                {/* Drag & Drop File Upload Area */}
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 mb-2">
                    Attach Learning File / Document / Media
                  </label>
                  <div
                    onDragOver={e => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={e => {
                      e.preventDefault();
                      setIsDragging(false);
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        processUploadedFile(e.dataTransfer.files[0]);
                      }
                    }}
                    className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                      isDragging
                        ? 'border-[#12D9F5] bg-[#12D9F5]/10'
                        : uploadForm.fileName
                        ? 'border-[#19DDB5] bg-[#19DDB5]/5'
                        : 'border-slate-700 hover:border-slate-500 bg-[#061226]/50'
                    }`}
                  >
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      onChange={e => {
                        if (e.target.files && e.target.files[0]) {
                          processUploadedFile(e.target.files[0]);
                        }
                      }}
                    />
                    <label htmlFor="file-upload" className="cursor-pointer space-y-2 block">
                      <div className="w-12 h-12 rounded-xl bg-[#102544] text-[#12D9F5] flex items-center justify-center mx-auto border border-slate-700">
                        <Upload className="w-6 h-6" />
                      </div>
                      {uploadForm.fileName ? (
                        <div>
                          <p className="text-sm font-semibold text-[#19DDB5]">{uploadForm.fileName}</p>
                          <p className="text-xs text-slate-400 font-mono mt-1">
                            {uploadForm.fileFormat} &bull; {uploadForm.fileSize}
                          </p>
                          <p className="text-[11px] text-[#12D9F5] underline mt-1">Click to replace file</p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm text-slate-200 font-medium">
                            <span className="text-[#12D9F5] font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-slate-400 font-mono mt-1">
                            Supports PDF, EPUB, DOCX, PNG, JPG, MP4, MP3, ZIP, Code
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                    Material Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={uploadForm.title}
                    onChange={e => setUploadForm({ ...uploadForm, title: e.target.value })}
                    placeholder="e.g. Enterprise Autonomous AI Agent Architecture 2026"
                    className="w-full bg-[#061226] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#12D9F5]"
                  />
                </div>

                {/* Category & Format Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                      Category *
                    </label>
                    <select
                      value={uploadForm.category}
                      onChange={e => setUploadForm({ ...uploadForm, category: e.target.value as MaterialCategory })}
                      className="w-full bg-[#061226] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#12D9F5]"
                    >
                      {CATEGORIES.filter(c => c !== 'All').map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                      Content Format *
                    </label>
                    <select
                      value={uploadForm.type}
                      onChange={e => setUploadForm({ ...uploadForm, type: e.target.value as MaterialType })}
                      className="w-full bg-[#061226] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#12D9F5]"
                    >
                      <option value="ebook">E-Book / PDF Book</option>
                      <option value="document">Document / Whitepaper</option>
                      <option value="image">Image / Infographic / Diagram</option>
                      <option value="video">Video Masterclass (MP4)</option>
                      <option value="audio">Audio Podcast / Briefing (MP3)</option>
                      <option value="code">Code Template / Notebook</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                    Description / Key Takeaways *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={uploadForm.description}
                    onChange={e => setUploadForm({ ...uploadForm, description: e.target.value })}
                    placeholder="Summarize what this material covers and what readers/viewers will learn..."
                    className="w-full bg-[#061226] border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#12D9F5]"
                  />
                </div>

                {/* Author Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                      Author / Contributor Name
                    </label>
                    <input
                      type="text"
                      value={uploadForm.authorName}
                      onChange={e => setUploadForm({ ...uploadForm, authorName: e.target.value })}
                      placeholder="e.g. Dr. Alex Vance or ALGorith Team"
                      className="w-full bg-[#061226] border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#12D9F5]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      value={uploadForm.tags}
                      onChange={e => setUploadForm({ ...uploadForm, tags: e.target.value })}
                      placeholder="AI, automation, llm, prompt"
                      className="w-full bg-[#061226] border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#12D9F5]"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsUploadModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-slate-700 text-xs font-mono text-slate-300 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingUpload}
                    className="btn-shimmer bg-[#1557E8] hover:bg-[#168CFF] text-white text-xs font-semibold px-6 py-2.5 rounded-xl shadow-lg shadow-blue-700/30 transition-all flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Publish &amp; Enable 1-Click Download</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Admin Authentication Modal */}
      <AdminAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthenticated={(user) => {
          setAdminUser(user);
          setUploadForm(prev => ({
            ...prev,
            authorName: user.name,
            authorRole: user.role === 'owner' ? 'Owner & System Architect' : 'System Administrator'
          }));
          setIsUploadModalOpen(true);
        }}
      />

      {/* Delete Confirmation Modal for Admin */}
      <AnimatePresence>
        {deleteConfirmMaterial && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0B1930] border border-rose-500/40 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl text-white"
            >
              <div className="w-12 h-12 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-neo text-lg font-bold text-white">Confirm Removal</h3>
                <p className="text-xs text-slate-300 mt-1">
                  Are you sure you want to remove <strong className="text-white font-semibold">"{deleteConfirmMaterial.title}"</strong> from the repository?
                </p>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setDeleteConfirmMaterial(null)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-xs font-mono text-slate-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-lg shadow-rose-900/30 transition-all flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Material</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer Notice */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-400">
        <div>&copy; 2026 {COMPANY.name} &bull; Open Knowledge &amp; Research Initiative</div>
        <div className="flex gap-6">
          <button onClick={onBackToHome} className="hover:text-[#12D9F5] transition-colors">
            Main Platform &rarr;
          </button>
        </div>
      </footer>
    </div>
  );
};
