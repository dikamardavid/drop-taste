import crypto from 'node:crypto';
import {
  PageCapturePayload,
  ComponentCapturePayload,
  ImageCapturePayload,
  createFigmaClipboardPayload,
  FigmaFrameNode,
} from '@drop-taste/shared';
import { db, CaptureItem } from '../db/store.js';
import { visionService } from './vision.service.js';

export class CapturesService {
  public async savePage(userId: string, payload: PageCapturePayload): Promise<CaptureItem> {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();

    const fallbackAst: FigmaFrameNode = (payload.figmaAst as FigmaFrameNode) || {
      id: `frame_${id}`,
      name: payload.metadata.title,
      type: 'FRAME',
      layoutMode: 'VERTICAL',
      primaryAxisAlignItems: 'MIN',
      counterAxisAlignItems: 'MIN',
      paddingTop: 24,
      paddingRight: 24,
      paddingBottom: 24,
      paddingLeft: 24,
      itemSpacing: 16,
      width: payload.metadata.dimensions?.width || 1440,
      height: payload.metadata.dimensions?.height || 900,
      layoutSizingHorizontal: 'FIXED',
      layoutSizingVertical: 'HUG',
      fills: [{ type: 'SOLID', color: { r: 0.98, g: 0.98, b: 0.98, a: 1 } }],
      children: [],
    };

    const figmaPayload = createFigmaClipboardPayload(fallbackAst);

    const item: CaptureItem = {
      id,
      userId,
      type: 'page',
      title: payload.metadata.title || 'Untitled Page Capture',
      sourceUrl: payload.metadata.url,
      siteName: payload.metadata.siteName,
      category: payload.metadata.category || 'Website Layout',
      tags: payload.metadata.tags || ['page', 'full-page'],
      dimensions: payload.metadata.dimensions || { width: 1440, height: 900 },
      thumbnailUrl: payload.thumbnailUrl,
      domHtml: payload.domHtml,
      computedStyles: payload.computedStyles,
      figmaAst: fallbackAst,
      figmaPayload,
      createdAt: now,
      updatedAt: now,
    };

    db.captures.set(id, item);
    return item;
  }

  public async saveComponent(userId: string, payload: ComponentCapturePayload): Promise<CaptureItem> {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();

    const fallbackAst: FigmaFrameNode = (payload.figmaAst as FigmaFrameNode) || {
      id: `comp_${id}`,
      name: payload.metadata.title,
      type: 'FRAME',
      layoutMode: 'HORIZONTAL',
      primaryAxisAlignItems: 'CENTER',
      counterAxisAlignItems: 'CENTER',
      paddingTop: 16,
      paddingRight: 16,
      paddingBottom: 16,
      paddingLeft: 16,
      itemSpacing: 12,
      width: payload.metadata.dimensions?.width || 320,
      height: payload.metadata.dimensions?.height || 80,
      layoutSizingHorizontal: 'HUG',
      layoutSizingVertical: 'HUG',
      fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1, a: 1 } }],
      cornerRadius: 8,
      children: [],
    };

    const figmaPayload = createFigmaClipboardPayload(fallbackAst);

    const item: CaptureItem = {
      id,
      userId,
      type: 'component',
      title: payload.metadata.title || 'Untitled Component',
      sourceUrl: payload.metadata.url,
      siteName: payload.metadata.siteName,
      category: payload.metadata.category || 'UI Component',
      tags: payload.metadata.tags || ['component', payload.targetKind],
      dimensions: payload.metadata.dimensions || { width: 320, height: 80 },
      thumbnailUrl: payload.thumbnailUrl,
      domHtml: payload.domHtml,
      computedStyles: payload.computedStyles,
      figmaAst: fallbackAst,
      figmaPayload,
      createdAt: now,
      updatedAt: now,
    };

    db.captures.set(id, item);
    return item;
  }

  public async saveImage(userId: string, payload: ImageCapturePayload): Promise<CaptureItem> {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();

    // Trigger internal Drop Taste Cloud Vision Service
    const designMd = await visionService.processImage({
      imageName: payload.metadata.title || 'Captured Graphic',
      imageUrl: payload.imageUrl,
      width: payload.metadata.dimensions?.width || 1200,
      height: payload.metadata.dimensions?.height || 800,
      mimeType: payload.mimeType,
    });

    const item: CaptureItem = {
      id,
      userId,
      type: 'image',
      title: payload.metadata.title || 'Untitled Image Reference',
      sourceUrl: payload.metadata.url,
      siteName: payload.metadata.siteName,
      category: payload.metadata.category || 'Image Reference',
      tags: payload.metadata.tags || ['image', 'visual-reference'],
      dimensions: payload.metadata.dimensions || { width: 1200, height: 800 },
      assetUrl: payload.imageUrl,
      thumbnailUrl: payload.imageUrl,
      designMd,
      // Note: Image captures deliberately have NO figmaPayload (no "Copy to Figma" button)
      createdAt: now,
      updatedAt: now,
    };

    db.captures.set(id, item);
    return item;
  }

  public list(query: {
    userId?: string;
    type?: string;
    category?: string;
    search?: string;
  }): CaptureItem[] {
    let results = Array.from(db.captures.values());

    if (query.userId) {
      results = results.filter((item) => item.userId === query.userId);
    }
    if (query.type && query.type !== 'all') {
      results = results.filter((item) => item.type === query.type);
    }
    if (query.category) {
      results = results.filter((item) =>
        item.category.toLowerCase().includes(query.category!.toLowerCase())
      );
    }
    if (query.search) {
      const s = query.search.toLowerCase();
      results = results.filter(
        (item) =>
          item.title.toLowerCase().includes(s) ||
          item.siteName.toLowerCase().includes(s) ||
          item.tags.some((tag) => tag.toLowerCase().includes(s))
      );
    }

    // Sort newest first
    return results.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
  }

  public getById(id: string): CaptureItem | undefined {
    return db.captures.get(id);
  }
}

export const capturesService = new CapturesService();
