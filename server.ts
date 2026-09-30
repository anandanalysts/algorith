import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '1mb' }));

// Simple in-memory server-side IP rate limiter
const ipRequests = new Map<string, { count: number; resetTime: number }>();
const MAX_REQUESTS_PER_MINUTE = 30;

function rateLimitMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const record = ipRequests.get(ip);

  if (!record || now > record.resetTime) {
    ipRequests.set(ip, { count: 1, resetTime: now + 60000 });
    return next();
  }

  if (record.count >= MAX_REQUESTS_PER_MINUTE) {
    return res.status(429).json({
      error: 'Rate limit exceeded. Please try again later.'
    });
  }

  record.count++;
  next();
}

const ALGORITH_SYSTEM_PROMPT = `
You are the official ALGorith AI Agent for ALGorith Technologies (www.algorith.in).
Positioning: AI • Software • Data • Automation.
Philosophy: THINK. BUILD. AUTOMATE. GROW.

Core Products:
1. ALGorith AI: AI and intelligent agent ecosystem, deterministic RAG, multi-agent task delegation.
2. ALGorith CRM: Context-aware customer relationship engine, AI lead scoring, unified customer timeline.
3. ALGorith ERP: Modular enterprise operations, multi-entity accounting, automated inventory forecasting.
4. ALGorith Analytics: Real-time telemetry, sub-50ms visual KPI cockpits, automated anomaly detection.

Core Solutions:
- AI & Automation: Autonomous agents, self-healing workflow pipelines.
- Software & Business Systems: Custom web platforms, SaaS, CRM and ERP.
- Data & Analytics: Centralized lakehouses, predictive forecasting.
- Digital Transformation: Legacy monolith modernization, cloud architecture.

Core Principles:
- Engineering first, deterministic AI, zero vendor lock-in, 100% client IP ownership, zero data retention, private VPC deployments.

Guidelines:
- Give concise, direct, technically precise answers.
- Never hallucinate false company credentials, awards, or nonexistent features.
- If a user asks something you cannot verify, clearly state you don't have enough verified information and offer to connect them with the team at contact@algorith.in.
- Format responses cleanly with brief bullet points where helpful.
`;

// AI Agent Server-Side Proxy Endpoint
app.post('/api/ai-agent', rateLimitMiddleware, async (req, res) => {
  const { query, history, requestId } = req.body;

  if (!query || typeof query !== 'string' || query.trim().length === 0) {
    return res.status(400).json({ error: 'Valid query parameter is required.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    // Graceful fallback trigger if API key is not configured in environment
    return res.status(503).json({ error: 'Primary AI provider key not configured.' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    // Format chat history for context
    const formattedHistory = Array.isArray(history)
      ? history.slice(-6).map((h: { sender: string; text: string }) => ({
          role: h.sender === 'user' ? 'user' : 'model',
          parts: [{ text: String(h.text) }]
        }))
      : [];

    const contents = [
      ...formattedHistory,
      { role: 'user', parts: [{ text: query.trim() }] }
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config: {
        systemInstruction: ALGORITH_SYSTEM_PROMPT,
        temperature: 0.2,
        maxOutputTokens: 600
      }
    });

    const responseText = response.text || '';

    if (!responseText.trim()) {
      return res.status(502).json({ error: 'Empty response from model.' });
    }

    return res.json({
      id: `ai-resp-${Date.now()}`,
      mode: 'ai',
      category: 'company',
      message: responseText.trim(),
      confidence: 'high',
      source: {
        type: 'ai_model',
        label: 'ALGorith AI Agent'
      },
      suggestions: [
        {
          label: 'What does ALGorith build?',
          prompt: 'What does ALGorith build?'
        },
        {
          label: 'Explore products',
          prompt: 'Show me ALGorith products.'
        }
      ],
      actions: [
        {
          label: 'Start a Project',
          type: 'start_project'
        }
      ],
      metadata: {
        provider: 'gemini',
        requestId: requestId || `ALG-${Date.now()}`
      }
    });
  } catch (error: unknown) {
    console.error(`[AI Agent Error - Request ID: ${requestId}]`, (error as Error).message);
    return res.status(500).json({ error: 'Internal provider processing error.' });
  }
});

// Mount Vite or static server
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[ALGorith Platform Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
