export interface CompanyConfig {
  name: string;
  legalName: string;
  slogan: string;
  positioning: string;
  core: string;
  domain: string;
  url: string;
  email: string;
  phone: string;
  phoneRaw: string;
  social: {
    linkedin: string;
    x: string;
    instagram: string;
    github: string;
  };
  analyticsId: string;
}

export const COMPANY: CompanyConfig = {
  name: "ALGorith Technologies",
  legalName: "ALGorith Technologies Inc.",
  slogan: "Think. Build. Automate. Grow.",
  positioning: "An AI-Native Technology & Business Solutions Company",
  core: "AI • Software • Data • Automation • Business Systems • Digital Transformation",
  domain: "algorith.in",
  url: "https://algorith.in",
  email: "contact@algorith.in",
  phone: "+91 9899877478",
  phoneRaw: "+919899877478",
  social: {
    linkedin: "https://linkedin.com/company/algorith-tech",
    x: "https://x.com/algorith_tech",
    instagram: "https://instagram.com/algorith_tech",
    github: "https://github.com/algorith-tech"
  },
  analyticsId: (import.meta.env.VITE_ANALYTICS_ID as string) || ""
};

/**
 * Telemetry and user interaction analytics tracker
 */
export function trackEvent(eventName: string, properties?: Record<string, unknown>) {
  if (COMPANY.analyticsId) {
    // If configured with Google Analytics or custom provider
    if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', eventName, properties);
    }
  }
  // Safe console telemetry for debug & integration verification
  if (import.meta.env.DEV) {
    console.debug(`[Analytics Event: ${eventName}]`, properties || {});
  }
}
