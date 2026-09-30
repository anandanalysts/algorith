import { AIResponse, AIResponseCategory } from './types';
import {
  VERIFIED_COMPANY_DATA,
  VERIFIED_PRODUCTS_DATA,
  VERIFIED_SOLUTIONS_DATA,
  VERIFIED_TECHNOLOGY_DATA
} from '../../data/aiAgent';

export class ResponseFactory {
  /**
   * 2. COMPANY RESPONSE
   */
  public static createCompanyResponse(requestId?: string): AIResponse {
    return {
      id: "fallback-company-001",
      mode: "fallback",
      category: "company",
      message: "ALGorith Technologies focuses on AI, software, data and automation solutions for modern businesses.",
      confidence: "high",
      source: {
        type: "verified_company_data",
        label: "ALGorith Technologies"
      },
      suggestions: [
        {
          label: "What does ALGorith build?",
          prompt: "What does ALGorith build?"
        },
        {
          label: "Explore products",
          prompt: "Show me ALGorith products."
        }
      ],
      actions: [
        {
          label: "About ALGorith",
          type: "navigate",
          target: "/about"
        },
        {
          label: "Contact ALGorith",
          type: "contact"
        }
      ],
      metadata: {
        requestId,
        fallbackReason: "verified_knowledge_match"
      }
    };
  }

  /**
   * 3. PRODUCT OVERVIEW RESPONSE
   */
  public static createProductOverviewResponse(requestId?: string): AIResponse {
    return {
      id: "fallback-product-001",
      mode: "fallback",
      category: "product",
      message: "ALGorith's product ecosystem includes AI, CRM, ERP and analytics-focused technology products. Product details can be explored on the Products page.",
      confidence: "high",
      source: {
        type: "verified_company_data",
        label: "ALGorith Products"
      },
      suggestions: [
        {
          label: "Tell me about ALGorith AI",
          prompt: "Tell me about ALGorith AI."
        },
        {
          label: "Show business products",
          prompt: "Show me ALGorith business products."
        }
      ],
      actions: [
        {
          label: "View Products",
          type: "navigate",
          target: "/products"
        }
      ],
      metadata: {
        requestId,
        fallbackReason: "verified_knowledge_match"
      }
    };
  }

  /**
   * 4. SPECIFIC PRODUCT RESPONSE
   */
  public static createSpecificProductResponse(productId: string, requestId?: string): AIResponse {
    const product = VERIFIED_PRODUCTS_DATA.find((p) => p.id === productId);

    if (productId === 'algorith-ai' || !product) {
      return {
        id: "fallback-product-ai-001",
        mode: "fallback",
        category: "product",
        message: "ALGorith AI is part of the ALGorith technology ecosystem, focused on AI and intelligent agent capabilities.",
        confidence: "high",
        source: {
          type: "verified_company_data",
          label: "ALGorith AI"
        },
        suggestions: [
          {
            label: "What can AI agents do?",
            prompt: "What can AI agents do?"
          },
          {
            label: "Explore solutions",
            prompt: "Show me AI and automation solutions."
          }
        ],
        actions: [
          {
            label: "View Products",
            type: "navigate",
            target: "/products"
          }
        ],
        metadata: {
          requestId,
          fallbackReason: "verified_knowledge_match"
        }
      };
    }

    return {
      id: `fallback-product-${product.id}-001`,
      mode: "fallback",
      category: "product",
      message: `${product.name} is part of the ALGorith technology ecosystem, focused on ${product.description}`,
      confidence: "high",
      source: {
        type: "verified_company_data",
        label: product.name
      },
      suggestions: [
        {
          label: `Capabilities of ${product.name}`,
          prompt: `What are the capabilities of ${product.name}?`
        },
        {
          label: "Explore products",
          prompt: "Show me ALGorith products."
        }
      ],
      actions: [
        {
          label: "View Products",
          type: "navigate",
          target: "/products"
        }
      ],
      metadata: {
        requestId,
        fallbackReason: "verified_knowledge_match"
      }
    };
  }

  /**
   * 5. SOLUTION RESPONSE
   */
  public static createSolutionResponse(requestId?: string): AIResponse {
    return {
      id: "fallback-solution-001",
      mode: "fallback",
      category: "solution",
      message: "ALGorith works across four broad solution areas: AI and automation, software and business systems, data and analytics, and digital transformation.",
      confidence: "high",
      source: {
        type: "verified_company_data",
        label: "ALGorith Solutions"
      },
      suggestions: [
        {
          label: "AI & automation",
          prompt: "Tell me about AI and automation solutions."
        },
        {
          label: "Software",
          prompt: "Tell me about software and business systems."
        },
        {
          label: "Data",
          prompt: "Tell me about data and analytics."
        }
      ],
      actions: [
        {
          label: "Explore Solutions",
          type: "navigate",
          target: "/solutions"
        }
      ],
      metadata: {
        requestId,
        fallbackReason: "verified_knowledge_match"
      }
    };
  }

  /**
   * 6. TECHNOLOGY RESPONSE
   */
  public static createTechnologyResponse(requestId?: string): AIResponse {
    return {
      id: "fallback-technology-001",
      mode: "fallback",
      category: "technology",
      message: "The ALGorith technology architecture connects AI, agents, automation, data, analytics and business applications.",
      confidence: "high",
      source: {
        type: "verified_company_data",
        label: "ALGorith Technology"
      },
      suggestions: [
        {
          label: "AI agents",
          prompt: "What are AI agents?"
        },
        {
          label: "Automation",
          prompt: "How does automation fit into the architecture?"
        }
      ],
      actions: [
        {
          label: "Explore Technology",
          type: "navigate",
          target: "/technology"
        }
      ],
      metadata: {
        requestId,
        fallbackReason: "verified_knowledge_match"
      }
    };
  }

  /**
   * 7. CONTACT / PROJECT RESPONSE
   */
  public static createContactResponse(requestId?: string): AIResponse {
    return {
      id: "fallback-contact-001",
      mode: "fallback",
      category: "contact",
      message: "I'd be happy to help you start a conversation with ALGorith. You can describe your project, automation requirement, software idea or technology challenge through the contact form.",
      confidence: "high",
      source: {
        type: "verified_company_data",
        label: "ALGorith Contact"
      },
      actions: [
        {
          label: "Start a Project",
          type: "start_project"
        },
        {
          label: "Contact ALGorith",
          type: "contact"
        }
      ],
      metadata: {
        requestId,
        fallbackReason: "verified_knowledge_match"
      }
    };
  }

  /**
   * 8. UNKNOWN RESPONSE (Never hallucinate)
   */
  public static createUnknownResponse(requestId?: string): AIResponse {
    return {
      id: "fallback-unknown-001",
      mode: "fallback",
      category: "unknown",
      message: "I don't have enough verified information to answer that accurately yet.",
      confidence: "low",
      source: {
        type: "system",
        label: "ALGorith AI Agent"
      },
      suggestions: [
        {
          label: "Explore Products",
          prompt: "Show me ALGorith products."
        },
        {
          label: "Explore Solutions",
          prompt: "Show me ALGorith solutions."
        },
        {
          label: "Contact ALGorith",
          prompt: "I want to contact ALGorith."
        }
      ],
      actions: [
        {
          label: "Products",
          type: "navigate",
          target: "/products"
        },
        {
          label: "Solutions",
          type: "navigate",
          target: "/solutions"
        },
        {
          label: "Contact",
          type: "contact"
        }
      ],
      metadata: {
        requestId,
        fallbackReason: "unverified_or_out_of_scope"
      }
    };
  }

  /**
   * 9. PROVIDER FAILURE RESPONSE
   */
  public static createProviderUnavailableResponse(requestId?: string): AIResponse {
    return {
      id: "fallback-provider-001",
      mode: "fallback",
      category: "general",
      message: "ALGorith AI Agent is temporarily using verified ALGorith knowledge. I can still help you explore the company's products, solutions and technology.",
      confidence: "high",
      source: {
        type: "verified_company_data",
        label: "ALGorith Knowledge Mode"
      },
      metadata: {
        fallbackReason: "primary_provider_unavailable",
        requestId
      },
      suggestions: [
        {
          label: "Explore Products",
          prompt: "Show me ALGorith products."
        },
        {
          label: "Explore Solutions",
          prompt: "Show me ALGorith solutions."
        }
      ],
      actions: [
        {
          label: "Products",
          type: "navigate",
          target: "/products"
        },
        {
          label: "Solutions",
          type: "navigate",
          target: "/solutions"
        }
      ]
    };
  }

  /**
   * 10. RATE-LIMIT RESPONSE
   */
  public static createRateLimitResponse(requestId?: string): AIResponse {
    return {
      id: "fallback-rate-limit-001",
      mode: "error",
      category: "general",
      message: "The AI Agent has reached its current request limit. Please try again later or continue exploring ALGorith through the website.",
      source: {
        type: "system",
        label: "ALGorith AI Agent"
      },
      actions: [
        {
          label: "Explore Products",
          type: "navigate",
          target: "/products"
        },
        {
          label: "Contact ALGorith",
          type: "contact"
        }
      ],
      metadata: {
        fallbackReason: "rate_limit_exceeded",
        requestId
      }
    };
  }

  /**
   * 11. TIMEOUT RESPONSE
   */
  public static createTimeoutResponse(requestId?: string): AIResponse {
    return {
      id: "fallback-timeout-001",
      mode: "fallback",
      category: "general",
      message: "The AI Agent is taking longer than expected. I can still help you explore verified ALGorith information.",
      source: {
        type: "verified_company_data",
        label: "ALGorith Knowledge Mode"
      },
      metadata: {
        fallbackReason: "provider_timeout",
        requestId
      },
      actions: [
        {
          label: "Try Again",
          type: "retry"
        }
      ]
    };
  }

  /**
   * 12. INVALID AI RESPONSE
   */
  public static createInvalidAIResponse(requestId?: string): AIResponse {
    return {
      id: "fallback-invalid-response-001",
      mode: "fallback",
      category: "general",
      message: "I couldn't produce a reliable response to that request. Please try asking in a different way.",
      confidence: "high",
      source: {
        type: "system",
        label: "ALGorith AI Agent"
      },
      metadata: {
        fallbackReason: "invalid_ai_response",
        requestId
      },
      actions: [
        {
          label: "Try Again",
          type: "retry"
        }
      ]
    };
  }

  /**
   * Normalizes arbitrary or Gemini provider output to canonical AIResponse
   */
  public static normalizeAIResponse(
    text: string,
    category: AIResponseCategory = 'general',
    requestId?: string
  ): AIResponse {
    return {
      id: `ai-resp-${Date.now()}`,
      mode: "ai",
      category,
      message: text.trim(),
      confidence: "high",
      source: {
        type: "ai_model",
        label: "ALGorith AI Agent (Gemini)"
      },
      suggestions: [
        {
          label: "Explore Products",
          prompt: "Show me ALGorith products."
        },
        {
          label: "Start a Project",
          prompt: "I want to start a project."
        }
      ],
      actions: [
        {
          label: "Start a Project",
          type: "start_project"
        }
      ],
      metadata: {
        provider: "gemini",
        requestId
      }
    };
  }
}
