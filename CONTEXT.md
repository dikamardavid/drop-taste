# Drop Taste

A multi-tenant cloud and agentic design intelligence platform that captures visual web inspiration into editable Figma design assets and empowers AI coding agents to blend references into new designs.

## Language

### Ingestion & Capture

**Page Capture**:
A full webpage DOM and visual hierarchy snapshot converted into structured layout code ready for editable Figma recreation.
_Avoid_: Full screenshot, web scraper

**Element Capture**:
A targeted slice of a webpage isolated via an interactive hover inspector, classified as either a Component, Screen, or Image Asset.
_Avoid_: Snipping, partial crop, element grab

**Component**:
An isolated, reusable UI element (e.g. navigation bar, card, table, button group) captured with semantic DOM hierarchy and computed styles.
_Avoid_: Widget, snippet, block

**Screen**:
A complete viewport or container layout context captured as an integrated view.
_Avoid_: Page fragment, artboard, view snapshot

**Image Asset**:
A standalone visual asset (`<img>`, SVG, canvas, or background graphic) stored purely as visual binary data without reconstructed DOM code.
_Avoid_: Picture, graphic file, photo

**Interactive Hover Inspector**:
A browser extension overlay that highlights DOM elements on mouse hover and allows 1-click precision capture.
_Avoid_: Element picker, marquee selector

### Taste & Library

**Taste Library**:
A centralized, searchable repository of captured web elements, screens, and images enriched with automated metadata (site name, URL, tags, category).
_Avoid_: Bookmark folder, asset storage, gallery

**Taste Trait**:
A distilled visual design characteristic (e.g. typographic scale, spacing rhythm, surface elevation, corner radius) extracted from a reference.
_Avoid_: Style attribute, css rule

**Blend**:
The multi-modal synthesis of design traits from two or more reference items into a coherent, novel design specification or Figma layout.
_Avoid_: Merge, remix, copy-paste, combine

### Agent & Integration

**Agent Bridge**:
The MCP (Model Context Protocol) and local runtime interface allowing external AI agents (Claude, Antigravity, GPT) to query and blend references from the Taste Library.
_Avoid_: Agent plugin, bot connector, API webhook

**Connected Agent Session**:
A verifiable, revocable token-authenticated session representing a local AI agent runtime accessing the user's library.
_Avoid_: API client, bot account, login session

**Blend Prompt Box**:
A modal interface within the Drop Taste Figma plugin that triggers reference synthesis directly using the user's local model keys and runtime.
_Avoid_: AI chatbox, Figma bot dialog
