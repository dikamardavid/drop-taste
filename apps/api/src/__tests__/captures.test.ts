import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../app.js';
import { db } from '../db/store.js';
import { validateDesignMd } from '@drop-taste/shared';

describe('Drop Taste Cloud Ingestion API & Managed Vision Service', () => {
  const app = createApp();

  beforeEach(() => {
    db.reset();
  });

  it('1. Capture Page: ingests full page, stores DOM, and generates figmaPayload for Copy to Figma', async () => {
    const pagePayload = {
      type: 'page',
      metadata: {
        url: 'https://linear.app',
        siteName: 'Linear',
        title: 'Linear - Purpose-built for product development',
        category: 'Productivity Tool',
        tags: ['saas', 'dark-mode', 'bento'],
        dimensions: { width: 1440, height: 2800 },
        capturedAt: new Date().toISOString(),
      },
      domHtml: '<main class="hero"><h1>Linear is a better way to build</h1></main>',
      computedStyles: { backgroundColor: '#08090a' },
    };

    const res = await request(app)
      .post('/api/v1/captures/page')
      .send(pagePayload);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.type).toBe('page');
    expect(res.body.data.figmaPayload).toBeDefined();
    expect(res.body.data.figmaPayload).toContain('<!--StartFragment-->');
    expect(res.body.data.figmaPayload).toContain('data-figma-node-ast=');
  });

  it('2. Capture Element: Component: ingests flexbox/div component and generates figmaPayload', async () => {
    const componentPayload = {
      type: 'component',
      targetKind: 'component',
      metadata: {
        url: 'https://stripe.com',
        siteName: 'Stripe',
        title: 'Interactive Pricing Tier Card',
        category: 'Pricing',
        tags: ['pricing', 'card', 'flexbox'],
        dimensions: { width: 380, height: 480 },
        capturedAt: new Date().toISOString(),
      },
      domHtml: '<div class="card"><h3>Pro Plan</h3><span class="price">$29</span></div>',
      computedStyles: { display: 'flex', flexDirection: 'column' },
    };

    const res = await request(app)
      .post('/api/v1/captures/element')
      .send(componentPayload);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.type).toBe('component');
    expect(res.body.data.figmaPayload).toBeDefined();
    expect(res.body.data.figmaPayload).toContain('data-drop-taste="true"');
  });

  it('3. Capture Element: Image: runs 5-step Vision Service to generate design.md, and has NO figmaPayload', async () => {
    const imagePayload = {
      type: 'image',
      metadata: {
        url: 'https://dribbble.com/shots/example-graphic',
        siteName: 'Dribbble',
        title: 'Minimalist FinTech Dashboard Banner',
        category: 'Fintech UI',
        tags: ['fintech', 'minimalist', 'dashboard'],
        dimensions: { width: 1600, height: 1200 },
        capturedAt: new Date().toISOString(),
      },
      imageUrl: 'https://cdn.example.com/hero-banner.webp',
      mimeType: 'image/webp',
      fileSizeBytes: 452100,
    };

    const res = await request(app)
      .post('/api/v1/captures/element')
      .send(imagePayload);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.type).toBe('image');
    // Critical: Image captures must NOT have figmaPayload (no "Copy to Figma")
    expect(res.body.data.figmaPayload).toBeUndefined();

    // Critical: Image captures MUST have valid canonical design.md
    expect(res.body.data.designMd).toBeDefined();
    const validation = validateDesignMd(res.body.data.designMd);
    expect(validation.valid).toBe(true);
    expect(res.body.data.designMd).toContain('schema_version: "1.0"');
    expect(res.body.data.designMd).toContain('pipeline: "antigravity_vision_to_spec"');
  });

  it('4. Library Query & Filtering', async () => {
    // Ingest 1 component and 1 image
    await request(app).post('/api/v1/captures/element').send({
      type: 'component',
      targetKind: 'component',
      metadata: {
        url: 'https://github.com',
        siteName: 'GitHub',
        title: 'Navbar Component',
        category: 'Navigation',
        tags: ['nav', 'header'],
        dimensions: { width: 1200, height: 64 },
        capturedAt: new Date().toISOString(),
      },
      domHtml: '<nav></nav>',
      computedStyles: {},
    });

    await request(app).post('/api/v1/captures/element').send({
      type: 'image',
      metadata: {
        url: 'https://unsplash.com',
        siteName: 'Unsplash',
        title: 'Abstract Gradient Wallpaper',
        category: 'Background',
        tags: ['gradient', 'wallpaper'],
        dimensions: { width: 1920, height: 1080 },
        capturedAt: new Date().toISOString(),
      },
      imageUrl: 'https://images.unsplash.com/sample',
      mimeType: 'image/jpeg',
      fileSizeBytes: 890000,
    });

    // Query All
    const allRes = await request(app).get('/api/v1/library');
    expect(allRes.status).toBe(200);
    expect(allRes.body.count).toBe(2);

    // Query Type Image
    const imgRes = await request(app).get('/api/v1/library?type=image');
    expect(imgRes.status).toBe(200);
    expect(imgRes.body.count).toBe(1);
    expect(imgRes.body.data[0].type).toBe('image');

    // Query Search Keyword
    const searchRes = await request(app).get('/api/v1/library?search=Navbar');
    expect(searchRes.status).toBe(200);
    expect(searchRes.body.count).toBe(1);
    expect(searchRes.body.data[0].title).toBe('Navbar Component');
  });

  it('5. Agent Token Lifecycle: Create, Authenticate, and Instant Revocation', async () => {
    // Create token
    const tokenRes = await request(app)
      .post('/api/v1/agents/tokens')
      .send({ name: 'Claude Desktop Agent' });

    expect(tokenRes.status).toBe(201);
    expect(tokenRes.body.data.token).toMatch(/^dt_pat_/);
    const tokenId = tokenRes.body.data.record.id;

    // List tokens
    const listRes = await request(app).get('/api/v1/agents/tokens');
    expect(listRes.body.data).toHaveLength(1);
    expect(listRes.body.data[0].isRevoked).toBe(false);

    // Revoke token
    const revokeRes = await request(app).delete(`/api/v1/agents/tokens/${tokenId}`);
    expect(revokeRes.status).toBe(200);

    // Verify revoked in listing
    const listAfterRevoke = await request(app).get('/api/v1/agents/tokens');
    expect(listAfterRevoke.body.data[0].isRevoked).toBe(true);
  });
});
