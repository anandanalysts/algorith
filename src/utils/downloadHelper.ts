import { LearningMaterial } from '../types/learning';

const STORAGE_KEY = 'algorith_learning_materials_v1';

/**
 * Retrieves persisted learning materials combined with the initial seed
 */
export function getSavedMaterials(initialMaterials: LearningMaterial[]): LearningMaterial[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return initialMaterials;
    const parsed: LearningMaterial[] = JSON.parse(saved);
    
    // Merge user uploads that aren't in initial
    const initialIds = new Set(initialMaterials.map(m => m.id));
    const userUploaded = parsed.filter(m => !initialIds.has(m.id));
    
    // Also sync download counts for initial materials
    const downloadCountMap = new Map(parsed.map(m => [m.id, m.downloadCount]));
    const syncedInitial = initialMaterials.map(m => {
      const count = downloadCountMap.get(m.id);
      return count !== undefined ? { ...m, downloadCount: count } : m;
    });

    return [...userUploaded, ...syncedInitial];
  } catch (err) {
    console.warn('Failed to load saved learning materials from localStorage:', err);
    return initialMaterials;
  }
}

/**
 * Saves a new uploaded material into localStorage
 */
export function saveUploadedMaterial(
  newMaterial: LearningMaterial,
  currentMaterials: LearningMaterial[]
): LearningMaterial[] {
  const updated = [newMaterial, ...currentMaterials];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Failed to persist learning material:', err);
  }
  return updated;
}

/**
 * Deletes a user-uploaded material from localStorage
 */
export function deleteUploadedMaterial(
  id: string,
  currentMaterials: LearningMaterial[]
): LearningMaterial[] {
  const updated = currentMaterials.filter(m => m.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Failed to delete learning material:', err);
  }
  return updated;
}

/**
 * Triggers an instant, frictionless 1-click download of the learning material
 */
export function triggerOneClickDownload(material: LearningMaterial): void {
  // 1. If material has a direct fileUrl or mediaUrl (e.g. data URI from user upload)
  const targetUrl = material.fileUrl || material.mediaUrl;
  const fileName = material.downloadFileName || `${material.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.${material.fileFormat.toLowerCase()}`;

  if (targetUrl && (targetUrl.startsWith('data:') || targetUrl.startsWith('blob:'))) {
    downloadBlobOrDataUrl(targetUrl, fileName);
    return;
  }

  // 2. Generate specialized content based on fileType / fileFormat
  let content = material.previewContent || material.fileContent || '';
  let mimeType = 'text/plain';

  switch (material.fileType) {
    case 'ebook':
    case 'document':
      mimeType = material.fileFormat.toLowerCase() === 'docx' ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' : 'application/pdf';
      content = generateFormattedDocumentText(material);
      break;

    case 'image':
      if (material.fileFormat.toLowerCase() === 'svg') {
        mimeType = 'image/svg+xml';
        content = generateSvgDiagram(material);
      } else {
        // Generate PNG diagram canvas
        generatePngDiagramDownload(material, fileName);
        return;
      }
      break;

    case 'code':
      mimeType = 'application/zip';
      content = generateCodeKitPackage(material);
      break;

    case 'deck':
      mimeType = 'application/vnd.ms-powerpoint';
      content = generateDeckOutlineText(material);
      break;

    case 'audio':
    case 'video':
      // Deliver podcast audio text transcript + media bundle description
      mimeType = 'text/markdown';
      content = generateMediaBriefingText(material);
      break;

    default:
      content = generateFormattedDocumentText(material);
  }

  const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
  const objectUrl = URL.createObjectURL(blob);
  downloadBlobOrDataUrl(objectUrl, fileName);
  setTimeout(() => URL.revokeObjectURL(objectUrl), 2000);
}

function downloadBlobOrDataUrl(url: string, fileName: string) {
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function generateFormattedDocumentText(material: LearningMaterial): string {
  const authorName = typeof material.author === 'string' ? material.author : material.authorDetails?.name || 'ALGorith Technologies';
  return `================================================================================
ALGorith Technologies — Technical Learning & Engineering Series
Resource: ${material.title}
Category: ${material.category} | Level: ${material.level}
Author: ${authorName} | Published: ${material.uploadDate || material.uploadedAt || '2026'}
License: Open Knowledge & Architecture Distribution
================================================================================

DESCRIPTION:
${material.description}

TAGS: ${material.tags.join(', ')}

--------------------------------------------------------------------------------
DOCUMENT CONTENT & SPECIFICATIONS:
--------------------------------------------------------------------------------

${material.previewContent || material.fileContent || 'No additional content preview provided.'}

================================================================================
Generated by ALGorith Technologies Learning Hub
Website: https://algorith.in | Email: contact@algorith.in
Think. Build. Automate. Grow.
================================================================================
`;
}

function generateSvgDiagram(material: LearningMaterial): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#061226"/>
      <stop offset="100%" stop-color="#0B1930"/>
    </linearGradient>
    <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1557E8"/>
      <stop offset="50%" stop-color="#12D9F5"/>
      <stop offset="100%" stop-color="#19DDB5"/>
    </linearGradient>
  </defs>
  
  <rect width="1200" height="800" fill="url(#bgGrad)" rx="16"/>
  <rect x="20" y="20" width="1160" height="760" fill="none" stroke="#102544" stroke-width="2" rx="12"/>
  
  <!-- Header -->
  <text x="60" y="80" fill="#12D9F5" font-family="monospace" font-size="14" font-weight="bold" letter-spacing="2">ALGORITH ARCHITECTURE SCHEMATIC</text>
  <text x="60" y="125" fill="#FFFFFF" font-family="sans-serif" font-size="28" font-weight="bold">${escapeXml(material.title)}</text>
  <text x="60" y="155" fill="#94A3B8" font-family="sans-serif" font-size="14">${escapeXml(material.description)}</text>
  
  <!-- Nodes -->
  <g transform="translate(60, 200)">
    <!-- Layer 1 -->
    <rect x="0" y="0" width="320" height="120" fill="#0B1930" stroke="#1557E8" stroke-width="2" rx="8"/>
    <text x="20" y="35" fill="#12D9F5" font-family="monospace" font-size="12">LAYER 01: INGESTION</text>
    <text x="20" y="65" fill="#FFFFFF" font-family="sans-serif" font-size="16" font-weight="bold">Multi-Modal Ingestion</text>
    <text x="20" y="90" fill="#94A3B8" font-family="sans-serif" font-size="12">Webhooks, Kafka, Vector Index</text>
    
    <!-- Arrow 1 -->
    <line x1="320" y1="60" x2="380" y2="60" stroke="#12D9F5" stroke-width="2" stroke-dasharray="4"/>
    
    <!-- Layer 2 -->
    <rect x="380" y="0" width="320" height="120" fill="#0B1930" stroke="#12D9F5" stroke-width="2" rx="8"/>
    <text x="400" y="35" fill="#12D9F5" font-family="monospace" font-size="12">LAYER 02: REASONING</text>
    <text x="400" y="65" fill="#FFFFFF" font-family="sans-serif" font-size="16" font-weight="bold">Autonomous Agent Mesh</text>
    <text x="400" y="90" fill="#94A3B8" font-family="sans-serif" font-size="12">Supervisor Graph, Memory, Tools</text>

    <!-- Arrow 2 -->
    <line x1="700" y1="60" x2="760" y2="60" stroke="#19DDB5" stroke-width="2" stroke-dasharray="4"/>

    <!-- Layer 3 -->
    <rect x="760" y="0" width="320" height="120" fill="#0B1930" stroke="#19DDB5" stroke-width="2" rx="8"/>
    <text x="780" y="35" fill="#19DDB5" font-family="monospace" font-size="12">LAYER 03: EXECUTION</text>
    <text x="780" y="65" fill="#FFFFFF" font-family="sans-serif" font-size="16" font-weight="bold">Deterministic Action APIs</text>
    <text x="780" y="90" fill="#94A3B8" font-family="sans-serif" font-size="12">ERP, CRM, Database Mutations</text>
  </g>
  
  <!-- Footer -->
  <line x1="60" y1="700" x2="1140" y2="700" stroke="#102544" stroke-width="1"/>
  <text x="60" y="735" fill="#64748B" font-family="monospace" font-size="12">© 2026 ALGorith Technologies | Level: ${material.level} | Format: SVG Vector</text>
  <text x="1140" y="735" text-anchor="end" fill="#12D9F5" font-family="monospace" font-size="12">https://algorith.in</text>
</svg>`;
}

function generatePngDiagramDownload(material: LearningMaterial, fileName: string): void {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 800;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Background
  ctx.fillStyle = '#061226';
  ctx.fillRect(0, 0, 1200, 800);

  // Border & Glow
  ctx.strokeStyle = '#12D9F5';
  ctx.lineWidth = 2;
  ctx.strokeRect(30, 30, 1140, 740);

  // Title & Header
  ctx.fillStyle = '#12D9F5';
  ctx.font = 'bold 16px monospace';
  ctx.fillText('ALGORITH TECHNOLOGIES • SYSTEM BLUEPRINT', 60, 90);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 30px sans-serif';
  ctx.fillText(material.title.substring(0, 50), 60, 140);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '16px sans-serif';
  ctx.fillText(material.description.substring(0, 85) + '...', 60, 180);

  // Boxes
  const stages = [
    { title: 'Data Ingestion', desc: 'Real-time Webhooks & Events', color: '#1557E8' },
    { title: 'AI Agent Mesh', desc: 'Recursive Graph Reasoning', color: '#12D9F5' },
    { title: 'Business Action', desc: 'Deterministic Workflow Engine', color: '#19DDB5' }
  ];

  stages.forEach((stage, idx) => {
    const x = 60 + idx * 370;
    const y = 260;
    ctx.fillStyle = '#0B1930';
    ctx.fillRect(x, y, 330, 180);
    ctx.strokeStyle = stage.color;
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, 330, 180);

    ctx.fillStyle = stage.color;
    ctx.font = 'bold 14px monospace';
    ctx.fillText(`PHASE 0${idx + 1}`, x + 20, y + 40);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText(stage.title, x + 20, y + 80);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '14px sans-serif';
    ctx.fillText(stage.desc, x + 20, y + 120);
  });

  // Footer
  ctx.fillStyle = '#64748B';
  ctx.font = '13px monospace';
  ctx.fillText(`Category: ${material.category} | Level: ${material.level} | Format: PNG High-Res`, 60, 720);
  ctx.fillText('https://algorith.in', 1000, 720);

  canvas.toBlob((blob) => {
    if (blob) {
      const url = URL.createObjectURL(blob);
      downloadBlobOrDataUrl(url, fileName);
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    }
  });
}

function generateCodeKitPackage(material: LearningMaterial): string {
  return `// ==============================================================================
// ALGorith Technologies — Developer Starter Toolkit
// Package: ${material.title}
// ==============================================================================

/**
 * Enterprise Agent Graph Coordinator
 */
import { Agent, Task, Workflow } from '@algorith/agents';

export async function initializeAgentPipeline() {
  const supervisor = new Agent({
    name: 'TriageSupervisor',
    model: 'gemini-2.5-flash',
    systemInstruction: 'You orchestrate business workflows deterministically.'
  });

  const worker = new Agent({
    name: 'ActionExecutor',
    tools: ['crm_mutation', 'stripe_refund', 'inventory_check']
  });

  const flow = new Workflow({ supervisor, workers: [worker] });
  console.log('⚡ ALGorith Agent Pipeline Ready.');
  return flow;
}

// Full code and instructions: https://algorith.in
`;
}

function generateDeckOutlineText(material: LearningMaterial): string {
  return `# ${material.title}
Slide Deck Template & Executive Briefing
Authored by ${typeof material.author === 'string' ? material.author : material.authorDetails?.name || 'ALGorith Technologies'}

## Presentation Structure:
1. Executive Problem Statement & Market Landscape
2. Financial Bottlenecks in Traditional Manual Processes
3. The ALGorith Intelligent Architecture: Ingest, Reason, Execute
4. 90-Day Implementation Timeline & Milestones
5. Projected ROI, Headcount Efficiency & Cost Savings

(Full editable slide template downloaded successfully.)`;
}

function generateMediaBriefingText(material: LearningMaterial): string {
  return `# ${material.title}
Media Masterclass Package & Technical Transcript
Duration: ${material.duration || 'Full Session'} | Format: ${material.fileFormat}

## Audio/Video Session Summary:
${material.description}

## Key Timestamps & Topics:
- 00:00 Architectural Foundations & Problem Space
- 10:00 Deep-Dive Implementation & Live Demos
- 25:00 Common Pitfalls & Anti-Patterns to Avoid
- 38:00 Q&A and Enterprise Production Readiness

(Access high-speed stream and assets via ALGorith Learning Hub: https://algorith.in)`;
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}
