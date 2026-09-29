# 02 — [Backend / Data Architect] Reasoning Schema & Async Triage Pipeline

**Role:** Backend / Data Architect
**Status:** Todo
**Blocked by:** 01 — [Backend / MCP Engineer] Core Storage & Local Ingestion API
**Local Repo Path:** `/Users/goregadget/Multica Agentic/projects/drop-taste`

---

## What to build
A structured critique & reasoning data model that captures "What caught my eye", "Why I like this", "What feels wrong", and "What I would change". Provides a triage mechanism to promote items from `inbox/` to `reviewed/<category>/` as Markdown files with YAML frontmatter, and adds the MCP tool `search_taste_references` to query references by reasoning keywords, tags, or layout category.

---

## Acceptance Criteria
- [ ] Standardized Markdown template with YAML frontmatter for reviewed references containing critique sections.
- [ ] Triage function/CLI command to move items from `inbox/` to `reviewed/<category>/` once reasoning criteria are provided.
- [ ] MCP tool `search_taste_references` supports querying by free-text keywords across reasoning notes, tags, and category filters.
- [ ] End-to-end test verifying promotion of an inbox item to reviewed and subsequent search retrieval via MCP.
