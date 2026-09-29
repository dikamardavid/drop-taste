# 03 — [Frontend / Extension Engineer] Browser Fast-Capture & Reasoning Extension

**Role:** Frontend / Extension Engineer
**Status:** Todo
**Blocked by:** 01 — [Backend / MCP Engineer] Core Storage & Local Ingestion API
**Local Repo Path:** `/Users/goregadget/Multica Agentic/projects/drop-taste`

---

## What to build
A Chrome/Chromium browser extension with shortcut `Cmd+Shift+S` (or icon click) that captures the visible tab/viewport, extracts URL and page title, presents 1-click tag pills (`#typography`, `#density`, `#table`, `#layout`, `#color`), and offers a Dual-Mode reasoning input (1-line quick note or an expandable 3-field critique form). The extension dispatches the captured payload directly to the Local Ingestion API.

---

## Acceptance Criteria
- [x] Manifest v3 Chrome extension with permissions for activeTab, scripting, and storage.
- [x] Shortcut `Cmd+Shift+S` triggers viewport capture via `chrome.tabs.captureVisibleTab`.
- [x] Extension popup/overlay displays preview thumbnail, automated page title/URL, quick tag pills, and dual-mode reasoning inputs.
- [x] Payload successfully posts to the local Drop-Taste HTTP Ingestion endpoint with proper error handling if the local server is offline.
- [x] If deep reasoning fields are filled, payload marks item as pre-reviewed so it lands directly in `reviewed/`.
