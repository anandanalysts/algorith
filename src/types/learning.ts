export type LearningFileType = 'ebook' | 'document' | 'image' | 'video' | 'audio' | 'code' | 'deck' | 'dataset';
export type MaterialType = LearningFileType;

export type LearningLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Executive';

export type LearningCategory = 
  | 'All'
  | 'AI & LLMs'
  | 'Artificial Intelligence'
  | 'Automation & Agents'
  | 'Autonomous Agents'
  | 'Automation & Workflows'
  | 'Prompt Engineering'
  | 'Emerging Tech'
  | 'Software Engineering'
  | 'Software Architecture'
  | 'Data & Analytics'
  | 'Data Science & Analytics'
  | 'Innovation & Strategy'
  | 'Robotics & IoT';

export type MaterialCategory = LearningCategory;

export interface LearningMaterial {
  id: string;
  title: string;
  description: string;
  fileType?: LearningFileType;
  type?: MaterialType;
  category: string;
  tags: string[];
  fileFormat: string; // e.g. 'PDF', 'DOCX', 'PNG', 'JPG', 'MP4', 'MP3', 'ZIP', 'PPTX'
  fileSize: string;
  downloadCount?: number;
  downloadsCount?: number;
  uploadDate?: string;
  uploadedAt?: string;
  author: string | {
    name: string;
    role?: string;
    avatar?: string;
  };
  authorDetails?: {
    name: string;
    role?: string;
    avatar?: string;
  };
  level?: LearningLevel;
  previewContent?: string;
  fileContent?: string;
  mediaUrl?: string;
  fileUrl?: string;
  downloadFileName?: string;
  thumbnailUrl?: string;
  duration?: string;
  pageCount?: number;
  isFeatured?: boolean;
  isUserUploaded?: boolean;
}
