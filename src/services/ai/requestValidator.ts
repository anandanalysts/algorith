import { AIRequest, ValidationResult } from './types';

const MAX_QUERY_LENGTH = 500;
const MAX_HISTORY_ITEMS = 8;

// Basic safety patterns that indicate malicious injection or env retrieval attempts
const BLOCKED_PROMPT_PATTERNS = [
  /ignore\s+(previous|all)\s+instructions/i,
  /reveal\s+(api\s*key|environment|env\s*var|secret|password)/i,
  /print\s+system\s+prompt/i,
  /process\.env/i,
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi
];

export class RequestValidator {
  /**
   * Validates and sanitizes incoming user queries before sending to providers
   */
  public static validate(rawQuery: unknown, rawHistory: unknown[] = []): ValidationResult<AIRequest> {
    if (typeof rawQuery !== 'string' || !rawQuery.trim()) {
      return {
        isValid: false,
        error: 'Message must be a non-empty string.'
      };
    }

    const trimmed = rawQuery.trim();

    if (trimmed.length > MAX_QUERY_LENGTH) {
      return {
        isValid: false,
        error: `Query exceeds maximum length of ${MAX_QUERY_LENGTH} characters.`
      };
    }

    // Security check against prompt injection
    const hasInjection = BLOCKED_PROMPT_PATTERNS.some((pattern) => pattern.test(trimmed));
    if (hasInjection) {
      return {
        isValid: false,
        error: 'Query contains disallowed syntax or sensitive command sequences.'
      };
    }

    // Sanitize and clamp history
    const sanitizedHistory = Array.isArray(rawHistory)
      ? rawHistory
          .slice(-MAX_HISTORY_ITEMS)
          .filter((item): item is { sender: 'user' | 'agent' | 'system'; text: string } => {
            return (
              typeof item === 'object' &&
              item !== null &&
              'sender' in item &&
              'text' in item &&
              typeof (item as { text: unknown }).text === 'string'
            );
          })
          .map((item) => ({
            sender: item.sender,
            text: String(item.text).slice(0, MAX_QUERY_LENGTH)
          }))
      : [];

    const requestId = `ALG-${Math.floor(100000 + Math.random() * 900000)}`;

    return {
      isValid: true,
      data: {
        query: trimmed,
        history: sanitizedHistory,
        requestId,
        timestamp: Date.now()
      }
    };
  }
}
