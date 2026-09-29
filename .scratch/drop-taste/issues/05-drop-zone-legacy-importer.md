# 05 — [Tooling / DevOps Engineer] Local File Drop-Zone & Legacy Library Importer

**Role:** Tooling / DevOps Engineer
**Status:** Todo
**Blocked by:** 01 — [Backend / MCP Engineer] Core Storage & Local Ingestion API
**Local Repo Path:** `/Users/goregadget/Multica Agentic/projects/drop-taste`

---

## What to build
A local filesystem drop-zone watcher (watching `drop/`) that automatically ingests dragged-and-dropped or pasted image files into `inbox/`, plus a batch importer script capable of migrating existing design libraries (such as the 423 screenshots in `/taste-library` from Uber & Tripadvisor) into Drop-Taste format with proper metadata placeholders.

---

## Acceptance Criteria
- [ ] Folder watcher on `drop/` detects newly dropped image files, generates metadata stubs, and moves them into `inbox/`.
- [ ] Migration command/script reads from `/Users/goregadget/taste-library` (or custom folder path) and imports existing images into Drop-Taste without duplicating files destructively.
- [ ] Imported items appear in `inbox/` or as indexed references queryable by MCP search.
