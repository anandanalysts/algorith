import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowUp,
  RotateCcw,
  Check,
  Copy,
  ArrowRight,
  ChevronRight,
  AlertCircle,
  WifiOff,
  RotateCw,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import {
  ChatMessage,
  AIResponse,
  V2_SUGGESTED_PROMPTS,
  V2_INITIAL_AGENT_MESSAGE,
  AIAgentService
} from '../../services/aiAgent';
import { PageView } from '../../types/navigation';

interface AIAgentChatProps {
  onNavigate?: (view: PageView) => void;
  compact?: boolean;
}

export const AIAgentChat: React.FC<AIAgentChatProps> = ({ onNavigate, compact = false }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([V2_INITIAL_AGENT_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Monitor network connectivity
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    if (typeof window !== 'undefined') {
      setIsOffline(!window.navigator.onLine);
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response: AIResponse = await AIAgentService.sendMessage(query, [...messages, userMsg]);
      const agentMsg: ChatMessage = {
        id: response.id || `msg-agent-${Date.now()}`,
        sender: 'agent',
        text: response.message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        responsePayload: response
      };
      setMessages((prev) => [...prev, agentMsg]);
    } catch {
      // Unreachable due to fail-safe AIAgentService, but kept for absolute boundary safety
      const fallbackMsg: ChatMessage = {
        id: `msg-err-${Date.now()}`,
        sender: 'agent',
        text: "I don't have enough verified information to answer that accurately yet.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = (action: { type: string; target?: string }) => {
    if (!onNavigate) return;

    if (action.type === 'navigate' && action.target) {
      const cleanView = action.target.replace(/^\//, '') as PageView;
      onNavigate(cleanView || 'home');
    } else if (action.type === 'contact' || action.type === 'start_project') {
      onNavigate('contact');
    } else if (action.type === 'retry') {
      const lastUserMsg = [...messages].reverse().find((m) => m.sender === 'user');
      if (lastUserMsg) {
        handleSend(lastUserMsg.text);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    setMessages([V2_INITIAL_AGENT_MESSAGE]);
    setInputValue('');
    if (inputRef.current) inputRef.current.focus();
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full bg-[#0B101C] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col font-sans transition-all">
      
      {/* Top Console Status Header */}
      <div className="px-5 py-3.5 bg-[#0E1526] border-b border-white/8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className={`w-2 h-2 rounded-full ${isOffline ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'} shadow-sm`} />
          <span className="font-display text-sm font-semibold text-white tracking-tight">
            ALGorith AI Agent
          </span>
          <span className="text-[10px] font-mono text-slate-400 bg-white/5 border border-white/8 px-1.5 py-0.5 rounded">
            {isOffline ? 'Offline Knowledge Mode' : 'Verified Knowledge Active'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            title="Reset conversation"
            className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-white/5 transition-colors text-xs flex items-center gap-1.5 font-mono"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[10px] uppercase">Reset</span>
          </button>
        </div>
      </div>

      {/* Offline Alert Banner if applicable */}
      {isOffline && (
        <div className="bg-amber-950/40 border-b border-amber-800/40 px-4 py-2 text-xs font-mono text-amber-300 flex items-center gap-2">
          <WifiOff className="w-3.5 h-3.5" />
          <span>You are currently offline. Serving from verified local ALGorith knowledge.</span>
        </div>
      )}

      {/* Chat Messages Timeline */}
      <div className={`p-4 sm:p-6 overflow-y-auto space-y-5 ${compact ? 'h-80' : 'h-[440px] max-h-[60vh]'}`}>
        {messages.map((msg) => {
          const isAgent = msg.sender === 'agent';
          const payload = msg.responsePayload;

          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex gap-3 ${isAgent ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[90%] sm:max-w-[80%] rounded-xl p-4 text-xs sm:text-sm leading-relaxed relative group ${
                  isAgent
                    ? 'bg-[#10192D] border border-white/8 text-slate-200'
                    : 'bg-[#1557E8] text-white font-normal'
                }`}
              >
                {/* Bubble Meta Header */}
                <div className="flex items-center justify-between gap-4 mb-1.5 opacity-50 text-[10px] font-mono">
                  <span>{isAgent ? 'ALGorith AI Agent' : 'You'}</span>
                  <div className="flex items-center gap-2">
                    {isAgent && payload?.source?.type === 'verified_company_data' && (
                      <span className="text-[9px] text-[#12D9F5]">Verified Data</span>
                    )}
                    <span>{msg.timestamp}</span>
                  </div>
                </div>

                {/* Message Body */}
                <div className="whitespace-pre-line text-slate-100 font-sans space-y-1">
                  {msg.text}
                </div>

                {/* Actions Renderer */}
                {isAgent && payload?.actions && payload.actions.length > 0 && onNavigate && (
                  <div className="mt-3 pt-2.5 border-t border-white/8 flex flex-wrap gap-2">
                    {payload.actions.map((act, aIdx) => (
                      <button
                        key={aIdx}
                        onClick={() => handleAction(act)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#12D9F5] hover:text-white bg-[#0A1222] hover:bg-[#1557E8] px-3 py-1.5 rounded-md border border-[#12D9F5]/30 transition-all"
                      >
                        {act.type === 'retry' ? (
                          <RotateCw className="w-3 h-3" />
                        ) : (
                          <ArrowRight className="w-3 h-3" />
                        )}
                        <span>{act.label}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Suggestions Renderer */}
                {isAgent && payload?.suggestions && payload.suggestions.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-white/6 space-y-1.5">
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                      Suggested:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {payload.suggestions.map((sug, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => handleSend(sug.prompt)}
                          disabled={isLoading}
                          className="text-[11px] font-mono text-slate-300 hover:text-white bg-[#080E1A] hover:bg-[#142340] px-2.5 py-1 rounded border border-white/8 hover:border-[#12D9F5]/40 transition-colors text-left flex items-center gap-1"
                        >
                          <span>{sug.label}</span>
                          <ChevronRight className="w-2.5 h-2.5 text-[#12D9F5]" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Copy Button */}
                {isAgent && (
                  <button
                    onClick={() => copyToClipboard(msg.text, msg.id)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-white p-1 rounded transition-opacity"
                    title="Copy message"
                  >
                    {copiedId === msg.id ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}

        {/* Loading / Typing State */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2"
          >
            <div className="bg-[#10192D] border border-white/8 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#12D9F5] animate-ping" />
              <span>Formulating response...</span>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompt Chips Bar */}
      <div className="px-4 py-2 bg-[#0A101D] border-t border-white/8 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-slate-500 uppercase shrink-0">
            Suggested:
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {V2_SUGGESTED_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                disabled={isLoading}
                className="shrink-0 text-[11px] font-mono px-2.5 py-1 rounded bg-[#0F182A] hover:bg-[#1557E8]/20 text-slate-300 hover:text-white border border-white/8 hover:border-[#12D9F5]/40 transition-colors"
              >
                [ {prompt} ]
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input Bar */}
      <div className="p-3 sm:p-4 bg-[#0D1424] border-t border-white/8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask ALGorith AI Agent..."
            disabled={isLoading}
            className="flex-1 bg-[#070C16] border border-white/10 focus:border-[#12D9F5] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors font-mono"
          />

          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            aria-label="Send query"
            className="w-10 h-10 rounded-xl bg-[#1557E8] hover:bg-[#168CFF] disabled:bg-white/5 disabled:text-slate-600 text-white flex items-center justify-center transition-all shrink-0"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};
