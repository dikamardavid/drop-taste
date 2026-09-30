# 🎫 Drop Taste Backlog & Roadmap

> [!NOTE]
> **Keputusan Tech Stack:**
> Seluruh tiket engineering bersifat **stack-agnostic** (berfokus pada kontrak antarmuka, perilaku end-to-end, dan kriteria penerimaan). Pemilihan framework, bahasa pemrograman, database, dan library implementasi akhir akan ditentukan secara resmi oleh **Achmad Wahyudi**.

---

## 🎨 Jalur 1: UI/UX Designer Backlog (GoreGadget)

Daftar tiket desain antarmuka lengkap untuk dieksekusi di Figma oleh **GoreGadget**, tersinkronisasi antara **Multica** dan **GitHub Issues**:

| Multica Key | GitHub Issue | Kode & Judul Tiket | Assignee | Deliverables Utama di Figma |
| :--- | :--- | :--- | :--- | :--- |
| **`GORE-120`** | [#15](https://github.com/dikamardavid/drop-taste/issues/15) | **UX-01: Design System & Design Tokens Foundation** | **GoreGadget** | Variable Collections (Colors, Typo, Spacing 4/8/16/24/48px, Radius) & Component Library |
| **`GORE-121`** | [#16](https://github.com/dikamardavid/drop-taste/issues/16) | **UX-02: Chrome Extension UI & In-Page Overlay** | **GoreGadget** | Frame Popup (320px), Hover Inspector Overlay (W×H badge), Modal In-page, Toast feedback |
| **`GORE-137`** | [#17](https://github.com/dikamardavid/drop-taste/issues/17) | **UX-03: Web — Public Landing Page** | **GoreGadget** | Top Bar, Hero Section, How It Works (3 Steps), Pricing Table (Free vs Pro), Download CTA |
| **`GORE-138`** | [#18](https://github.com/dikamardavid/drop-taste/issues/18) | **UX-04: Web — Sign In & Sign Up Authentication Pages** | **GoreGadget** | Centered Auth Card, Tab Switcher Sign In / Sign Up, Validasi form, Background micro-glow |
| **`GORE-122`** | [#19](https://github.com/dikamardavid/drop-taste/issues/19) | **UX-05: Web Dashboard — Taste Library Gallery & Bento Grid** | **GoreGadget** | Top Filter Bar, Tab Tipe (*All, Page, Component, Image*), Bento Grid Cards, Hover & Empty state |
| **`GORE-123`** | [#20](https://github.com/dikamardavid/drop-taste/issues/20) | **UX-06: Web Dashboard — Capture Detail Page (Full Screen Modal)** | **GoreGadget** | Modal Full Screen, Navigasi Carousel Panah Kiri (`← Prev`) & Kanan (`Next →`), Split Preview & Fields |
| **`GORE-139`** | [#21](https://github.com/dikamardavid/drop-taste/issues/21) | **UX-07: Web — Account & Subscription Settings Page** | **GoreGadget** | Current Plan Card + Upgrade CTA, Connected History Audit Table, Danger Zone (Delete Account, Logout) |
| **`GORE-124`** | [#22](https://github.com/dikamardavid/drop-taste/issues/22) | **UX-08: Web Dashboard — Connect Hub (Agent Audit & Token Revocation)** | **GoreGadget** | MCP Guide Cards (Claude/Antigravity), PAT Generator, Tabel Active Tokens & Revoke Modal |
| **`GORE-125`** | [#23](https://github.com/dikamardavid/drop-taste/issues/23) | **UX-09: Figma Plugin UI — Library Browser & Auto-Layout Inserter** | **GoreGadget** | Panel Plugin (360 × 560px), Compact Cards dengan drag handle, Insert to Canvas trigger |
| **`GORE-126`** | [#24](https://github.com/dikamardavid/drop-taste/issues/24) | **UX-10: Figma Plugin UI — 'Blend with Drop Taste' Modal Prompt Box** | **GoreGadget** | Modal Dialog Blend, Active Frame Pill, Selector referensi, Runtime Status (`localhost:3847`), Loading |
| **`GORE-127`** | [#25](https://github.com/dikamardavid/drop-taste/issues/25) | **UX-11: Complete Clickable Prototype & Handoff Spec** | **GoreGadget** | Interactive Clickable Prototype menghubungkan Extension $\rightarrow$ Web $\rightarrow$ Figma, Developer Handoff Docs |

---

## ⚡ Jalur 2: Engineering Tracer-Bullet Backlog (Stack-Agnostic)

| Multica Key | No. Tiket | Judul & What It Delivers | Assignee | Priority | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`GORE-128`** | **ENG-01** | **Shared Core Contracts & Ingestion Prefactor**<br>Fondasi kontrak data bersama yang stack-agnostic: tipe data `CaptureType`, AST Figma Node, parser/validator kanonikal `design.md`, utilitas clipboard dual-MIME, dan generator prompt anti-injection. | **Achmad Wahyudi** | `urgent` | `backlog` |
| **`GORE-129`** | **ENG-02** | **Page Capture to Figma Clipboard**<br>Alur utuh capture 1 halaman web: Ekstensi memindai halaman $\rightarrow$ API menyimpan $\rightarrow$ Dashboard detail page menampilkan tombol **"Copy to Figma"** $\rightarrow$ `Cmd+V` di Figma menghasilkan frame desain utuh. | **Achmad Wahyudi** | `high` | `backlog` |
| **`GORE-130`** | **ENG-03** | **Component Hover Inspector to Auto-Layout**<br>Alur utuh capture komponen spesifik via hover inspector: Shadow DOM overlay $\rightarrow$ klik kontainer flexbox/div $\rightarrow$ modal klasifikasi $\rightarrow$ simpan $\rightarrow$ tombol **"Copy to Figma"** $\rightarrow$ paste di Figma jadi Auto-Layout frame. | **Achmad Wahyudi** | `high` | `backlog` |
| **`GORE-131`** | **ENG-04** | **Image Reference Vision to Agent Prompt**<br>Alur utuh capture gambar referensi: Klik gambar $\rightarrow$ download resolusi tinggi $\rightarrow$ Cloud Backend mengeksekusi 5-step Managed Vision Service untuk menghasilkan dokumen `design.md` $\rightarrow$ Web Dashboard menampilkan preview & tombol **"Reference this with your agent"**. | **Revalda Putawara** | `high` | `backlog` |
| **`GORE-132`** | **ENG-05** | **MCP Server & Agent Reference Bridge**<br>Server MCP Drop Taste (`list_taste`, `search_taste`, `get_taste`) agar agen coding (Claude Desktop, Cursor, Antigravity) dapat membaca spesifikasi `design.md` untuk mereplikasi desain ke dalam kode frontend. | **Achmad Wahyudi** | `high` | `backlog` |
| **`GORE-133`** | **ENG-06** | **Token Revocation & Session Audit Hub**<br>Halaman Connect di Web Dashboard untuk pembuatan token, audit log sesi agen aktif, dan tombol 1-klik "Revoke Access" yang seketika memblokir pemanggilan MCP dengan `401 Unauthorized`. | **Achmad Wahyudi** | `medium` | `backlog` |
| **`GORE-134`** | **ENG-07** | **Multi-Reference Agent Blending**<br>Tool MCP `blend_taste` yang menerima beberapa ID referensi + prompt, menghasilkan sintesis kode tata letak baru disertai penalaran desain multi-modal (breakdown atribusi). | **Revalda Putawara** | `medium` | `backlog` |
| **`GORE-135`** | **ENG-08** | **Figma Plugin Canvas Auto-Layout Builder**<br>Plugin Figma native Drop Taste untuk login, browsing library, dan drag-and-drop / 1-klik insert komponen ke canvas sebagai Auto-Layout native. | **Achmad Wahyudi** | `high` | `backlog` |
| **`GORE-136`** | **ENG-09** | **Figma Plugin 'Blend with Drop Taste' Local Runtime Loop**<br>Dialog modal *"Blend with Drop Taste"* di plugin Figma yang mengirimkan prompt ke runtime agen lokal (`http://localhost:3847` / API keys user) tanpa biaya AI Figma, dan merender hasilnya langsung ke canvas. | **Achmad Wahyudi** | `medium` | `backlog` |
