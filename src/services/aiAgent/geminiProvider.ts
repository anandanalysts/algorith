import { AIProvider } from './provider';
import { AIRequest, AIResponse } from './types';
import { ResponseFactory } from './responseFactory';

export class GeminiProvider implements AIProvider {
  public name = 'GeminiProvider';
  private static readonly TIMEOUT_MS = 4500;
  private static readonly MAX_RETRIES = 1;

  public async generateResponse(request: AIRequest): Promise<AIResponse> {
    let attempts = 0;

    while (attempts <= GeminiProvider.MAX_RETRIES) {
      attempts++;

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

        if (response.status === 429) {
          return ResponseFactory.createRateLimitResponse(request.requestId);
        }

        if (!response.ok) {
          throw new Error(`Provider API status ${response.status}`);
        }

        const data = await response.json();

        if (data && typeof data === 'object' && typeof data.message === 'string') {
          // If server already returned canonical schema:
          if (data.id && data.mode && data.category) {
            return data as AIResponse;
          }

          // Otherwise normalize to canonical schema:
          return ResponseFactory.normalizeAIResponse(
            data.message,
            data.category || 'general',
            request.requestId
          );
        }

        throw new Error('Malformed payload returned from provider API.');
      } catch (err: unknown) {
        const isAbort = (err as Error)?.name === 'AbortError';
        if (isAbort) {
          return ResponseFactory.createTimeoutResponse(request.requestId);
        }

        if (attempts > GeminiProvider.MAX_RETRIES) {
          throw err;
        }

        await new Promise((res) => setTimeout(res, 350));
      }
    }

    throw new Error('GeminiProvider exceeded retry limit.');
  }
}
