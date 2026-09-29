# 07 — Figma Plugin "Blend with Drop Taste" Interactive Prompt Box

**What to build:**
An interactive prompt box dialog inside the Drop Taste Figma plugin that triggers AI design blending. The prompt box allows designers to select canvas frames or library references, write natural language instructions, and route the request to the user's local agent runtime (via `localhost`) or personal API keys (zero Figma AI fees), generating new editable blended variants directly on the canvas.

**Blocked by:**
05 — Drop Taste Model Context Protocol (MCP) Server
06 — Figma Plugin: Library Browser & Drag-and-Drop Canvas Reconstruction

**Status:**
ready-for-agent

- [ ] "Blend with Drop Taste" trigger button and modal dialog in plugin UI
- [ ] Context selector reading currently selected Figma nodes on canvas and selected library references
- [ ] Local runtime bridge connector routing blend prompts to `http://localhost:3847` or cloud blend endpoint
- [ ] Multi-modal synthesis renderer converting the agent's blended code/DSL into native canvas frames
- [ ] In-plugin preview panel displaying the agent's explicit design reasoning and critique breakdown
- [ ] End-to-end integration test of the local blend loop from prompt to canvas node instantiation
