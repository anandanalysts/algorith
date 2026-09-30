import { AIResponse, ValidationResult } from './types';

const LEAK_CHECK_PATTERNS = [
  /GEMINI_API_KEY/i,
  /API_KEY\s*=\s*['"][^'"]+['"]/i,
  /process\.env\./i,
  /INTERNAL_SYSTEM_PROMPT/i,
  /BEGIN PRIVATE KEY/i
];

export class ResponseValidator {
  /**
   * Validates provider response before displaying to user
   */
  public static validate(rawResponse: Partial<AIResponse>): ValidationResult<AIResponse> {
    if (!rawResponse || typeof rawResponse.message !== 'string') {
      return { isValid: false, error: 'Empty or invalid response object from provider.' };
    }

    const text = rawResponse.message.trim();

    if (text.length === 0) {
      return { isValid: false, error: 'Empty text returned from provider.' };
    }

    if (text.length > 3000) {
      return { isValid: false, error: 'Response exceeded maximum safe length.' };
    }

    // Security check: ensure no internal credentials or prompt tokens are leaked
    const hasLeak = LEAK_CHECK_PATTERNS.some((pattern) => pattern.test(text));
    if (hasLeak) {
      return { isValid: false, error: 'Response failed security validation check.' };
    }

    return {
      isValid: true,
      data: {
        message: text,
        category: rawResponse.category || 'UNKNOWN',
        provider: rawResponse.provider || 'gemini',
        isFallback: !!rawResponse.isFallback,
        confidence: typeof rawResponse.confidence === 'number' ? rawResponse.confidence : 1.0,
        suggestedFollowUps: Array.isArray(rawResponse.suggestedFollowUps) ? rawResponse.suggestedFollowUps : [],
        actionLink: rawResponse.actionLink,
        requestId: rawResponse.requestId || `ALG-${Date.now()}`,
        latencyMs: rawResponse.latencyMs || 0
      }
    };
  }
}
