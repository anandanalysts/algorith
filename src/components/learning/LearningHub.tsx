import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Upload, 
  BookOpen, 
  Sparkles, 
  SlidersHorizontal, 
  CheckCircle2, 
  X,
} from 'lucide-react';
import { LearningMaterial } from '../../types/learning';
import { INITIAL_LEARNING_MATERIALS } from '../../data/learningMaterials';
import { getSavedMaterials, saveUploadedMaterial, deleteUploadedMaterial } from '../../utils/downloadHelper';
import { LearningCard } from './LearningCard';
import { UploadModal } from './UploadModal';
import { PreviewModal } from './PreviewModal';

const CATEGORY_TABS: { id: string; label: string; icon?: string }[] = [
  { id: 'ALL', label: 'All Topics' },
  { id: 'AI & LLMs', label: 'AI & LLMs', icon: '🧠' },
  { id: 'Automation & Agents', label: 'Automation & Agents', icon: '⚡' },
  { id: 'Prompt Engineering', label: 'Prompt & RAG', icon: '🎯' },
  { id: 'Emerging Tech', label: 'Emerging Tech', icon: '🚀' },
  { id: 'Software Engineering', label: 'Software & APIs', icon: '💻' },
  { id: 'Data & Analytics', label: 'Data & Analytics', icon: '📊' },
  { id: 'Innovation & Strategy', label: 'Innovation & Strategy', icon: '💡' },
  { id: 'Robotics & IoT', label: 'Robotics & Hardware', icon: '🤖' },
];

const FORMAT_TABS: { id: string; label: string; icon: string }[] = [
  { id: 'ALL', label: 'All Formats', icon: '📂' },
  { id: 'ebook', label: 'E-Books & PDFs', icon: '📚' },
  { id: 'document', label: 'Docs & Guides', icon: '📄' },
  { id: 'image', label: 'Diagrams (PNG/JPG)', icon: '🖼️' },
  { id: 'video', label: 'Videos', icon: '🎥' },
  { id: 'audio', label: 'Audio & Podcasts', icon: '🎙️' },
  { id: 'code', label: 'Code & Starter Kits', icon: '💻' },
  { id: 'deck', label: 'Slide Decks', icon: '📊' },
];

export const LearningHub: React.FC = () => {
  const [materials, setMaterials] = useState<LearningMaterial[]>(() => 
    getSavedMaterials(INITIAL_LEARNING_MATERIALS)
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedFormat, setSelectedFormat] = useState<string>('ALL');
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'title' | 'size'>('popular');

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [previewMaterial, setPreviewMaterial] = useState<LearningMaterial | null>(null);
  
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleUploadSuccess = (newMaterial: LearningMaterial) => {
    const updated = saveUploadedMaterial(newMaterial, materials);
    setMaterials(updated);
    showToast(`Successfully published "${newMaterial.title}" to the Learning Hub!`);
  };

  const handleDeleteMaterial = (id: string) => {
    const updated = deleteUploadedMaterial(id, materials);
    setMaterials(updated);
    showToast('Learning material deleted.');
  };

  const handleDownloadIncrement = (id: string) => {
    setMaterials(prev => prev.map(m => {
      if (m.id === id) {
        return { ...m, downloadCount: m.downloadCount + 1 };
      }
      return m;
    }));
    showToast('Download started! Check your device downloads folder.');
  };

  // Filter and sort
  const filteredMaterials = useMemo(() => {
    return materials.filter(m => {
      const authorStr = typeof m.author === 'string' ? m.author : m.authorDetails?.name || '';
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = m.title.toLowerCase().includes(q);
        const matchDesc = m.description.toLowerCase().includes(q);
        const matchAuthor = authorStr.toLowerCase().includes(q);
        const matchTags = m.tags.some(t => t.toLowerCase().includes(q));
        const matchCat = m.category.toLowerCase().includes(q);
        const matchFormat = m.fileFormat.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchAuthor && !matchTags && !matchCat && !matchFormat) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'ALL' && m.category !== selectedCategory) {
        return false;
      }

      // Format filter
      if (selectedFormat !== 'ALL' && m.fileType !== selectedFormat) {
        return false;
      }

      // Level filter
      if (selectedLevel !== 'ALL' && m.level !== selectedLevel) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'popular') {
        return b.downloadCount - a.downloadCount;
      }
      if (sortBy === 'newest') {
        const dateA = a.uploadDate || a.uploadedAt || '2026-01-01';
        const dateB = b.uploadDate || b.uploadedAt || '2026-01-01';
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'size') {
        return parseFloat(b.fileSize) - parseFloat(a.fileSize);
      }
      return 0;
    });
  }, [materials, searchQuery, selectedCategory, selectedFormat, selectedLevel, sortBy]);

  // Overall Stats
  const totalDownloads = useMemo(() => {
    return materials.reduce((acc, curr) => acc + curr.downloadCount, 0);
  }, [materials]);

  return (
    <section id="learning" className="py-24 bg-[#061226] border-b border-slate-800/80 relative overflow-hidden">
      
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-[#1557E8]/10 via-[#12D9F5]/10 to-[#19DDB5]/10 blur-[130px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-800 pb-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12D9F5]/10 border border-[#12D9F5]/30 text-[#12D9F5] font-['IBM_Plex_Mono'] text-xs font-semibold tracking-wider uppercase">
              <BookOpen className="w-3.5 h-3.5" /> OPEN KNOWLEDGE &amp; ENGINEERING ACADEMY
            </div>
            
            <h2 className="font-neo text-3xl sm:text-5xl font-bold tracking-tight text-white">
              THE ALGORITH LEARNING HUB
            </h2>
            
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-sans">
              Access and contribute peerless blueprints, e-books, system diagrams, masterclass audio/videos, and code toolkits spanning AI, Emerging Tech, Automation, and Systems Architecture. Free, instant <span className="text-[#12D9F5] font-semibold">1-click downloads</span> for every resource.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="btn-shimmer inline-flex items-center justify-center gap-2 bg-[#1557E8] hover:bg-[#168CFF] text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg shadow-blue-700/30 transition-all text-sm group"
            >
              <Upload className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              Upload Material
            </button>
            
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 bg-[#102544] hover:bg-[#16325B] text-slate-200 border border-slate-700/80 font-semibold px-5 py-3.5 rounded-xl text-sm hover:border-[#12D9F5] hover:text-[#12D9F5] transition-all"
            >
              Request Custom Blueprint →
            </a>
          </div>
        </div>

        {/* Stats Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#0B1930] border border-slate-800 rounded-xl p-4 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#12D9F5]/10 border border-[#12D9F5]/30 flex items-center justify-center text-xl">
              📚
            </div>
            <div>
              <div className="text-xl font-bold font-neo text-white">{materials.length} Resources</div>
              <div className="text-xs text-slate-400 font-mono">Ebooks, Videos, Audio &amp; Code</div>
            </div>
          </div>

          <div className="bg-[#0B1930] border border-slate-800 rounded-xl p-4 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#19DDB5]/10 border border-[#19DDB5]/30 flex items-center justify-center text-xl">
              ⚡
            </div>
            <div>
              <div className="text-xl font-bold font-neo text-[#19DDB5]">{totalDownloads.toLocaleString()}+</div>
              <div className="text-xs text-slate-400 font-mono">Total 1-Click Downloads</div>
            </div>
          </div>

          <div className="bg-[#0B1930] border border-slate-800 rounded-xl p-4 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-xl">
              🧠
            </div>
            <div>
              <div className="text-xl font-bold font-neo text-purple-300">8 Domains</div>
              <div className="text-xs text-slate-400 font-mono">AI, Agents, Data &amp; Webhooks</div>
            </div>
          </div>

          <div className="bg-[#0B1930] border border-slate-800 rounded-xl p-4 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-xl">
              🛡️
            </div>
            <div>
              <div className="text-xl font-bold font-neo text-amber-300">100% Free</div>
              <div className="text-xs text-slate-400 font-mono">Open Knowledge License</div>
            </div>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-[#0B1930] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl">
          
          {/* Search bar & Sort controls */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by topic, keyword, author, or file format (e.g. RAG, Autonomous, PNG, Python, Webhooks)..."
                className="w-full bg-[#061226] border border-slate-700/80 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#12D9F5] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Level & Sort select */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-[#061226] border border-slate-700/80 rounded-xl px-3 py-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs font-['IBM_Plex_Mono'] text-slate-400">Level:</span>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="bg-transparent text-xs font-['IBM_Plex_Mono'] text-white focus:outline-none cursor-pointer"
                >
                  <option value="ALL" className="bg-[#0B1930]">All Levels</option>
                  <option value="Beginner" className="bg-[#0B1930]">Beginner</option>
                  <option value="Intermediate" className="bg-[#0B1930]">Intermediate</option>
                  <option value="Advanced" className="bg-[#0B1930]">Advanced</option>
                  <option value="Executive" className="bg-[#0B1930]">Executive</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 bg-[#061226] border border-slate-700/80 rounded-xl px-3 py-1.5">
                <span className="text-xs font-['IBM_Plex_Mono'] text-slate-400">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-xs font-['IBM_Plex_Mono'] text-[#12D9F5] font-semibold focus:outline-none cursor-pointer"
                >
                  <option value="popular" className="bg-[#0B1930]">Most Popular</option>
                  <option value="newest" className="bg-[#0B1930]">Newest</option>
                  <option value="title" className="bg-[#0B1930]">Title A-Z</option>
                  <option value="size" className="bg-[#0B1930]">File Size</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="space-y-2">
            <div className="text-[11px] font-['IBM_Plex_Mono'] text-slate-400 uppercase tracking-wider">
              Filter by Knowledge Domain:
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {CATEGORY_TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-['IBM_Plex_Mono'] whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    selectedCategory === tab.id
                      ? 'bg-[#12D9F5] text-[#061226] font-bold shadow-lg shadow-cyan-500/20'
                      : 'bg-[#061226] text-slate-300 hover:text-white border border-slate-800 hover:border-slate-600'
                  }`}
                >
                  {tab.icon && <span>{tab.icon}</span>}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Format Tabs */}
          <div className="space-y-2 pt-1 border-t border-slate-800/80">
            <div className="text-[11px] font-['IBM_Plex_Mono'] text-slate-400 uppercase tracking-wider">
              Filter by Material Format:
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {FORMAT_TABS.map(fmt => (
                <button
                  key={fmt.id}
                  onClick={() => setSelectedFormat(fmt.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-['IBM_Plex_Mono'] whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    selectedFormat === fmt.id
                      ? 'bg-[#19DDB5] text-[#061226] font-bold shadow-lg shadow-emerald-500/20'
                      : 'bg-[#061226] text-slate-300 hover:text-white border border-slate-800 hover:border-slate-600'
                  }`}
                >
                  <span>{fmt.icon}</span>
                  <span>{fmt.label}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Results Count & Active Filter Reset */}
        <div className="flex items-center justify-between text-xs font-['IBM_Plex_Mono'] text-slate-400">
          <div>
            Showing <span className="text-white font-bold">{filteredMaterials.length}</span> of {materials.length} learning resources
          </div>

          {(searchQuery || selectedCategory !== 'ALL' || selectedFormat !== 'ALL' || selectedLevel !== 'ALL') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('ALL');
                setSelectedFormat('ALL');
                setSelectedLevel('ALL');
              }}
              className="text-[#12D9F5] hover:underline flex items-center gap-1"
            >
              Reset all filters <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Materials Grid */}
        {filteredMaterials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((mat) => (
              <LearningCard
                key={mat.id}
                material={mat}
                onPreview={(m) => setPreviewMaterial(m)}
                onDownloadIncrement={handleDownloadIncrement}
                onDelete={handleDeleteMaterial}
              />
            ))}
          </div>
        ) : (
          <div className="bg-[#0B1930] border border-slate-800 rounded-2xl p-12 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#102544] border border-slate-700 flex items-center justify-center text-2xl">
              🔍
            </div>
            <h3 className="font-neo text-xl font-bold text-white">No Learning Materials Found</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              No resources match your current query &quot;{searchQuery}&quot; or active filters. Try searching for broader terms or upload your own learning material.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('ALL');
                  setSelectedFormat('ALL');
                  setSelectedLevel('ALL');
                }}
                className="px-4 py-2 rounded-lg bg-[#102544] border border-slate-700 text-white text-xs font-semibold hover:border-[#12D9F5] transition-colors"
              >
                Clear All Filters
              </button>
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="btn-shimmer px-4 py-2 rounded-lg bg-[#1557E8] text-white text-xs font-semibold shadow-lg shadow-blue-700/30 transition-all"
              >
                Upload This Material
              </button>
            </div>
          </div>
        )}

        {/* Callout Bottom Card */}
        <div className="bg-gradient-to-r from-[#0B1930] via-[#102544] to-[#0B1930] border border-slate-700/80 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-neo text-xl sm:text-2xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <span>🚀</span> Have an AI Whitepaper, Video, or System Blueprint to Share?
            </h3>
            <p className="text-slate-300 text-sm max-w-2xl font-sans">
              Help engineers, founders, and students upskill in emerging technologies. Upload your documents, videos, diagrams, podcasts, or code starters for free community access.
            </p>
          </div>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="btn-shimmer inline-flex items-center gap-2 bg-[#12D9F5] hover:bg-[#19DDB5] text-[#061226] font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-cyan-500/20 transition-all text-sm shrink-0"
          >
            <Upload className="w-4 h-4" /> Upload Material Now
          </button>
        </div>

      </div>

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />

      {/* Preview Modal */}
      <PreviewModal
        material={previewMaterial}
        isOpen={!!previewMaterial}
        onClose={() => setPreviewMaterial(null)}
        onDownloadIncrement={handleDownloadIncrement}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B1930] border border-[#19DDB5] text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="w-5 h-5 text-[#19DDB5] shrink-0" />
          <span className="text-xs font-['IBM_Plex_Mono'] font-medium">{toastMessage}</span>
          <button 
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

    </section>
  );
};
