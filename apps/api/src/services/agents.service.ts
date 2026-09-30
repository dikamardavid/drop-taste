import crypto from 'node:crypto';
import { db, AgentToken, AgentSession } from '../db/store.js';

export class AgentsService {
  public createToken(userId: string, name: string): { token: string; record: AgentToken } {
    const rawSecret = crypto.randomBytes(32).toString('hex');
    const token = `dt_pat_${rawSecret}`;
    const tokenHash = db.hashToken(token);
    const id = crypto.randomUUID();
    const now = new Date().toISOString();

    const record: AgentToken = {
      id,
      userId,
      tokenHash,
      tokenSecretPrefix: token.slice(0, 14) + '...',
      name: name || 'Agent Token',
      createdAt: now,
      isRevoked: false,
    };

    db.agentTokens.set(id, record);
    return { token, record };
  }

  public validateToken(rawToken: string): AgentToken | null {
    if (!rawToken || !rawToken.startsWith('dt_pat_')) return null;
    const hash = db.hashToken(rawToken);

    for (const record of db.agentTokens.values()) {
      if (record.tokenHash === hash) {
        if (record.isRevoked) {
          return null; // Instant revocation takes effect immediately
        }
        record.lastUsedAt = new Date().toISOString();
        return record;
      }
    }

    return null;
  }

  public revokeToken(tokenId: string): boolean {
    const record = db.agentTokens.get(tokenId);
    if (!record) return false;
    record.isRevoked = true;
    return true;
  }

  public listTokens(userId: string): AgentToken[] {
    return Array.from(db.agentTokens.values()).filter((t) => t.userId === userId);
  }

  public logSession(
    tokenId: string,
    clientName: string,
    hostOs: string
  ): AgentSession {
    const sessionId = `sess_${tokenId}_${clientName}`;
    const now = new Date().toISOString();

    let session = db.agentSessions.get(sessionId);
    if (session) {
      session.queryCount += 1;
      session.lastActiveAt = now;
    } else {
      session = {
        id: sessionId,
        tokenId,
        clientName,
        hostOs,
        queryCount: 1,
        lastActiveAt: now,
      };
      db.agentSessions.set(sessionId, session);
    }

    return session;
  }

  public listSessions(userId: string): AgentSession[] {
    const userTokenIds = new Set(
      Array.from(db.agentTokens.values())
        .filter((t) => t.userId === userId)
        .map((t) => t.id)
    );

    return Array.from(db.agentSessions.values()).filter((s) => userTokenIds.has(s.tokenId));
  }
}

export const agentsService = new AgentsService();
