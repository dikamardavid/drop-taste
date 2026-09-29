# 02 — Capture Ingestion API & Serializer Engine

**What to build:**
Cloud ingestion endpoints and serialization engines to accept Page Captures and Element Captures (Component, Screen, Image Asset). Parses incoming DOM trees, computed styles, and screenshot buffers, stores assets in cloud storage, extracts automated metadata (site name, URL, tags, category), and computes Figma-compatible clipboard payload data.

**Blocked by:**
01 — Cloud Backend Core, Auth & Multi-tenant Database Foundations

**Status:**
ready-for-agent

- [ ] Ingestion endpoint `POST /api/v1/captures/page` accepting DOM hierarchy, computed styles, and page thumbnail
- [ ] Ingestion endpoint `POST /api/v1/captures/element` accepting element DOM, classification (`component` | `screen` | `image`), and metadata
- [ ] DOM-to-Figma serializer converting computed flexbox, typography, and fills into native Figma node schema
- [ ] Automated metadata extraction (favicon/site name, category inference, automated tag suggestions)
- [ ] Integration tests verifying valid capture ingestion and dual-format output generation
