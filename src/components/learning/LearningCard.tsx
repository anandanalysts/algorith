import React, { useState } from 'react';
import { Download, Eye, Check, User, Trash2, Sparkles } from 'lucide-react';
import { LearningMaterial } from '../../types/learning';
import { triggerOneClickDownload } from '../../utils/downloadHelper';

interface LearningCardProps {
  material: LearningMaterial;
  onPreview: (material: LearningMaterial) => void;
  onDownloadIncrement: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const LearningCard: React.FC<LearningCardProps> = ({
  material,
  onPreview,
  onDownloadIncrement,
  onDelete
}) => {
  const [downloaded, setDownloaded] = useState(false);

  const handleSpotlightMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerOneClickDownload(material);
    onDownloadIncrement(material.id);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  const getFormatIcon = () => {
    switch (material.fileType) {
      case 'ebook': return '📚';
      case 'document': return '📄';
      case 'image': return '🖼️';
      case 'video': return '🎥';
      case 'audio': return '🎙️';
      case 'code': return '💻';
      case 'deck': return '📊';
      default: return '📁';
    }
  };

  const getLevelBadgeColor = () => {
    switch (material.level) {
      case 'Beginner': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'Intermediate': return 'text-[#12D9F5] bg-[#12D9F5]/10 border-[#12D9F5]/30';
      case 'Advanced': return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
      case 'Executive': return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      default: return 'text-slate-400 bg-slate-800 border-slate-700';
    }
  };

  const authorDisplay = typeof material.author === 'string' ? material.author : material.authorDetails?.name || 'ALGorith Tech';

  return (
    <div
      onMouseMove={handleSpotlightMouseMove}
      onClick={() => onPreview(material)}
      className="spotlight-card bg-[#0B1930] border border-slate-800 hover:border-[#12D9F5] rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group relative cursor-pointer shadow-lg hover:shadow-cyan-500/10"
    >
      <div className="space-y-3.5 relative z-10">
        
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xl" role="img" aria-label={material.fileType}>
              {getFormatIcon()}
            </span>
            <span className="text-[10px] font-['IBM_Plex_Mono'] font-semibold text-[#12D9F5] uppercase tracking-wider bg-[#12D9F5]/10 border border-[#12D9F5]/30 px-2.5 py-0.5 rounded">
              {material.category}
            </span>
            {material.isFeatured && (
              <span className="text-[10px] font-['IBM_Plex_Mono'] text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> Featured
              </span>
            )}
            {material.isUserUploaded && (
              <span className="text-[10px] font-['IBM_Plex_Mono'] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
                Community Upload
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <span className={`text-[10px] font-['IBM_Plex_Mono'] border px-2 py-0.5 rounded font-medium ${getLevelBadgeColor()}`}>
              {material.level}
            </span>
            {material.isUserUploaded && onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(material.id);
                }}
                className="text-slate-500 hover:text-rose-400 p-1 rounded transition-colors"
                title="Delete uploaded material"
                aria-label="Delete uploaded material"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-neo text-lg font-bold text-white group-hover:text-[#12D9F5] transition-colors leading-snug line-clamp-2">
          {material.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 font-sans">
          {material.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 pt-1">
          {material.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-[10px] font-['IBM_Plex_Mono'] text-slate-400 bg-[#061226] border border-slate-800 px-2 py-0.5 rounded">
              #{tag}
            </span>
          ))}
          {material.tags.length > 3 && (
            <span className="text-[10px] font-['IBM_Plex_Mono'] text-slate-400 px-1 py-0.5">
              +{material.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Footer Info & Actions */}
      <div className="mt-5 pt-4 border-t border-slate-800/80 relative z-10 space-y-3">
        <div className="flex items-center justify-between text-[11px] font-['IBM_Plex_Mono'] text-slate-400">
          <div className="flex items-center gap-1.5 line-clamp-1">
            <User className="w-3 h-3 text-[#19DDB5]" />
            <span className="truncate max-w-[120px]">{authorDisplay}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-300 font-medium">{material.fileFormat} • {material.fileSize}</span>
            <span>•</span>
            <span className="text-[#12D9F5]">{material.downloadCount.toLocaleString()} dl</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPreview(material);
            }}
            className="inline-flex items-center justify-center gap-1.5 bg-[#102544] hover:bg-[#16325B] text-slate-200 hover:text-white border border-slate-700/80 rounded-lg py-2 px-3 text-xs font-semibold transition-all"
          >
            <Eye className="w-3.5 h-3.5 text-[#12D9F5]" />
            Preview
          </button>

          <button
            onClick={handleDownload}
            className={`btn-shimmer inline-flex items-center justify-center gap-1.5 rounded-lg py-2 px-3 text-xs font-semibold text-white shadow-md transition-all ${
              downloaded
                ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-700/20'
                : 'bg-[#1557E8] hover:bg-[#168CFF] shadow-blue-700/20'
            }`}
          >
            {downloaded ? (
              <>
                <Check className="w-3.5 h-3.5" /> Downloaded
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" /> 1-Click
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
