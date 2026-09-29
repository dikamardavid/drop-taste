# Drop Taste Specification

## Problem Statement

UI/UX designers, graphic designers, and illustrators constantly collect visual inspiration from around the web. However, current workflows are highly fragmented and painful:
1. Capturing inspiration requires clunky screenshots that lose all underlying layout semantics, DOM hierarchy, typography, colors, and responsive flexbox structures.
2. Turning an inspiration screenshot into an editable Figma design requires tedious manual recreation from scratch.
3. Designers have no streamlined way to pass their curated design taste and reference libraries to AI coding agents (such as Claude, Antigravity, or GPT) or to blend multiple inspirations together using their own AI models and local runtime without paying proprietary vendor lock-in fees.
4. Organizing, categorizing, and managing agent access to design assets across multiple machines and tools lacks a centralized, multi-tenant home.

## Solution

Drop Taste is an integrated, agentic design intelligence platform with four interconnected pillars:
1. **Chrome Extension (Precision Ingestion)**:
   - **Page Capture**: Captures the entire webpage DOM, computed styles, and visual representation into clean code that can be immediately pasted into Figma as editable native designs.
   - **Element Capture (Interactive Hover Inspector)**: Allows designers to hover over any DOM element. If the element is an image, it is automatically cataloged as an Image Asset. If it is a container/flexbox/div, the designer can classify it as a **Component** or **Screen**, with auto-populated website name, URL, tags, and category.
2. **Web Dashboard & Taste Library**:
   - Centralized cloud library showing all captured pages, components, screens, and images.
   - Detail view with automated metadata and a 1-click **"Copy to Figma"** button (placing native Figma clipboard data onto the system clipboard).
   - Dedicated **Connect** hub with agent integration guides, live audit history of connected agent sessions, and instant 1-click token revocation.
   - User profile and authentication for multi-user, mass-market hosting.
3. **Drop Taste MCP Server (Agentic Bridge)**:
   - Model Context Protocol server connecting external AI coding assistants (Claude Desktop, Antigravity, Cursor, OpenAI) to the designer's personal library.
   - Empowers agents to execute functions such as `"use_droptaste as reference to create new design profile page"` or `"use_droptaste to blend this design page from reference library"`.
   - Returns multi-modal composite output: synthesized design code alongside explicit design critique and trait blending rationale.
4. **Drop Taste Figma Plugin**:
   - Authenticated access to the user's cloud Taste Library directly within Figma.
   - Drag-and-drop or 1-click canvas insertion of saved components and pages as 100% native, editable Figma auto-layout nodes.
   - **"Blend with Drop Taste"** prompt box: An in-canvas modal dialog that routes prompts to the user's local agent runtime or personal API keys (zero Figma AI fees) to synthesize new variations directly into Figma.

## User Stories

1. As a UI/UX designer, I want to capture a full webpage with one click from my browser, so that the underlying layout structure is preserved as editable Figma code without manual screenshot redrawing.
2. As a designer, I want an interactive hover inspector in Chrome that highlights DOM elements with a bounding box, so that I can visually select the exact element I wish to capture.
3. As a designer, when I hover and click on an image element (`<img>`, background image, canvas, svg), I want the extension to automatically detect it and save it as an Image Asset, so that I don't have to fill out unnecessary component forms for simple pictures.
4. As a designer, when I click on a flexbox or container element, I want a modal to appear with a dropdown to classify it as either a "Component" or a "Screen", so that my library stays properly categorized.
5. As a designer, I want the extension to automatically detect and populate the website name, source URL, suggested tags, and website category, so that I can capture inspirations rapidly without tedious typing.
6. As a designer, I want to edit or add custom tags and names in the extension popup before confirming a capture, so that my references reflect my specific taxonomy.
7. As a web user, I want a centralized cloud web dashboard, so that I can access and browse all my captured references from any computer without relying on a local background daemon.
8. As a designer, I want to filter my Taste Library by category, tags, asset type (Component, Screen, Image, Page), and source website, so that I can quickly find the exact inspiration I need during a design sprint.
9. As a designer, I want a detail view for each captured item showing its preview, extracted design traits, source metadata, and associated tags, so that I have full context on the reference.
10. As a designer, I want a "Copy to Figma" button on every component and page detail view, so that I can simply press `Cmd+V` in Figma and immediately get editable auto-layout frames and text layers.
11. As a designer, I want a Profile page where I can manage my account credentials and subscription preferences, so that my personal identity is securely managed.
12. As a security-conscious user, I want a "Connect" page in the dashboard with clear, step-by-step instructions on connecting AI agents (Claude, Antigravity, GPT) via MCP, so that onboarding is effortless.
13. As an AI developer or designer, I want to see a live audit history of all external agent runtimes connected to my library, showing agent name, runtime environment, last active timestamp, and query history, so that I have complete visibility into agent activities.
14. As a user, I want to be able to revoke any agent's access token immediately from the Connect page, so that compromised or unused tokens are instantly blocked from accessing my references.
15. As an AI agent user, I want to run natural language instructions like `"use_droptaste as reference to create a checkout page"`, so that the agent automatically queries my library for relevant checkout patterns and uses them as guidance.
16. As an AI agent user, I want to instruct an agent to `"use_droptaste to blend this design page from reference library"`, so that the agent combines aesthetic and layout traits from multiple references into a cohesive new layout.
17. As a designer, I want the agent's blending response to include multi-modal reasoning explaining which traits were taken from which reference (e.g. typography from Ref A, spacing from Ref B), so that I understand the design decisions.
18. As a Figma designer, I want to install a Drop Taste Figma Plugin and log in using my Drop Taste account credentials, so that my entire cloud library is accessible inside Figma.
19. As a Figma designer, I want to drag and drop any saved card, navigation bar, or page from the plugin panel straight onto my Figma canvas, so that it renders instantly as fully editable Figma nodes.
20. As a designer, I want a "Blend with Drop Taste" button in the Figma plugin that opens an interactive prompt box, so that I can request AI layout syntheses directly inside my design canvas.
21. As a cost-conscious designer, I want the "Blend with Drop Taste" feature to utilize my own local agent runtime or personal API keys rather than expensive third-party Figma AI subscriptions, so that I retain full control over costs and models.
22. As an illustrator or graphic designer, I want to save high-resolution imagery and vector elements into dedicated visual reference folders, so that I can build thematic moodboards alongside UI components.
23. As a mobile designer, I want captured mobile screens to retain mobile viewport constraints and touch target specifications, so that responsive layouts translate accurately to mobile Figma artboards.
24. As a team lead, I want cloud multi-tenancy with secure tenant isolation, so that our organization's proprietary design captures are private to our account.
25. As a developer, I want the browser extension and Figma plugin to communicate with standard REST and WebSocket endpoints, so that connection states are real-time and resilient to transient network drops.

## Implementation Decisions

### 1. Architectural Shape & Multi-Tenancy (ADR 0001)
- The backend is a cloud-hosted, multi-tenant service providing standard RESTful JSON APIs and WebSocket channels.
- Multi-tenancy is enforced at the database level with strict user/organization boundary isolation (`user_id` / `workspace_id`).
- Cloud object storage stores raw screenshot captures, image assets, and structured DOM serialization bundles.

### 2. High-Seam Unified API Contract
The central seam for all interactions across Extension, Dashboard, Plugin, and MCP Server is the Drop Taste Ingestion & Intelligence API:
- `POST /api/v1/auth/*`: Registration, login, session tokens, and personal access token creation.
- `POST /api/v1/captures/page`: Ingests full-page DOM trees, computed styles, metadata, and visual thumbnail.
- `POST /api/v1/captures/element`: Ingests element DOM, computed styles, classification (`component` | `screen` | `image`), and auto-extracted metadata.
- `GET /api/v1/library`: Paginated, filterable reference list supporting full-text search and tag filtering.
- `GET /api/v1/library/:id`: Detailed reference payload with parsed DOM traits, Figma clipboard payload, and asset URLs.
- `POST /api/v1/agents/tokens`: Creates and manages personal access tokens for local agent runtimes.
- `GET /api/v1/agents/sessions`: Retrieves active and historical agent runtime connection logs.
- `DELETE /api/v1/agents/tokens/:id`: Revokes an agent access token with immediate propagation.
- `POST /api/v1/blend`: Multi-reference fusion endpoint synthesizing design code and critique rationale.

### 3. Chrome Extension DOM Inspection & Serialization
- Manifest v3 architecture with background service worker, popup UI, and interactive hover content script.
- Interactive Hover Inspector uses an SVG overlay to render non-intrusive bounding boxes and tag badges over hovered elements.
- When an `img` or `<picture>` or SVG is clicked, the inspector classifies it directly as an `Image Asset` and extracts the high-resolution source without modal disruption.
- When a container node (flexbox/grid/div/section) is clicked, the inspector displays a lightweight popup dialog with:
  - Classification dropdown: `1. Component`, `2. Screen`.
  - Auto-populated fields: Title/Name, Source Website, Source URL, Tags, Category.
- Computed Style Serializer: Traverses the selected DOM tree, capturing computed layout metrics (dimensions, padding, margins, flex direction, gap, font family, font size, weight, line height, fill, borders, shadows, radii) to produce both HTML/Tailwind representations and native Figma node specifications.

### 4. Web Dashboard & Connect Hub
- Modern web dashboard featuring Home, Library, Detail, Profile, and Connect views.
- **"Copy to Figma" Action**: Copies a dual-mime clipboard payload (`text/html` and Figma clipboard data `application/x-figma`) allowing instant `Cmd+V` in Figma to create native vector frames.
- **Connect Page**:
  - Clear setup instructions for Claude Desktop (`claude_desktop_config.json`), Antigravity (`mcp.json`), and custom CLI runtimes.
  - Active runtime session list displaying Client Name, OS/Host, Last Active timestamp, and total requests made.
  - 1-click "Revoke Access" action that invalidates the token and closes any open WebSocket streams.

### 5. Figma Plugin Architecture
- Two-tier Figma Plugin architecture:
  - **Iframe UI Layer**: Authenticates with Drop Taste Cloud, renders searchable Library grid with drag-and-drop triggers, and provides the "Blend with Drop Taste" prompt box.
  - **Main Context Sandbox**: Receives drag-and-drop or import events, parsing the Drop Taste Figma node schema and instantiating native Figma AutoLayout Frames, Text nodes, and Components using `figma.createFrame()`, `figma.createText()`, and layout bindings.
- **Blend with Drop Taste Execution**: The prompt box in the plugin UI can connect to either:
  - The Drop Taste Cloud Blend API, OR
  - A local agent runner on `localhost` (e.g. user's local Antigravity/Claude runtime or local Ollama/OpenAI keys), eliminating third-party subscription costs.

### 6. Drop Taste MCP Protocol Server
- Standard Model Context Protocol (MCP) server running either as an npm CLI (`npx @drop-taste/mcp`) or Docker container.
- Authenticates via personal access token (`DROP_TASTE_API_TOKEN`).
- Implements MCP Tools:
  - `list_taste(category, type, limit)`: Returns catalog items.
  - `search_taste(query, tags)`: Semantic and full-text search across user references.
  - `get_taste(id)`: Returns full metadata, computed design traits, and code snippets.
  - `blend_taste(reference_ids, prompt)`: Synthesizes a new design combining traits from the selected references with structured reasoning.

## Testing Decisions

### 1. Seam Testing Philosophy
- All tests prioritize verifying external behavior through the public HTTP/REST and MCP protocol seams rather than asserting internal class state or private methods.
- Tests will run in automated CI with mock services for external AI APIs.

### 2. Modules to Test
- **Ingestion & Serialization Engine**: Test that raw HTML/DOM input produces accurate computed layout trees, tag extractions, and valid Figma-compatible clipboard payloads.
- **Authentication & Multi-Tenant Authorization**: Test that tenant data is strictly isolated, API tokens authenticate properly, and revoked tokens immediately fail with 401 Unauthorized.
- **MCP Server Protocol Compliance**: Test that the MCP server responds correctly to `tools/list` and `tools/call` for `search_taste`, `get_taste`, and `blend_taste`.
- **Chrome Extension Inspector Event Flow**: Unit and integration tests for hover highlight activation, element classification logic (`img` vs `div`), and payload dispatch.
- **Figma Node Reconstruction**: Test that valid node schemas correctly map to expected Figma node properties (auto-layout direction, padding, fill colors, font styles).

## Out of Scope

- Hosting a proprietary AI model training cluster (Drop Taste leverages existing LLMs via user keys or standard cloud APIs).
- Direct browser extension support for non-Chromium browsers (Firefox, Safari) in the initial release.
- Live collaborative multi-user editing directly inside the Drop Taste dashboard (Figma handles collaborative canvas editing).

## Further Notes

- Existing assets in `/Users/goregadget/taste-library` and previous project fixtures can be imported into the cloud database via a migration script.
- The clipboard format adheres to standard HTML with embedded Figma metadata comments for broad compatibility across Figma desktop and web apps.
