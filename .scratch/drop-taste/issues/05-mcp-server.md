# 05 — Drop Taste Model Context Protocol (MCP) Server

**What to build:**
A standalone Model Context Protocol (MCP) server that connects external AI coding assistants (Claude Desktop, Antigravity, Cursor, OpenAI) to the user's cloud Taste Library. Implements standard MCP tools (`list_taste`, `search_taste`, `get_taste`, `blend_taste`), authenticating with personal access tokens and logging agent queries to the user's audit trail on the cloud backend.

**Blocked by:**
01 — Cloud Backend Core, Auth & Multi-tenant Database Foundations
02 — Capture Ingestion API & Serializer Engine

**Status:**
ready-for-agent

- [ ] MCP Server CLI package supporting stdio transport and token-based cloud auth
- [ ] Tool implementation: `list_taste(category, type, limit)` and `search_taste(query, tags)`
- [ ] Tool implementation: `get_taste(id)` returning full DOM traits, metadata, and design tokens
- [ ] Tool implementation: `blend_taste(reference_ids, prompt)` returning multi-modal design code and explicit critique reasoning
- [ ] Session reporting middleware logging agent runtime client metadata to the cloud backend for audit visibility
- [ ] Protocol test suite validating JSON-RPC message contracts against MCP specification
