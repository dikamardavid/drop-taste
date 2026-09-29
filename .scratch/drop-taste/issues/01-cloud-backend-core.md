# 01 — Cloud Backend Core, Auth & Multi-tenant Database Foundations

**What to build:**
A secure, multi-tenant Cloud Backend with user authentication (registration, login, JWT session management), relational/document database schemas for users, organizations, captures, design traits, and agent access tokens, plus personal access token generation and immediate token revocation APIs.

**Blocked by:**
None — can start immediately.

**Status:**
ready-for-agent

- [ ] User authentication endpoints (`POST /api/v1/auth/register`, `POST /api/v1/auth/login`, `GET /api/v1/auth/me`)
- [ ] Database schema supporting multi-tenant isolation (`users`, `captures`, `assets`, `agent_tokens`, `agent_sessions`)
- [ ] Token management endpoints (`POST /api/v1/agents/tokens`, `GET /api/v1/agents/tokens`, `DELETE /api/v1/agents/tokens/:id`)
- [ ] Automated integration test proving token revocation immediately denies subsequent requests with 401 Unauthorized
