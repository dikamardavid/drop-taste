# 0002 — Clean-Slate Modular Architecture Scaffold

We will scaffold a fresh, modular monorepo structure separating the Cloud Backend API, Chrome Extension, Web Dashboard, Figma Plugin, and MCP Server, replacing previous monolithic prototypes.

## Consequences

- Prevents legacy prototype dependencies (local filesystem path assumptions, single-user JSON locks) from polluting multi-user SaaS production code.
- Each client surface (Chrome Extension, Figma Plugin, Web Dashboard, MCP Server) maintains clean boundaries and communicates with the backend via a typed API contract.
