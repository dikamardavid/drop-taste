# 0001 — Cloud SaaS Architecture for Mass Multi-User Deployment

To support mass multi-user adoption, Drop Taste will be hosted as a multi-tenant Cloud SaaS platform with central authentication, user databases, and cloud asset storage, while delegating agent AI execution to user-controlled runtimes via a local MCP bridge.

## Consequences

- The web dashboard, user authentication, and reference library are accessible anywhere across devices.
- Designers do not need to keep a local daemon running 24/7 just to browse or capture references.
- External agent runtimes (Claude, Antigravity, local LLMs) connect via personal access tokens through the Drop Taste MCP server.
- The Figma plugin connects to the cloud backend for asset fetching, and optionally interfaces with local agent runtimes on `localhost` for zero-cost blending.
