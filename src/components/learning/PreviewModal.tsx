import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Check, 
  Copy, 
  Share2, 
  BookOpen, 
  FileText, 
  Image as ImageIcon, 
  Video, 
  Music, 
  Code, 
  Calendar, 
  User, 
  Layers, 
  Sparkles,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { LearningMaterial } from '../../types/learning';
import { triggerOneClickDownload } from '../../utils/downloadHelper';

interface PreviewModalProps {
  material: LearningMaterial | null;
  isOpen: boolean;
  onClose: () => void;
  onDownloadIncrement: (id: string) => void;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
  material,
  isOpen,
  onClose,
  onDownloadIncrement,
}) => {
  const [downloaded, setDownloaded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen || !material) return null;

  const handleDownload = () => {
    triggerOneClickDownload(material);
    onDownloadIncrement(material.id);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/#learning`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCode = () => {
    const content = material.previewContent || material.fileContent || '';
    navigator.clipboard.writeText(content);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const renderMediaOrContent = () => {
    if (material.fileType === 'image') {
      return (
        <div className="bg-[#061226] border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center min-h-[280px]">
          {material.thumbnailUrl ? (
            <img
              src={material.thumbnailUrl}
              alt={material.title}
              className="max-h-[380px] w-auto rounded-lg object-contain border border-slate-700 shadow-xl"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="text-slate-400 font-mono text-xs text-center p-8">
              [Architecture Diagram Preview Ready for High-Res Vector Download]
            </div>
          )}
          <div className="mt-3 text-xs text-slate-400 font-mono text-center">
            Click &quot;1-Click Download&quot; below to receive the high-resolution {material.fileFormat} schematic file.
          </div>
        </div>
      );
    }

    if (material.fileType === 'video') {
      return (
        <div className="bg-[#061226] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <div className="relative aspect-video bg-slate-900 flex items-center justify-center">
            {material.thumbnailUrl ? (
              <img
                src={material.thumbnailUrl}
                alt={material.title}
                className="w-full h-full object-cover opacity-60"
                referrerPolicy="no-referrer"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-[#061226] via-transparent to-transparent" />
            <div className="absolute z-10 flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full bg-[#1557E8]/80 hover:bg-[#12D9F5] text-white hover:text-[#061226] border border-white/20 flex items-center justify-center shadow-2xl transition-all cursor-pointer">
                <Video className="w-6 h-6 ml-0.5" />
              </div>
              <span className="text-xs font-['IBM_Plex_Mono'] font-bold text-white bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm">
                {material.duration || '45 mins Masterclass'}
              </span>
            </div>
          </div>
          {material.previewContent && (
            <div className="p-4 border-t border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed max-h-[160px] overflow-y-auto">
              {material.previewContent}
            </div>
          )}
        </div>
      );
    }

    if (material.fileType === 'audio') {
      return (
        <div className="bg-[#061226] border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#1557E8] to-[#12D9F5] flex items-center justify-center text-white shadow-lg shrink-0">
              <Music className="w-8 h-8" />
            </div>
            <div>
              <div className="text-xs font-['IBM_Plex_Mono'] text-[#12D9F5] uppercase tracking-wider font-semibold">
                Audio Technical Masterclass
              </div>
              <div className="text-base font-bold text-white font-neo">
                {material.title}
              </div>
              <div className="text-xs text-slate-400 font-mono mt-1">
                Format: {material.fileFormat} • Duration: {material.duration || '30 mins'} • Size: {material.fileSize}
              </div>
            </div>
          </div>
          {material.previewContent && (
            <div className="bg-[#0B1930] border border-slate-800 rounded-lg p-4 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed max-h-[180px] overflow-y-auto">
              {material.previewContent}
            </div>
          )}
        </div>
      );
    }

    // Default: Document / Code / E-Book Preview
    return (
      <div className="relative bg-[#061226] border border-slate-800 rounded-xl p-5 max-h-[340px] overflow-y-auto">
        <div className="flex justify-between items-center pb-3 mb-3 border-b border-slate-800 text-xs font-['IBM_Plex_Mono'] text-slate-400">
          <span>Format: {material.fileFormat} Spec Preview</span>
          <button
            onClick={handleCopyCode}
            className="text-slate-300 hover:text-[#12D9F5] flex items-center gap-1 transition-colors"
          >
            {copiedCode ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> Copy Raw
              </>
            )}
          </button>
        </div>
        <pre className="font-['IBM_Plex_Mono'] text-xs text-slate-300 whitespace-pre-wrap leading-relaxed font-normal">
          {material.previewContent || material.fileContent || material.description}
        </pre>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#061226]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative z-10 bg-[#0B1930] border border-[#12D9F5]/40 rounded-2xl w-full max-w-3xl shadow-2xl p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto text-white">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-['IBM_Plex_Mono'] font-bold text-[#12D9F5] uppercase tracking-wider bg-[#12D9F5]/10 border border-[#12D9F5]/30 px-2.5 py-0.5 rounded">
                {material.category}
              </span>
              <span className="text-xs font-['IBM_Plex_Mono'] text-slate-300 bg-[#061226] border border-slate-700 px-2 py-0.5 rounded">
                {material.fileFormat} • {material.fileSize}
              </span>
              <span className="text-xs font-['IBM_Plex_Mono'] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
                Level: {material.level}
              </span>
              {material.isFeatured && (
                <span className="text-xs font-['IBM_Plex_Mono'] text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Featured Resource
                </span>
              )}
            </div>

            <h2 className="font-neo text-2xl sm:text-3xl font-bold text-white leading-snug">
              {material.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors shrink-0"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Description */}
        <p className="text-slate-300 text-sm leading-relaxed font-sans">
          {material.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {material.tags.map(tag => (
            <span key={tag} className="text-xs font-['IBM_Plex_Mono'] text-[#12D9F5] bg-[#061226] border border-slate-800 px-2.5 py-1 rounded">
              #{tag}
            </span>
          ))}
        </div>

        {/* Content / Media Viewer */}
        <div className="space-y-2">
          <div className="text-xs font-['IBM_Plex_Mono'] text-slate-400 uppercase tracking-wider">
            Material Content Preview:
          </div>
          {renderMediaOrContent()}
        </div>

        {/* Metadata Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#061226] border border-slate-800/80 rounded-xl p-4 text-xs font-['IBM_Plex_Mono'] text-slate-400">
          <div>
            <span className="block text-slate-500 text-[10px] uppercase">Author</span>
            <span className="text-white font-medium truncate block">
              {typeof material.author === 'string' ? material.author : material.authorDetails?.name || 'ALGorith Engineering'}
            </span>
          </div>
          <div>
            <span className="block text-slate-500 text-[10px] uppercase">Published</span>
            <span className="text-white font-medium block">
              {material.uploadDate || material.uploadedAt || '2026'}
            </span>
          </div>
          <div>
            <span className="block text-slate-500 text-[10px] uppercase">Downloads</span>
            <span className="text-[#19DDB5] font-bold block">
              {material.downloadCount.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="block text-slate-500 text-[10px] uppercase">License</span>
            <span className="text-slate-300 font-medium block">
              Free Open Access
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopyLink}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-700 bg-[#061226] hover:bg-[#102544] text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" /> Link Copied
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-[#12D9F5]" /> Share Link
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
            >
              Close
            </button>

            <button
              onClick={handleDownload}
              className={`btn-shimmer w-full sm:w-auto inline-flex items-center justify-center gap-2 font-bold px-7 py-2.5 rounded-xl shadow-lg transition-all text-xs text-white ${
                downloaded
                  ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-700/30'
                  : 'bg-[#1557E8] hover:bg-[#168CFF] shadow-blue-700/30'
              }`}
            >
              {downloaded ? (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Download Complete!
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" /> 1-Click Download ({material.fileFormat})
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
