/**
 * ALGorith AI Agent Main Entry Point
 */

export * from './aiAgent/types';
export * from './aiAgent/responseFactory';
export * from './aiAgent/responseValidator';
export * from './aiAgent/requestValidator';
export * from './aiAgent/circuitBreaker';
export * from './aiAgent/rateLimiter';
export * from './aiAgent/provider';
export * from './aiAgent/geminiProvider';
export * from './aiAgent/fallbackProvider';
export * from './aiAgent/aiAgentService';

import { ChatMessage } from './aiAgent/types';
import { ResponseFactory } from './aiAgent/responseFactory';

export const V2_SUGGESTED_PROMPTS: string[] = [
  'What does ALGorith build?',
  'Tell me about ALGorith AI',
  'Tell me about ALGorith CRM',
  'Tell me about AI and automation solutions',
  'How does the technology stack work?',
  'How do I start a project?'
];

export const V2_INITIAL_AGENT_MESSAGE: ChatMessage = {
  id: 'msg-welcome-v2',
  sender: 'agent',
  text: "Hi, I'm ALGorith AI Agent.\n\nWhat are you trying to build, automate or improve?",
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  responsePayload: ResponseFactory.createCompanyResponse()
};
