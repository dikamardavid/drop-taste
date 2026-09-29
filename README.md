# 🎨 Drop Taste

> Multi-tenant Cloud Platform & Agentic Design Intelligence System.

Drop Taste captures real-world web inspiration into editable native Figma designs and empowers AI coding agents (Claude, Antigravity, GPT) to blend references into new designs using personal designer taste.

---

## 🏛️ Monorepo Architecture

```text
drop-taste/
├── apps/
│   ├── api/             # Cloud Ingestion, Auth & Intelligence API (REST + WebSocket)
│   ├── web/             # Web Dashboard (Taste Library, Detail Page, Connect Hub)
│   ├── extension/       # Chrome Extension Manifest v3 (Interactive Hover Inspector)
│   └── figma-plugin/    # Figma Plugin (Library Drag & Drop, "Blend with Drop Taste" Prompt Box)
├── packages/
│   ├── mcp/             # Drop Taste Model Context Protocol (MCP) Server
│   └── shared/          # Shared TypeScript types, schemas & Figma node serializers
├── docs/                # Architecture Decision Records (ADRs)
├── CONTEXT.md           # Ubiquitous Language & Domain Glossary
├── SPEC.md              # System Specification
└── TICKETS.md           # Tracer-bullet Roadmap & Multica Backlog
```

---

## 🚀 Key Pillars

1. **Precision Ingestion (Chrome Extension)**:
   - Interactive hover inspector with DOM element auto-detection (`<img>` as Image Asset, container as Component or Screen).
   - 1-click Page Capture serializing DOM hierarchy and computed styles.
2. **Taste Library & Connect Hub (Web Dashboard)**:
   - Cloud library with faceted category/tag search.
   - Detail view with 1-click "Copy to Figma" clipboard format.
   - Connect Hub for external agent setup, live session auditing, and 1-click token revocation.
3. **Agentic Design Intelligence (Drop Taste MCP)**:
   - MCP tools (`list_taste`, `search_taste`, `get_taste`, `blend_taste`).
   - Multi-modal synthesis combining visual and structural traits with explicit design reasoning.
4. **Native Canvas Integration (Figma Plugin)**:
   - Drag-and-drop reference import into native, editable Figma auto-layout frames.
   - In-plugin "Blend with Drop Taste" prompt box connecting to local user runtimes and models without proprietary vendor fees.

---

## 📋 Documentation & Specs

- [Domain Glossary & Ubiquitous Language (CONTEXT.md)](./CONTEXT.md)
- [System Specification (SPEC.md)](./SPEC.md)
- [Roadmap & Backlog (TICKETS.md)](./TICKETS.md)
- [ADR 0001: Cloud SaaS Architecture](./docs/adr/0001-cloud-saas-architecture.md)
- [ADR 0002: Clean-Slate Scaffold](./docs/adr/0002-clean-slate-scaffold.md)
