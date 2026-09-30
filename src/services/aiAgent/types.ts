export type AIResponseMode =
  | "ai"
  | "fallback"
  | "error";

export type AIResponseCategory =
  | "company"
  | "product"
  | "solution"
  | "technology"
  | "contact"
  | "general"
  | "unknown";

export interface AIResponse {
  id: string;
  mode: AIResponseMode;
  category: AIResponseCategory;

  message: string;

  confidence?: "high" | "medium" | "low";

  source?: {
    type: "verified_company_data" | "ai_model" | "system";
    label?: string;
  };

  suggestions?: Array<{
    label: string;
    prompt: string;
  }>;

  actions?: Array<{
    label: string;
    type:
      | "navigate"
      | "contact"
      | "start_project"
      | "retry";
    target?: string;
  }>;

  metadata?: {
    provider?: string;
    fallbackReason?: string;
    requestId?: string;
  };
}

export interface AIRequest {
  query: string;
  history?: Array<{ sender: 'user' | 'agent' | 'system'; text: string }>;
  requestId: string;
  timestamp: number;
}

export interface ChatMessage {
  id: string;
  sender: 'agent' | 'user' | 'system';
  text: string;
  timestamp: string;
  responsePayload?: AIResponse;
}

export interface ValidationResult<T> {
  isValid: boolean;
  data?: T;
  error?: string;
}

export type CircuitBreakerState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';
