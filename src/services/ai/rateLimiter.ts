export class ClientRateLimiter {
  private static requestTimestamps: number[] = [];
  private static readonly MAX_REQUESTS_PER_WINDOW = 12;
  private static readonly WINDOW_MS = 60000; // 1 minute

  public static isAllowed(): boolean {
    const now = Date.now();
    // Clean expired timestamps
    this.requestTimestamps = this.requestTimestamps.filter(
      (time) => now - time < this.WINDOW_MS
    );

    if (this.requestTimestamps.length >= this.MAX_REQUESTS_PER_WINDOW) {
      return false;
    }

    this.requestTimestamps.push(now);
    return true;
  }
}
