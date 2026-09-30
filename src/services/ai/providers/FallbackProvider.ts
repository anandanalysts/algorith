import { AIProvider } from './AIProvider';
import { AIRequest, AIResponse, FallbackCategory } from '../types';
import {
  VERIFIED_COMPANY_KNOWLEDGE,
  VERIFIED_PRODUCTS_KNOWLEDGE,
  VERIFIED_SOLUTIONS_KNOWLEDGE,
  VERIFIED_TECHNOLOGY_KNOWLEDGE,
  VERIFIED_CONTACT_KNOWLEDGE
} from '../../../knowledge';

export class FallbackProvider implements AIProvider {
  public name = 'FallbackProvider';

  public async generateResponse(request: AIRequest): Promise<AIResponse> {
    const startTime = Date.now();
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
      query.includes('mission')
    ) {
      return {
        message: `${VERIFIED_COMPANY_KNOWLEDGE.name} builds AI-powered software, data systems and automation solutions for modern businesses.\n\nOur philosophy: ${VERIFIED_COMPANY_KNOWLEDGE.corePhilosophy.join(' • ')}.\n\nWe focus on business-first engineering with total IP ownership and zero vendor lock-in.`,
        category: 'COMPANY',
        provider: 'fallback',
        isFallback: true,
        confidence: 0.98,
        suggestedFollowUps: [
          'What products do you build?',
          'What solutions do you offer?',
          'How do I start a project?'
        ],
        actionLink: { label: 'About ALGorith', view: 'about' },
        requestId: request.requestId,
        latencyMs: Date.now() - startTime
      };
    }

    // 2. PRODUCTS CATEGORY
    if (
      query.includes('crm') ||
      query.includes('erp') ||
      query.includes('analytics') ||
      query.includes('product') ||
      query.includes('tools') ||
      query.includes('software products')
    ) {
      if (query.includes('crm')) {
        const crm = VERIFIED_PRODUCTS_KNOWLEDGE.find((p) => p.id === 'algorith-crm')!;
        return {
          message: `**${crm.name}** is our context-aware customer relationship engine.\n\n• ${crm.description}\n\nKey capabilities include real-time AI lead scoring, unified customer timelines, and bidirectional sync with WhatsApp, Slack, and ERP backends.`,
          category: 'PRODUCTS',
          provider: 'fallback',
          isFallback: true,
          confidence: 0.99,
          suggestedFollowUps: [
            'Explore ALGorith ERP',
            'Explore ALGorith Analytics',
            'Start a Project'
          ],
          actionLink: { label: 'Explore Products', view: 'products' },
          requestId: request.requestId,
          latencyMs: Date.now() - startTime
        };
      }

      if (query.includes('erp')) {
        const erp = VERIFIED_PRODUCTS_KNOWLEDGE.find((p) => p.id === 'algorith-erp')!;
        return {
          message: `**${erp.name}** is our modular operational core for enterprise workflows.\n\n• ${erp.description}\n\nFeatures multi-entity accounting, predictive inventory reordering, and automated procurement approvals.`,
          category: 'PRODUCTS',
          provider: 'fallback',
          isFallback: true,
          confidence: 0.99,
          suggestedFollowUps: [
            'Explore ALGorith CRM',
            'Explore ALGorith Analytics',
            'Start a Project'
          ],
          actionLink: { label: 'Explore Products', view: 'products' },
          requestId: request.requestId,
          latencyMs: Date.now() - startTime
        };
      }

      return {
        message: `ALGorith engineers four flagship technology products:\n\n1. **ALGorith AI**: AI and intelligent agent ecosystem.\n2. **ALGorith CRM**: Customer relationship and pipeline orchestration.\n3. **ALGorith ERP**: Enterprise operations and workflow management.\n4. **ALGorith Analytics**: Sub-second telemetry and business intelligence.`,
        category: 'PRODUCTS',
        provider: 'fallback',
        isFallback: true,
        confidence: 0.95,
        suggestedFollowUps: [
          'Tell me about ALGorith CRM',
          'Tell me about ALGorith ERP',
          'How do I start a project?'
        ],
        actionLink: { label: 'Explore All Products', view: 'products' },
        requestId: request.requestId,
        latencyMs: Date.now() - startTime
      };
    }

    // 3. SOLUTIONS & AUTOMATION CATEGORY
    if (
      query.includes('automate') ||
      query.includes('automation') ||
      query.includes('solution') ||
      query.includes('workflow') ||
      query.includes('manual') ||
      query.includes('transformation')
    ) {
      return {
        message: `ALGorith provides four primary technology solution areas:\n\n• **AI & Automation**: Intelligent agents and automated workflow pipelines.\n• **Software & Business Systems**: Custom web platforms, SaaS, CRM, and ERP.\n• **Data & Analytics**: Centralized data lakehouses and executive dashboards.\n• **Digital Transformation**: Modernizing legacy systems into scalable cloud infrastructure.`,
        category: 'SOLUTIONS',
        provider: 'fallback',
        isFallback: true,
        confidence: 0.95,
        suggestedFollowUps: [
          'How can I automate my business?',
          'View Technology Stack',
          'Start a Project'
        ],
        actionLink: { label: 'Explore Solutions', view: 'solutions' },
        requestId: request.requestId,
        latencyMs: Date.now() - startTime
      };
    }

    // 4. TECHNOLOGY & ARCHITECTURE CATEGORY
    if (
      query.includes('tech') ||
      query.includes('technology') ||
      query.includes('architecture') ||
      query.includes('stack') ||
      query.includes('security') ||
      query.includes('vpc') ||
      query.includes('privacy')
    ) {
      return {
        message: `The ALGorith Technology Architecture spans 6 core tiers:\n\n1. **AI**: Foundation reasoning models & schema guardrails.\n2. **AGENTS**: Autonomous multi-agent coordination & tool calling.\n3. **AUTOMATION**: Event-driven message queues & webhooks.\n4. **DATA**: ACID relational stores, lakehouses & vector databases.\n5. **ANALYTICS**: Sub-second visual telemetry & anomaly detection.\n6. **APPLICATIONS**: High-performance React/TypeScript business apps.\n\nAll systems support zero data retention and private VPC deployments.`,
        category: 'TECHNOLOGY',
        provider: 'fallback',
        isFallback: true,
        confidence: 0.95,
        suggestedFollowUps: [
          'What are your security standards?',
          'Explore Products',
          'Start a Project'
        ],
        actionLink: { label: 'Explore Technology', view: 'technology' },
        requestId: request.requestId,
        latencyMs: Date.now() - startTime
      };
    }

    // 5. CONTACT & PROJECT CATEGORY
    if (
      query.includes('contact') ||
      query.includes('start a project') ||
      query.includes('hire') ||
      query.includes('email') ||
      query.includes('phone') ||
      query.includes('build') ||
      query.includes('pricing') ||
      query.includes('quote')
    ) {
      return {
        message: `To start a project with ALGorith:\n\n1. Submit your project specifications through our intake form.\n2. Our lead architects conduct a technical feasibility review within 24 hours.\n3. You receive a structured engineering blueprint.\n\nYou can also reach the team directly at **${VERIFIED_CONTACT_KNOWLEDGE.primaryEmail}** or **${VERIFIED_CONTACT_KNOWLEDGE.directPhone}**.`,
        category: 'CONTACT',
        provider: 'fallback',
        isFallback: true,
        confidence: 0.98,
        suggestedFollowUps: [
          'Submit Project Form',
          'Explore Solutions',
          'About ALGorith'
        ],
        actionLink: { label: 'Start a Project', view: 'contact' },
        requestId: request.requestId,
        latencyMs: Date.now() - startTime
      };
    }

    // 6. UNKNOWN CATEGORY (Honest boundary — never hallucinate)
    return {
      message: "I don't have enough verified information to answer that accurately yet.\n\nYou can explore ALGorith's Products and Solutions, or contact the team directly for a detailed answer.",
      category: 'UNKNOWN',
      provider: 'fallback',
      isFallback: true,
      confidence: 0.5,
      suggestedFollowUps: [
        'What does ALGorith do?',
        'Explore Products',
        'Start a Project'
      ],
      actionLink: { label: 'Contact ALGorith Team', view: 'contact' },
      requestId: request.requestId,
      latencyMs: Date.now() - startTime
    };
  }
}
