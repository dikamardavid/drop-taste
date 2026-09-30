import crypto from 'node:crypto';
import { CaptureType, CaptureDimensions, FigmaNode } from '@drop-taste/shared';

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface CaptureItem {
  id: string;
  userId: string;
  type: CaptureType;
  title: string;
  sourceUrl: string;
  siteName: string;
  category: string;
  tags: string[];
  dimensions: CaptureDimensions;
  thumbnailUrl?: string;
  assetUrl?: string;
  domHtml?: string;
  computedStyles?: Record<string, unknown>;
  figmaAst?: FigmaNode;
  figmaPayload?: string; // HTML dual-MIME payload for Cmd+V
  designMd?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AgentToken {
  id: string;
  userId: string;
  tokenHash: string;
  tokenSecretPrefix: string;
  name: string;
  createdAt: string;
  lastUsedAt?: string;
  isRevoked: boolean;
}

export interface AgentSession {
  id: string;
  tokenId: string;
  clientName: string;
  hostOs: string;
  queryCount: number;
  lastActiveAt: string;
}

export class MemoryStore {
  public users = new Map<string, User>();
  public captures = new Map<string, CaptureItem>();
  public agentTokens = new Map<string, AgentToken>();
  public agentSessions = new Map<string, AgentSession>();

  constructor() {
    // Seed default demo user
    const defaultUser: User = {
      id: 'usr_default',
      email: 'designer@droptaste.dev',
      name: 'Lead Designer',
      createdAt: new Date().toISOString(),
    };
    this.users.set(defaultUser.id, defaultUser);
  }

  public hashToken(rawToken: string): string {
    return crypto.createHash('sha256').update(rawToken).digest('hex');
  }

  public reset(): void {
    this.captures.clear();
    this.agentTokens.clear();
    this.agentSessions.clear();
  }
}

export const db = new MemoryStore();
