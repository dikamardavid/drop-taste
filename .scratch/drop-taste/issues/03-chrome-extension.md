# 03 — Chrome Extension Interactive Hover Inspector & Capture Flow

**What to build:**
A Chrome Extension (Manifest v3) featuring an interactive hover inspector. Moving the mouse highlights DOM elements with an outline and badge. Clicking an `<img>`/canvas/SVG automatically captures an Image Asset. Clicking a container element displays an in-page modal with a dropdown (`1. Component`, `2. Screen`), element name, and auto-populated site/URL/tags/category fields, sending the payload to the Cloud Ingestion API. Also includes a 1-click Page Capture action.

**Blocked by:**
02 — Capture Ingestion API & Serializer Engine

**Status:**
ready-for-agent

- [ ] Extension popup UI with "Capture Page" and "Inspect Element" action buttons
- [ ] Content script interactive hover inspector with blue outline overlay and element tag pills
- [ ] Direct Image Asset detection: clicking `<img>` bypasses component form and directly saves image
- [ ] Container capture modal with dropdown (`Component` vs `Screen`) and editable auto-filled fields (name, URL, tags, category)
- [ ] Full-page DOM and screenshot serializing engine sending payload to `POST /api/v1/captures/page`
- [ ] E2E/mock browser test verifying hover activation, element classification, and ingestion dispatch
