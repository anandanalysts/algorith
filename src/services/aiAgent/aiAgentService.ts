import { AIRequest, AIResponse, ChatMessage } from './types';
import { RequestValidator } from './requestValidator';
import { ResponseValidator } from './responseValidator';
import { ResponseFactory } from './responseFactory';
import { CircuitBreaker } from './circuitBreaker';
import { ClientRateLimiter } from './rateLimiter';
import { GeminiProvider } from './geminiProvider';
import { FallbackProvider } from './fallbackProvider';

export class AIAgentService {
  private static geminiProvider = new GeminiProvider();
  private static fallbackProvider = new FallbackProvider();

  public static async sendMessage(
    rawQuery: string,
    history: ChatMessage[] = []
  ): Promise<AIResponse> {
    // 1. Request Validation
    const historyPayload = history.map((m) => ({
      sender: m.sender,
      text: m.text
    }));

    const validation = RequestValidator.validate(rawQuery, historyPayload);
    if (!validation.isValid || !validation.data) {
      const errorResp = ResponseFactory.createUnknownResponse();
      errorResp.message = validation.error || "Please enter a valid message.";
      return ResponseValidator.validateAIResponse(errorResp);
    }

    const request: AIRequest = validation.data;

    // 2. Client Rate Limiter
    if (!ClientRateLimiter.isAllowed()) {
      const rateLimitResp = ResponseFactory.createRateLimitResponse(request.requestId);
      return ResponseValidator.validateAIResponse(rateLimitResp, request.requestId);
    }

    // 3. Primary Provider (Circuit Breaker Protected)
    if (CircuitBreaker.isAvailable()) {
      try {
        const rawPrimary = await this.geminiProvider.generateResponse(request);
        const validated = ResponseValidator.validateAIResponse(rawPrimary, request.requestId);

        if (validated.id !== 'fallback-invalid-response-001') {
          CircuitBreaker.recordSuccess();
          return validated;
        }
      } catch {
        CircuitBreaker.recordFailure();
      }
    }

    // 4. Deterministic Fallback Provider
    try {
      const rawFallback = await this.fallbackProvider.generateResponse(request);
      return ResponseValidator.validateAIResponse(rawFallback, request.requestId);
    } catch {
      const emergencyFallback = ResponseFactory.createCompanyResponse(request.requestId);
      return ResponseValidator.validateAIResponse(emergencyFallback, request.requestId);
    }
  }
}
