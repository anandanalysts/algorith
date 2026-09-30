import { AIProvider } from './AIProvider';
import { AIRequest, AIResponse } from '../types';

export class GeminiProvider implements AIProvider {
  public name = 'GeminiProvider';
  private static readonly TIMEOUT_MS = 4500;
  private static readonly MAX_RETRIES = 1;

  public async generateResponse(request: AIRequest): Promise<AIResponse> {
    let attempts = 0;

    while (attempts <= GeminiProvider.MAX_RETRIES) {
      attempts++;
      const startTime = Date.now();

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), GeminiProvider.TIMEOUT_MS);

        const response = await fetch('/api/ai-agent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Request-ID': request.requestId
          },
          body: JSON.stringify({
            query: request.query,
            history: request.history,
            requestId: request.requestId
          }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`Provider API responded with HTTP status ${response.status}`);
        }

        const data = await response.json();

        if (!data || typeof data.message !== 'string') {
          throw new Error('Malformed payload returned from provider API.');
        }

        return {
          message: data.message,
          category: data.category || 'UNKNOWN',
          provider: 'gemini',
          isFallback: false,
          confidence: data.confidence || 0.95,
          suggestedFollowUps: Array.isArray(data.suggestedFollowUps) ? data.suggestedFollowUps : [],
          actionLink: data.actionLink,
          requestId: request.requestId,
          latencyMs: Date.now() - startTime
        };
      } catch (err: unknown) {
        if (attempts > GeminiProvider.MAX_RETRIES) {
          throw err;
        }
        // Brief backoff before 1 retry
        await new Promise((res) => setTimeout(res, 400));
      }
    }

    throw new Error('GeminiProvider exceeded retry budget.');
  }
}
