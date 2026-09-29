# 🎫 Drop Taste Roadmap & Tracer-Bullet Tickets

Backlog resmi telah dipublikasikan ke issue tracker Multica project **Drop Taste** (`fbff8aca-0c77-4021-aa9e-25387f2fa80a`) di workspace **Goregadget**, terhubung ke GitHub repository [https://github.com/dikamardavid/drop-taste](https://github.com/dikamardavid/drop-taste).

---

## 🗺️ Dependency Graph

```mermaid
flowchart TD
  subgraph UIUX ["🎨 UI/UX Design (Assignee: GoreGadget)"]
    GORE117["GORE-117 (#11): Extension & Hover Inspector Design"]
    GORE118["GORE-118 (#12): Figma Plugin & Blend Dialog Design"]
    GORE119["GORE-119 (#13): Web Dashboard & Connect Hub Design"]
  end

  subgraph ENG ["🛠️ Backend & Frontend (Assignee: Achmad Wahyudi)"]
    GORE107["GORE-107 (#1): Cloud Backend Core & Auth Foundations"] --> GORE108["GORE-108 (#2): Ingestion API & Serializer"]
    GORE108 --> GORE109["GORE-109 (#3): Chrome Extension Hover Inspector"]
    GORE108 --> GORE110["GORE-110 (#4): Web Dashboard & Connect Hub"]
    GORE107 --> GORE111["GORE-111 (#5): Drop Taste MCP Server"]
    GORE108 --> GORE111
    GORE108 --> GORE112["GORE-112 (#6): Figma Plugin Drag-and-Drop"]
    GORE110 --> GORE112
    GORE111 --> GORE113["GORE-113 (#7): Figma Plugin 'Blend with Drop Taste'"]
    GORE112 --> GORE113
  end

  subgraph DS ["🧠 Data Science (Assignee: Revalda Putawara)"]
    GORE108 --> GORE114["GORE-114 (#8): Auto Metadata & Taxonomy Classifier"]
    GORE108 --> GORE115["GORE-115 (#9): Trait Extraction & Vector Search"]
    GORE108 --> GORE116["GORE-116 (#10): Multimodal Blending & Reasoning Engine"]
    GORE116 --> GORE113
  end

  GORE117 -. Desain menjadi acuan .-> GORE109
  GORE118 -. Desain menjadi acuan .-> GORE112
  GORE118 -. Desain menjadi acuan .-> GORE113
  GORE119 -. Desain menjadi acuan .-> GORE110
```

---

## 📋 Ticket Summary by Role

### 🎨 UI/UX Design (Assignee: **GoreGadget**)
| Multica Key | GitHub Issue | Title | Deliverable Utama | Status |
|---|---|---|---|---|
| **GORE-117** | [#11](https://github.com/dikamardavid/drop-taste/issues/11) | **Chrome Extension & Interactive Hover Inspector Design System** | Visual specs untuk hover outline, dimension badge, modal capture (`Component` vs `Screen`), direct image toast, dan popup menu. | `backlog` |
| **GORE-118** | [#12](https://github.com/dikamardavid/drop-taste/issues/12) | **Figma Plugin Interface & 'Blend with Drop Taste' Prompt Dialog** | Layout plugin 360x560px: Login view, library grid cards, dan modal prompt box blending (context frame, model runner pill, reasoning critique accordion). | `backlog` |
| **GORE-119** | [#13](https://github.com/dikamardavid/drop-taste/issues/13) | **Web Dashboard, Taste Library & Connect Hub Design System** | Responsive desktop design: Library bento gallery, filter sidebar, Detail view + "Copy to Figma" animation, Connect Hub audit table, dan Profile. | `backlog` |

### 🛠️ Backend & Frontend Engineering (Assignee: **Achmad Wahyudi**)
| Multica Key | GitHub Issue | Disiplin | Title | Status |
|---|---|---|---|---|
| **GORE-107** | [#1](https://github.com/dikamardavid/drop-taste/issues/1) | Backend | Cloud Backend Core, Auth & Multi-tenant Database Foundations | `backlog` |
| **GORE-108** | [#2](https://github.com/dikamardavid/drop-taste/issues/2) | Backend | Capture Ingestion API & Serializer Engine | `backlog` |
| **GORE-109** | [#3](https://github.com/dikamardavid/drop-taste/issues/3) | Frontend | Chrome Extension Interactive Hover Inspector & Capture Flow | `backlog` |
| **GORE-110** | [#4](https://github.com/dikamardavid/drop-taste/issues/4) | Frontend | Web Dashboard (Library, Detail Page, Profile, Connect & Agent Token Management) | `backlog` |
| **GORE-111** | [#5](https://github.com/dikamardavid/drop-taste/issues/5) | Backend | Drop Taste Model Context Protocol (MCP) Server | `backlog` |
| **GORE-112** | [#6](https://github.com/dikamardavid/drop-taste/issues/6) | Frontend | Figma Plugin (Library Browser & Drag-and-Drop Canvas Reconstruction) | `backlog` |
| **GORE-113** | [#7](https://github.com/dikamardavid/drop-taste/issues/7) | Frontend | Figma Plugin 'Blend with Drop Taste' Interactive Prompt Box | `backlog` |

### 🧠 Data Science (Assignee: **Revalda Putawara**)
| Multica Key | GitHub Issue | Title | Deliverable Utama | Status |
|---|---|---|---|---|
| **GORE-114** | [#8](https://github.com/dikamardavid/drop-taste/issues/8) | **Automated Metadata & Taxonomy Classification Engine** | Model klasifikasi kategori web (SaaS, E-commerce, dll.), brand extraction, dan auto-suggest tags. | `backlog` |
| **GORE-115** | [#9](https://github.com/dikamardavid/drop-taste/issues/9) | **Design Trait Extraction & Multimodal Taste Vector Search** | Ekstraksi visual & layout traits (spasial, tipografi, warna) dan vector search untuk `search_taste`. | `backlog` |
| **GORE-116** | [#10](https://github.com/dikamardavid/drop-taste/issues/10) | **Multi-Modal Design Blending & Reasoning Synthesis Engine** | Pipeline sintesis LLM multimodal yang memadukan beberapa referensi menjadi layout baru + reasoning. | `backlog` |
