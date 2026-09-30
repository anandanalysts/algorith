import { AIProvider } from './provider';
import { AIRequest, AIResponse } from './types';
import { ResponseFactory } from './responseFactory';

export class FallbackProvider implements AIProvider {
  public name = 'FallbackProvider';

  public async generateResponse(request: AIRequest): Promise<AIResponse> {
    const query = request.query.toLowerCase();

    // 1. COMPANY CATEGORY
    if (
      query.includes('who are you') ||
      query.includes('what is algorith') ||
      query.includes('what does algorith do') ||
      query.includes('about algorith') ||
      query.includes('philosophy') ||
      query.includes('four pillars') ||
      query.includes('vision') ||
      query.includes('mission') ||
      query.includes('what does algorith build')
    ) {
      return ResponseFactory.createCompanyResponse(request.requestId);
    }

    // 2. SPECIFIC PRODUCT CHECKS
    if (query.includes('algorith ai') || query.includes('ai product') || query.includes('ai agents')) {
      return ResponseFactory.createSpecificProductResponse('algorith-ai', request.requestId);
    }

    if (query.includes('crm')) {
      return ResponseFactory.createSpecificProductResponse('algorith-crm', request.requestId);
    }

    if (query.includes('erp')) {
      return ResponseFactory.createSpecificProductResponse('algorith-erp', request.requestId);
    }

    if (query.includes('analytics') || query.includes('dashboard') || query.includes('telemetry')) {
      return ResponseFactory.createSpecificProductResponse('algorith-analytics', request.requestId);
    }

    // 3. PRODUCT GENERAL OVERVIEW
    if (
      query.includes('product') ||
      query.includes('products') ||
      query.includes('tools') ||
      query.includes('software products')
    ) {
      return ResponseFactory.createProductOverviewResponse(request.requestId);
    }

    // 4. SOLUTION CATEGORY
    if (
      query.includes('automate') ||
      query.includes('automation') ||
      query.includes('solution') ||
      query.includes('solutions') ||
      query.includes('workflow') ||
      query.includes('transformation')
    ) {
      return ResponseFactory.createSolutionResponse(request.requestId);
    }

    // 5. TECHNOLOGY CATEGORY
    if (
      query.includes('tech') ||
      query.includes('technology') ||
      query.includes('architecture') ||
      query.includes('stack') ||
      query.includes('layer') ||
      query.includes('security') ||
      query.includes('vpc')
    ) {
      return ResponseFactory.createTechnologyResponse(request.requestId);
    }

    // 6. CONTACT & PROJECT CATEGORY
    if (
      query.includes('contact') ||
      query.includes('start a project') ||
      query.includes('start project') ||
      query.includes('hire') ||
      query.includes('quote') ||
      query.includes('pricing') ||
      query.includes('talk to') ||
      query.includes('work with')
    ) {
      return ResponseFactory.createContactResponse(request.requestId);
    }

    // 7. UNKNOWN CATEGORY (Section 8: Never hallucinate)
    return ResponseFactory.createUnknownResponse(request.requestId);
  }
}
