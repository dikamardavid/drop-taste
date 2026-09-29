# 06 — Figma Plugin: Library Browser & Drag-and-Drop Canvas Reconstruction

**What to build:**
A Figma Plugin with Drop Taste cloud authentication, displaying a searchable reference library inside Figma. Designers can drag and drop or click any saved component, screen, or page to instantiate it directly on the canvas as fully editable, native Figma auto-layout frames, text layers, and vectors.

**Blocked by:**
02 — Capture Ingestion API & Serializer Engine
04 — Web Dashboard: Library, Detail Page, Profile, Connect & Agent Token Management

**Status:**
ready-for-agent

- [ ] Figma Plugin manifest, UI sandbox, and main context scaffolding
- [ ] User login flow inside plugin iframe connecting to Drop Taste Cloud API
- [ ] Visual reference library grid with search, tags, and category filtering inside the plugin UI
- [ ] Drag-and-drop event listener and message passing between plugin UI and main context
- [ ] Native Figma node builder generating auto-layout frames, fills, borders, corner radii, and text nodes from serialized schemas
- [ ] Test suite verifying accurate Figma node tree generation from sample component schemas
