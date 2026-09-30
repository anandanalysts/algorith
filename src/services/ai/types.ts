/**
 * Production-Safe AI Provider Types & Interfaces
 */

export type FallbackCategory =
  | 'COMPANY'
  | 'PRODUCTS'
  | 'SOLUTIONS'
  | 'TECHNOLOGY'
  | 'CONTACT'
  | 'UNKNOWN';

export interface ChatMessage {
  id: string;
  sender: 'agent' | 'user' | 'system';
  text: string;
  timestamp: string;
  category?: FallbackCategory | 'general' | 'project';
  isFallback?: boolean;
  suggestedFollowUps?: string[];
  actionLink?: {
    label: string;
    view: 'products' | 'solutions' | 'technology' | 'about' | 'contact';
  };
}

export interface AIRequest {
  query: string;
  history?: Array<{ sender: 'user' | 'agent' | 'system'; text: string }>;
  requestId: string;
  timestamp: number;
}

export interface AIResponse {
  message: string;
  category: FallbackCategory;
  provider: 'gemini' | 'fallback' | 'rate_limit';
  isFallback: boolean;
  confidence: number;
  suggestedFollowUps: string[];
  actionLink?: {
    label: string;
    view: 'products' | 'solutions' | 'technology' | 'about' | 'contact';
  };
  requestId: string;
  latencyMs?: number;
}

export interface AIProvider {
  name: string;
  generateResponse(request: AIRequest): Promise<AIResponse>;
}

export type CircuitBreakerState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

export interface ValidationResult<T> {
  isValid: boolean;
  data?: T;
  error?: string;
}
