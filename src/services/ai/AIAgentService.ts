import { AIRequest, AIResponse, ChatMessage } from './types';
import { RequestValidator } from './requestValidator';
import { ResponseValidator } from './responseValidator';
import { CircuitBreaker } from './circuitBreaker';
import { ClientRateLimiter } from './rateLimiter';
import { GeminiProvider } from './providers/GeminiProvider';
import { FallbackProvider } from './providers/FallbackProvider';

export class AIAgentService {
  private static geminiProvider = new GeminiProvider();
  private static fallbackProvider = new FallbackProvider();

  /**
   * Main entry point for user chat interaction
   */
  public static async sendMessage(
    rawQuery: string,
    history: ChatMessage[] = []
  ): Promise<AIResponse> {
    // 1. Validate incoming request
    const historyPayload = history.map((m) => ({
      sender: m.sender,
      text: m.text
    }));

    const validation = RequestValidator.validate(rawQuery, historyPayload);
    if (!validation.isValid || !validation.data) {
      return {
        message: validation.error || "Please enter a valid question.",
        category: 'UNKNOWN',
        provider: 'fallback',
        isFallback: true,
        confidence: 1.0,
        suggestedFollowUps: ['What does ALGorith do?', 'Explore Products', 'Start a Project'],
        requestId: `ALG-${Date.now()}`
      };
    }

    const request: AIRequest = validation.data;

    // 2. Check Client Rate Limits
    if (!ClientRateLimiter.isAllowed()) {
      return {
        message: "You've reached the current AI request limit. Please try again in a minute or contact ALGorith directly.",
        category: 'UNKNOWN',
        provider: 'rate_limit',
        isFallback: true,
        confidence: 1.0,
        suggestedFollowUps: ['Explore Products', 'Explore Solutions', 'Start a Project'],
        actionLink: { label: 'Contact ALGorith Team', view: 'contact' },
        requestId: request.requestId
      };
    }

    // 3. Check Circuit Breaker State
    const canUsePrimary = CircuitBreaker.isAvailable();

    if (canUsePrimary) {
      try {
        const rawPrimaryResponse = await this.geminiProvider.generateResponse(request);
        const responseValidation = ResponseValidator.validate(rawPrimaryResponse);

        if (responseValidation.isValid && responseValidation.data) {
          CircuitBreaker.recordSuccess();
          return responseValidation.data;
        }
      } catch {
        // Record failure in circuit breaker
        CircuitBreaker.recordFailure();
      }
    }

    // 4. Activate Fallback Provider (Deterministic Verified Knowledge)
    const fallbackResponse = await this.fallbackProvider.generateResponse(request);
    const validatedFallback = ResponseValidator.validate(fallbackResponse);

    if (validatedFallback.isValid && validatedFallback.data) {
      return validatedFallback.data;
    }

    // 5. Ultimate hardcoded safety boundary
    return {
      message: "ALGorith Technologies builds AI systems, software, data platforms and automation solutions. Explore Products or Solutions to learn more.",
      category: 'COMPANY',
      provider: 'fallback',
      isFallback: true,
      confidence: 1.0,
      suggestedFollowUps: ['Explore Products', 'Explore Solutions', 'Start a Project'],
      actionLink: { label: 'Explore Products', view: 'products' },
      requestId: request.requestId
    };
  }
}
