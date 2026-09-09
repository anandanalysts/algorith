import React, { useState, useRef } from 'react';
import { X, Upload, FileText, Image as ImageIcon, Video, Music, Code, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import { LearningCategory, LearningFileType, LearningLevel, LearningMaterial } from '../../types/learning';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (material: LearningMaterial) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onUploadSuccess,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<string>('AI & LLMs');
  const [fileType, setFileType] = useState<LearningFileType>('ebook');
  const [level, setLevel] = useState<LearningLevel>('Intermediate');
  const [authorName, setAuthorName] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [previewContent, setPreviewContent] = useState('');

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileDataUrl, setFileDataUrl] = useState<string>('');
  const [dragActive, setDragActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    setSelectedFile(file);
    setErrorMsg(null);

    // Auto-detect format & type
    const ext = file.name.split('.').pop()?.toUpperCase() || 'FILE';
    
    if (['PDF', 'EPUB'].includes(ext)) {
      setFileType('ebook');
    } else if (['DOC', 'DOCX', 'TXT', 'MD'].includes(ext)) {
      setFileType('document');
    } else if (['JPG', 'JPEG', 'PNG', 'WEBP', 'SVG'].includes(ext)) {
      setFileType('image');
    } else if (['MP4', 'MOV', 'WEBM', 'MKV'].includes(ext)) {
      setFileType('video');
    } else if (['MP3', 'WAV', 'AAC', 'M4A'].includes(ext)) {
      setFileType('audio');
    } else if (['ZIP', 'TAR', 'GZ', 'PY', 'TS', 'JS'].includes(ext)) {
      setFileType('code');
    } else if (['PPT', 'PPTX', 'KEY'].includes(ext)) {
      setFileType('deck');
    }

    if (!title) {
      // Clean title from filename
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      setTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
    }

    // Read as Data URL or Text
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setFileDataUrl(result);
    };
    reader.readAsDataURL(file);

    // If text or markdown, also extract text preview
    if (file.type.startsWith('text/') || file.name.endsWith('.md') || file.name.endsWith('.txt')) {
      const textReader = new FileReader();
      textReader.onload = (event) => {
        setPreviewContent(event.target?.result as string || '');
      };
      textReader.readAsText(file);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Please enter a title for the learning resource.');
      return;
    }
    if (!description.trim()) {
      setErrorMsg('Please enter a short description.');
      return;
    }

    setIsUploading(true);

    const ext = selectedFile ? selectedFile.name.split('.').pop()?.toUpperCase() || 'PDF' : 'PDF';
    const tags = tagsInput
      ? tagsInput.split(',').map(t => t.trim()).filter(Boolean)
      : [category, fileType.toUpperCase(), 'AI'];

    const newMaterial: LearningMaterial = {
      id: `upload-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      fileType: fileType,
      type: fileType,
      category: category,
      tags: tags,
      fileFormat: ext,
      fileSize: selectedFile ? formatFileSize(selectedFile.size) : '2.5 MB',
      downloadCount: 1,
      downloadsCount: 1,
      uploadDate: new Date().toISOString().split('T')[0],
      uploadedAt: new Date().toISOString().split('T')[0],
      author: authorName.trim() || 'Community Contributor',
      authorDetails: {
        name: authorName.trim() || 'Community Contributor',
        role: 'Community Engineer',
      },
      level: level,
      previewContent: previewContent.trim() || `# ${title}\n\n${description}`,
      fileContent: previewContent.trim() || `# ${title}\n\n${description}`,
      fileUrl: fileDataUrl || undefined,
      mediaUrl: fileDataUrl || undefined,
      downloadFileName: selectedFile?.name || `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.${ext.toLowerCase()}`,
      thumbnailUrl: fileType === 'image' && fileDataUrl ? fileDataUrl : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      isUserUploaded: true,
      isFeatured: false,
    };

    setTimeout(() => {
      setIsUploading(false);
      onUploadSuccess(newMaterial);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#061226]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative z-10 bg-[#0B1930] border border-[#12D9F5]/40 rounded-2xl w-full max-w-2xl shadow-2xl p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#1557E8]/20 border border-[#12D9F5]/40 flex items-center justify-center text-[#12D9F5]">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-neo text-xl font-bold text-white">
                Upload Learning Material
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Share e-books, documents, diagrams, videos, podcasts &amp; code
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs px-4 py-3 rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Drag and Drop Zone */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
              dragActive 
                ? 'border-[#12D9F5] bg-[#12D9F5]/10' 
                : selectedFile 
                  ? 'border-[#19DDB5] bg-[#19DDB5]/5' 
                  : 'border-slate-700 hover:border-slate-500 bg-[#061226]'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              className="hidden"
              accept=".pdf,.epub,.doc,.docx,.txt,.md,.png,.jpg,.jpeg,.svg,.webp,.mp4,.mov,.webm,.mp3,.wav,.zip,.tar,.gz,.pptx,.ppt,.json"
            />

            {selectedFile ? (
              <div className="flex flex-col items-center gap-2">
                <CheckCircle className="w-8 h-8 text-[#19DDB5]" />
                <div className="text-sm font-semibold text-white">{selectedFile.name}</div>
                <div className="text-xs text-slate-400 font-mono">
                  {formatFileSize(selectedFile.size)} • Click or drop another file to replace
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-[#102544] flex items-center justify-center text-slate-300 mb-1">
                  <Upload className="w-6 h-6 text-[#12D9F5]" />
                </div>
                <div className="text-sm font-semibold text-white">
                  Drag &amp; drop any file here, or <span className="text-[#12D9F5] underline">browse</span>
                </div>
                <p className="text-xs text-slate-400 max-w-sm">
                  Supports PDF, DOCX, PNG/JPG diagrams, MP4 videos, MP3 audio, ZIP code starters, and PPTX slide decks.
                </p>
              </div>
            )}
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-['IBM_Plex_Mono'] text-slate-300 font-semibold uppercase tracking-wider">
              Title <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Enterprise Agent Architecture Blueprint 2026"
              className="w-full bg-[#061226] border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#12D9F5] transition-colors"
            />
          </div>

          {/* Category & Format Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-['IBM_Plex_Mono'] text-slate-300 font-semibold uppercase tracking-wider">
                Domain / Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#061226] border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#12D9F5] transition-colors cursor-pointer"
              >
                <option value="AI & LLMs">AI &amp; LLMs</option>
                <option value="Automation & Agents">Automation &amp; Agents</option>
                <option value="Prompt Engineering">Prompt Engineering</option>
                <option value="Emerging Tech">Emerging Tech</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="Data & Analytics">Data &amp; Analytics</option>
                <option value="Innovation & Strategy">Innovation &amp; Strategy</option>
                <option value="Robotics & IoT">Robotics &amp; IoT</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-['IBM_Plex_Mono'] text-slate-300 font-semibold uppercase tracking-wider">
                Material Format Type
              </label>
              <select
                value={fileType}
                onChange={(e) => setFileType(e.target.value as LearningFileType)}
                className="w-full bg-[#061226] border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#12D9F5] transition-colors cursor-pointer"
              >
                <option value="ebook">📚 E-Book / Guide (PDF/EPUB)</option>
                <option value="document">📄 Technical Document / Spec</option>
                <option value="image">🖼️ Architecture Diagram (PNG/JPG/SVG)</option>
                <option value="video">🎥 Masterclass Video (MP4)</option>
                <option value="audio">🎙️ Audio / Podcast (MP3)</option>
                <option value="code">💻 Code Starter / Toolkit (ZIP)</option>
                <option value="deck">📊 Presentation / Deck (PPTX)</option>
              </select>
            </div>
          </div>

          {/* Level & Author Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-['IBM_Plex_Mono'] text-slate-300 font-semibold uppercase tracking-wider">
                Complexity / Level
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as LearningLevel)}
                className="w-full bg-[#061226] border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#12D9F5] transition-colors cursor-pointer"
              >
                <option value="Beginner">Beginner (Foundational)</option>
                <option value="Intermediate">Intermediate (Practitioner)</option>
                <option value="Advanced">Advanced (Architect / SRE)</option>
                <option value="Executive">Executive (C-Suite / Founder)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-['IBM_Plex_Mono'] text-slate-300 font-semibold uppercase tracking-wider">
                Author / Contributor
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g., Alex Chen, Lead AI Researcher"
                className="w-full bg-[#061226] border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#12D9F5] transition-colors"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-['IBM_Plex_Mono'] text-slate-300 font-semibold uppercase tracking-wider">
              Summary Description <span className="text-rose-400">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain the key takeaways, system architecture, or concepts covered in this material..."
              className="w-full bg-[#061226] border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#12D9F5] transition-colors"
            />
          </div>

          {/* Tags */}
          <div className="space-y-1.5">
            <label className="text-xs font-['IBM_Plex_Mono'] text-slate-300 font-semibold uppercase tracking-wider">
              Tags (Comma separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g., RAG, VectorDB, LangGraph, Python, Webhooks"
              className="w-full bg-[#061226] border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#12D9F5] transition-colors"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="btn-shimmer inline-flex items-center gap-2 bg-[#1557E8] hover:bg-[#168CFF] text-white text-xs font-semibold px-6 py-2.5 rounded-xl shadow-lg shadow-blue-700/30 transition-all disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              {isUploading ? 'Publishing...' : 'Publish to Learning Hub'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
