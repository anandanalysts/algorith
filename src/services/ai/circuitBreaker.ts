import { CircuitBreakerState } from './types';

export class CircuitBreaker {
  private static state: CircuitBreakerState = 'CLOSED';
  private static failureCount = 0;
  private static lastFailureTime = 0;
  private static readonly FAILURE_THRESHOLD = 3;
  private static readonly RESET_TIMEOUT_MS = 25000; // 25s cooldown before half-open

  public static getState(): CircuitBreakerState {
    if (this.state === 'OPEN') {
      const elapsed = Date.now() - this.lastFailureTime;
      if (elapsed > this.RESET_TIMEOUT_MS) {
        this.state = 'HALF_OPEN';
      }
    }
    return this.state;
  }

  public static recordSuccess(): void {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }

  public static recordFailure(): void {
    this.failureCount += 1;
    this.lastFailureTime = Date.now();
    if (this.failureCount >= this.FAILURE_THRESHOLD) {
      this.state = 'OPEN';
    }
  }

  public static isAvailable(): boolean {
    return this.getState() !== 'OPEN';
  }
}
