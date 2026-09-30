import { AIResponse, AIResponseMode, AIResponseCategory } from './types';
import { ResponseFactory } from './responseFactory';

const ALLOWED_MODES: AIResponseMode[] = ['ai', 'fallback', 'error'];
const ALLOWED_CATEGORIES: AIResponseCategory[] = [
  'company',
  'product',
  'solution',
  'technology',
  'contact',
  'general',
  'unknown'
];
const ALLOWED_ACTION_TYPES = ['navigate', 'contact', 'start_project', 'retry'];
const ALLOWED_TARGETS = ['/about', '/products', '/solutions', '/technology', '/contact'];

const SENSITIVE_PATTERNS = [
  /GEMINI_API_KEY/i,
  /API_KEY\s*=\s*['"][^'"]+['"]/i,
  /process\.env\./i,
  /INTERNAL_SYSTEM_PROMPT/i,
  /BEGIN PRIVATE KEY/i,
  /HTTP\s+500/i,
  /TypeError:/i,
  /ReferenceError:/i
];

export class ResponseValidator {
  /**
   * Strictly validates canonical AIResponse object before passing to UI
   */
  public static validateAIResponse(rawResponse: unknown, requestId?: string): AIResponse {
    if (!rawResponse || typeof rawResponse !== 'object') {
      return ResponseFactory.createInvalidAIResponse(requestId);
    }

    const res = rawResponse as Partial<AIResponse>;

    // 1. Check ID and Mode
    if (typeof res.id !== 'string' || !res.id.trim()) {
      return ResponseFactory.createInvalidAIResponse(requestId);
    }

    if (!res.mode || !ALLOWED_MODES.includes(res.mode)) {
      return ResponseFactory.createInvalidAIResponse(requestId);
    }

    // 2. Check Category
    if (!res.category || !ALLOWED_CATEGORIES.includes(res.category)) {
      return ResponseFactory.createInvalidAIResponse(requestId);
    }

    // 3. Check Message
    if (typeof res.message !== 'string' || !res.message.trim()) {
      return ResponseFactory.createInvalidAIResponse(requestId);
    }

    if (res.message.length > 4000) {
      return ResponseFactory.createInvalidAIResponse(requestId);
    }

    // 4. Security leak check
    const hasLeak = SENSITIVE_PATTERNS.some((pattern) => pattern.test(res.message!));
    if (hasLeak) {
      return ResponseFactory.createInvalidAIResponse(requestId);
    }

    // 5. Validate actions if present
    if (Array.isArray(res.actions)) {
      for (const action of res.actions) {
        if (!action || typeof action !== 'object') {
          return ResponseFactory.createInvalidAIResponse(requestId);
        }
        if (!ALLOWED_ACTION_TYPES.includes(action.type)) {
          return ResponseFactory.createInvalidAIResponse(requestId);
        }
        if (action.type === 'navigate' && action.target && !ALLOWED_TARGETS.includes(action.target)) {
          return ResponseFactory.createInvalidAIResponse(requestId);
        }
      }
    }

    // 6. Validate suggestions if present
    if (Array.isArray(res.suggestions)) {
      for (const suggestion of res.suggestions) {
        if (!suggestion || typeof suggestion.label !== 'string' || typeof suggestion.prompt !== 'string') {
          return ResponseFactory.createInvalidAIResponse(requestId);
        }
      }
    }

    return res as AIResponse;
  }
}
