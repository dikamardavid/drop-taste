# 🎫 Drop Taste Backlog & Roadmap

> [!NOTE]
> **Keputusan Tech Stack:**
> Seluruh tiket engineering bersifat **stack-agnostic** (berfokus pada kontrak antarmuka, perilaku end-to-end, dan kriteria penerimaan). Pemilihan framework, bahasa pemrograman, database, dan library implementasi akhir akan ditentukan secara resmi oleh **Achmad Wahyudi**.

---

## 🎨 Jalur 1: UI/UX Designer Backlog

| Multica Key | No. Tiket | Judul & Lingkup Desain | Blocked by | Priority | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **GORE-120** | **UX-01** | **Design System & Design Tokens Foundation**<br>Palet warna Dark mode (Canvas `#090D16`, Surface, Accent Indigo `#6366F1`), Skala tipografi (Display s.d. Mono), Spacing geometris 4/8/12/16/24/48px, Corner radius scale, dan Komponen Atomik (Button, Input, Badge, Dialog modal). | *None* | `high` | `backlog` |
| **GORE-121** | **UX-02** | **Chrome Extension UI & In-Page Overlay**<br>Frame popup (320px) dengan Menu 1 (Capture Page) & Menu 2 (Capture Element). In-page hover inspector highlight box (badge `<tag> W×H px`), modal klasifikasi in-page (Component vs Screen), dan toast feedback. | UX-01 | `high` | `backlog` |
| **GORE-122** | **UX-03** | **Web Dashboard: Taste Library Gallery & Bento Grid**<br>Navbar brand & tabs, filter bar (pencarian, dropdown kategori, pills tipe), dan kartu bento grid galeri referensi (preview, type badge, domain source, tag chips, hover/empty state). | UX-01 | `high` | `backlog` |
| **GORE-123** | **UX-04** | **Web Dashboard: Contextual Detail Page (Figma Copy vs Agent Reference)**<br>Diferensiasi aksi nyata:<br>• *Page/Component*: Tombol primer **"Copy to Figma"**.<br>• *Image Reference*: Tombol primer **"Reference this with your agent"** *(tanpa Copy to Figma)*.<br>Layout split: Preview/Viewer kanonikal `design.md` di kiri, metadata & box helper *"Agent Quick Paste"* di kanan. | UX-03 | `high` | `backlog` |
| **GORE-124** | **UX-05** | **Web Dashboard: Connect Hub (Agent Audit & Token Revocation)**<br>Panduan konfigurasi interaktif MCP (Claude Desktop & Antigravity), generator Personal Access Token, tabel status token dengan tombol *Revoke Access*, dialog konfirmasi revoke, dan tabel audit sesi agen real-time. | UX-03 | `medium` | `backlog` |
| **GORE-125** | **UX-06** | **Figma Plugin UI: Library Browser & Auto-Layout Inserter**<br>Desain panel plugin Figma ukuran standar (360 × 560px), kartu referensi ringkas dengan drag handles, status login, dan tombol aksi *"Insert to Canvas"*. | UX-01 | `high` | `backlog` |
| **GORE-126** | **UX-07** | **Figma Plugin UI: "Blend with Drop Taste" Modal Prompt Box**<br>Modal prompt box di dalam Figma: Pill frame yang sedang dipilih di canvas, selector referensi acuan sekunder, textarea instruksi blending, status koneksi Local Runtime (`localhost:3847`), dan loading state. | UX-06 | `medium` | `backlog` |
| **GORE-127** | **UX-08** | **Complete Clickable Prototype & Handoff Spec**<br>Prototipe interaktif di Figma menghubungkan alur: Browser Extension $\rightarrow$ Web Dashboard Library $\rightarrow$ Detail Page $\rightarrow$ Copy/Reference $\rightarrow$ Canvas Figma Plugin. Lengkap dengan dokumentasi developer handoff. | UX-02, UX-04, UX-05, UX-07 | `high` | `backlog` |

---

## ⚡ Jalur 2: Engineering Tracer-Bullet Backlog (Stack-Agnostic)

| Multica Key | No. Tiket | Judul & What it Delivers | Blocked by | Priority | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **GORE-128** | **ENG-01** | **Shared Core Contracts & Ingestion Prefactor**<br>Fondasi kontrak data bersama yang stack-agnostic: tipe data `CaptureType`, AST Figma Node, parser/validator kanonikal `design.md`, utilitas clipboard dual-MIME (`createFigmaClipboardPayload`), dan generator prompt anti-injection (`createAgentReferencePrompt`). | *None* | `urgent` | `backlog` |
| **GORE-129** | **ENG-02** | **Page Capture to Figma Clipboard**<br>Alur utuh capture 1 halaman web: Ekstensi memindai halaman $\rightarrow$ API menyimpan $\rightarrow$ Dashboard detail page menampilkan tombol **"Copy to Figma"** $\rightarrow$ `Cmd+V` di Figma menghasilkan frame desain utuh. | ENG-01 | `high` | `backlog` |
| **GORE-130** | **ENG-03** | **Component Hover Inspector to Auto-Layout**<br>Alur utuh capture komponen spesifik via hover inspector: Shadow DOM overlay $\rightarrow$ klik kontainer flexbox/div $\rightarrow$ modal klasifikasi $\rightarrow$ simpan $\rightarrow$ tombol **"Copy to Figma"** $\rightarrow$ paste di Figma jadi Auto-Layout frame. | ENG-02 | `high` | `backlog` |
| **GORE-131** | **ENG-04** | **Image Reference Vision to Agent Prompt**<br>Alur utuh capture gambar referensi: Klik gambar $\rightarrow$ download resolusi tinggi $\rightarrow$ Cloud Backend mengeksekusi 5-step Managed Vision Service untuk menghasilkan dokumen `design.md` $\rightarrow$ Web Dashboard menampilkan preview & `design.md` viewer dengan tombol **"Reference this with your agent"** *(tanpa tombol Copy to Figma)*. | ENG-01 | `high` | `backlog` |
| **GORE-132** | **ENG-05** | **MCP Server & Agent Reference Bridge**<br>Server MCP Drop Taste (`list_taste`, `search_taste`, `get_taste`) agar agen coding (Claude Desktop, Cursor, Antigravity) dapat membaca spesifikasi `design.md` untuk mereplikasi desain ke dalam kode frontend. | ENG-04 | `high` | `backlog` |
| **GORE-133** | **ENG-06** | **Token Revocation & Session Audit Hub**<br>Halaman Connect di Web Dashboard untuk pembuatan token, audit log sesi agen aktif, dan tombol 1-klik "Revoke Access" yang seketika memblokir pemanggilan MCP dengan `401 Unauthorized`. | ENG-05 | `medium` | `backlog` |
| **GORE-134** | **ENG-07** | **Multi-Reference Agent Blending**<br>Tool MCP `blend_taste` yang menerima beberapa ID referensi + prompt, menghasilkan sintesis kode tata letak baru disertai penalaran desain multi-modal (breakdown atribusi). | ENG-05 | `medium` | `backlog` |
| **GORE-135** | **ENG-08** | **Figma Plugin Canvas Auto-Layout Builder**<br>Plugin Figma native Drop Taste untuk login, browsing library, dan drag-and-drop / 1-klik insert komponen ke canvas sebagai Auto-Layout native. | ENG-03 | `high` | `backlog` |
| **GORE-136** | **ENG-09** | **Figma Plugin 'Blend with Drop Taste' Local Runtime Loop**<br>Dialog modal *"Blend with Drop Taste"* di plugin Figma yang mengirimkan prompt ke runtime agen lokal (`http://localhost:3847` / API keys user) tanpa biaya AI Figma, dan merender hasilnya langsung ke canvas. | ENG-07, ENG-08 | `medium` | `backlog` |
