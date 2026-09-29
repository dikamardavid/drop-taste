# 01 — [Backend / MCP Engineer] Core Storage & Local Ingestion API

**Role:** Backend / MCP Engineer
**Status:** Todo
**Blocked by:** None — can start immediately
**Local Repo Path:** `/Users/goregadget/Multica Agentic/projects/drop-taste`

---

## What to build
The foundational filesystem storage (`inbox/`, `references/`, `assets/`) and a lightweight local HTTP ingestion daemon that receives POST payloads containing screenshot images, source URL, page title, initial tags, and reasoning text. Also provides the standard MCP tools `save_taste_reference` and `get_taste_item` over stdio JSON-RPC so AI agents can query raw or saved references.

---

## Acceptance Criteria
- [ ] Filesystem structure with `inbox/`, `references/`, and `assets/` created and managed.
- [ ] Local HTTP Ingestion server running on localhost (port 3847 / `/api/capture`) that accepts multipart/json payload with image and metadata.
- [ ] Ingested items are written to disk as structured `.json` + image asset in `inbox/`.
- [ ] MCP JSON-RPC protocol server running on stdio exposing `save_taste_reference` and `get_taste_item`.
- [ ] End-to-end test verifying that posting an image + metadata to the local API or saving via MCP allows retrieval via `get_taste_item`.
