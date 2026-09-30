import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { capturesService } from './services/captures.service.js';
import { agentsService } from './services/agents.service.js';

export function createApp(): express.Express {
  const app: express.Express = express();

  app.use(cors());
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Demo user identifier for development & mock auth
  const getUserId = (req: Request) => (req.headers['x-user-id'] as string) || 'usr_default';

  // --- Health Check ---
  app.get('/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', service: 'drop-taste-api', timestamp: new Date().toISOString() });
  });

  // --- Captures Ingestion Routes ---
  app.post('/api/v1/captures/page', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = getUserId(req);
      const item = await capturesService.savePage(userId, req.body);
      res.status(201).json({ success: true, data: item });
    } catch (err) {
      next(err);
    }
  });

  app.post('/api/v1/captures/element', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = getUserId(req);
      const { type } = req.body;

      if (type === 'image') {
        const item = await capturesService.saveImage(userId, req.body);
        res.status(201).json({ success: true, data: item });
      } else if (type === 'component') {
        const item = await capturesService.saveComponent(userId, req.body);
        res.status(201).json({ success: true, data: item });
      } else {
        res.status(400).json({ success: false, error: 'Invalid element capture type. Must be "component" or "image".' });
      }
    } catch (err) {
      next(err);
    }
  });

  // --- Taste Library Routes ---
  app.get('/api/v1/library', (req: Request, res: Response) => {
    const userId = getUserId(req);
    const { type, category, search } = req.query as Record<string, string>;
    const items = capturesService.list({ userId, type, category, search });
    res.json({ success: true, count: items.length, data: items });
  });

  app.get('/api/v1/library/:id', (req: Request, res: Response) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const item = capturesService.getById(id);
    if (!item) {
      res.status(404).json({ success: false, error: 'Capture not found' });
      return;
    }
    res.json({ success: true, data: item });
  });

  // --- Agent Token & Session Routes ---
  app.post('/api/v1/agents/tokens', (req: Request, res: Response) => {
    const userId = getUserId(req);
    const { name } = req.body;
    const result = agentsService.createToken(userId, name || 'Agent Token');
    res.status(201).json({ success: true, data: result });
  });

  app.get('/api/v1/agents/tokens', (req: Request, res: Response) => {
    const userId = getUserId(req);
    const tokens = agentsService.listTokens(userId);
    res.json({ success: true, data: tokens });
  });

  app.delete('/api/v1/agents/tokens/:id', (req: Request, res: Response) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const success = agentsService.revokeToken(id);
    if (!success) {
      res.status(404).json({ success: false, error: 'Token not found' });
      return;
    }
    res.json({ success: true, message: 'Token revoked successfully' });
  });

  app.get('/api/v1/agents/sessions', (req: Request, res: Response) => {
    const userId = getUserId(req);
    const sessions = agentsService.listSessions(userId);
    res.json({ success: true, data: sessions });
  });

  // Global Error Handler
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('[API Error]:', err);
    res.status(500).json({ success: false, error: err.message || 'Internal Server Error' });
  });

  return app;
}
