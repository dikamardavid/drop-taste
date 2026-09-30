# 🎫 Drop Taste Backlog & Roadmap

> [!NOTE]
> **Keputusan Tech Stack:**
> Seluruh tiket engineering bersifat **stack-agnostic** (berfokus pada kontrak antarmuka, perilaku end-to-end, dan kriteria penerimaan). Pemilihan framework, bahasa pemrograman, database, dan library implementasi akhir akan ditentukan secara resmi oleh **Achmad Wahyudi**.

---

## 🎨 Jalur 1: UI/UX Designer Backlog

Daftar tiket desain untuk UI/UX Designer mencakup seluruh antarmuka Drop Taste (Chrome Extension, Web Dashboard, dan Figma Plugin):

### UX-01: Design System & Design Tokens Foundation
- **Lingkup:** 
  - Palet warna (Dark mode base: Canvas `#090D16`, Surface `#111827`, Elevated `#1F2937`, Accent Indigo `#6366F1`, Border glow, State colors: Success `#10B981`, Danger `#EF4444`).
  - Skala tipografi (Display, Heading 1/2/3, Body, Caption, Monospace untuk code/token).
  - Sistem spacing & radius (4/8/12/16/24/48px, radius-sm 6px, radius-md 10px, radius-lg 14px).
  - Komponen atomik: Button variants, input fields, badge pills, dropdowns, modal backdrop, tooltip, card container.
- **Deliverables:** Figma Variable Collections (Tokens) & Component Library file.

### UX-02: Chrome Extension UI & In-Page Overlay
- **Lingkup:**
  - **Popup View (320px):** Header branding DT, Menu 1: *"Capture Page"* (dengan subtitle penjelasan & scanning indicator), Menu 2: *"Capture Element"* (dengan subteks hover inspector), link *"Open Library"*.
  - **Hover Inspector Overlay:** Highlight outline biru/indigo, badge dimensi (`<tag>` + `W × H px`), indikator visual saat cursor diarahkan ke gambar vs elemen kontainer.
  - **In-Page Classification Modal:** Tampil saat kontainer flexbox/div diklik. Form mencakup pilihan klasifikasi (`Component` vs `Screen`), auto-filled Title, Category, Suggested Tags, dan tombol Save.
  - **Toast Notifications:** State notifikasi mengambang saat capture berhasil:
    - Untuk Image: *"🖼️ Image Asset Saved & Sent to Vision AI"*.
    - Untuk Component/Page: *"✅ Saved! Ready to Copy to Figma"*.
- **Deliverables:** Frame desain popup, overlay states, modal input, dan toast micro-interactions.

### UX-03: Web Dashboard — Taste Library Gallery & Bento Grid
- **Lingkup:**
  - **Navbar:** Logo mark DT, tab navigasi (*Taste Library*, *Connect MCP*, *Profile*).
  - **Filter Bar:** Search input, category dropdown, type pills (*All Items*, *📄 Pages*, *🧩 Components*, *🖼️ Image References*).
  - **Bento Card Gallery:**
    - Card anatomy: Badge tipe dengan warna pembeda, visual preview container, title, source domain link, category, tag chips.
    - Card hover effect, loading skeleton, dan empty state (*"No references captured yet"* lengkap dengan ilustrasi ajakan memakai ekstensi).
- **Deliverables:** Layout halaman utama Taste Library versi desktop (1440px) dan responsif.

### UX-04: Web Dashboard — Contextual Detail Page (Figma Copy vs Agent Reference)
- **Lingkup:**
  - **Action Boundary:**
    - **Tampilan Page & Component:** Tombol primer **"Copy to Figma"** (dengan transisi state visual ke `Copied! Paste with Cmd+V in Figma`).
    - **Tampilan Image Reference:** Tombol primer **"Reference this with your agent"** (dengan transisi state visual ke `Copied! Paste into Cursor/Claude`). **TIDAK ADA** tombol Copy to Figma.
  - **Preview & Specification Tabs:**
    - Tab 1: Visual Preview (Gambar resolusi tinggi atau render DOM).
    - Tab 2: Canonical `design.md` Viewer (tabel token warna dengan swatch HEX, tipografi, spacing, hierarki auto-layout, dan code template).
    - Tab 3: HTML / DOM source viewer.
  - **Right Rail:** Metadata lengkap, source link, tag chips, reference UUID, dan box *"Agent Quick Paste"* dengan copy snippet.
- **Deliverables:** Wireframe dan visual design komprehensif untuk Detail View Page/Component dan Detail View Image Reference.

### UX-05: Web Dashboard — Connect Hub (Agent Audit & Token Revocation)
- **Lingkup:**
  - **Setup Guides:** Panduan interaktif setup Claude Desktop (`claude_desktop_config.json`) dan Antigravity (`mcp.json`).
  - **Token Generator Card:** Input nama token, tombol *Generate Token*, dan callout rahasia token satu kali tampil (`dt_pat_...`) dengan tombol copy.
  - **Active Tokens Table:** Tabel token aktif (Nama, Prefix `dt_pat_...`, Tanggal dibuat, Status badge `ACTIVE`/`REVOKED`, tombol *Revoke Access*).
  - **Revoke Confirmation Modal:** Dialog peringatan bahwa agent yang terhubung akan langsung terputus.
  - **Real-Time Agent Session Audit Table:** Client Name (e.g. `Claude Desktop macOS`), Host OS, Jumlah Query, Timestamp terakhir aktif.
- **Deliverables:** Halaman Connect lengkap dengan tabel audit dan modal konfirmasi.

### UX-06: Figma Plugin UI — Library Browser & Auto-Layout Inserter
- **Lingkup:**
  - Layout panel plugin Figma ukuran standar (360 × 560px).
  - Status login akun Drop Taste.
  - Tab pencarian dan filter referensi sesuai cloud library.
  - Kartu referensi ringkas dengan drag handle untuk ditarik langsung ke canvas Figma.
  - Tombol aksi *"Insert to Canvas"*.
- **Deliverables:** Frame UI plugin Figma (360x560px) beserta status loading dan empty state.

### UX-07: Figma Plugin UI — "Blend with Drop Taste" Modal Prompt Box
- **Lingkup:**
  - Modal prompt box di dalam plugin Figma.
  - Pill indikator frame yang sedang dipilih di canvas sebagai acuan.
  - Selector referensi tambahan dari library.
  - Textarea instruksi prompt perpaduan (*"Blend these references into a sleek dark pricing section..."*).
  - Indikator status Local Runtime (`http://localhost:3847` / API Keys pribadi user).
  - Tombol *"Generate Blend"* dan state animasi loading saat proses sintesis berjalan.
- **Deliverables:** Desain modal Blend Prompt Box beserta error handling & runtime setup indicator.

### UX-08: Complete Clickable Prototype & Handoff Spec
- **Lingkup:**
  - Prototype interaktif di Figma menghubungkan alur: Browser Extension Capture $\rightarrow$ Dashboard Library $\rightarrow$ Detail Page $\rightarrow$ Copy/Reference $\rightarrow$ Figma Plugin Canvas Paste.
  - Dokumentasi handoff untuk engineering: Spesifikasi spacing, token mapping, dan responsive rules.
- **Deliverables:** Figma Interactive Prototype link dan Developer Handoff Specs.

---

## ⚡ Jalur 2: Engineering Tracer-Bullet Backlog (Stack-Agnostic)

Seluruh tiket dirancang sebagai **vertical slice** (menembus skema, API backend, UI/client, dan testing otomatis):

### 01-shared-core-contracts-prefactor
- **Blocked by:** None — can start immediately
- **What it delivers:** Fondasi kontrak data bersama yang stack-agnostic: tipe data `CaptureType` (`page`, `component`, `image`), AST Figma Node, spesifikasi `design.md`, utility clipboard dual-MIME (`createFigmaClipboardPayload`), dan generator prompt ber-defense injection (`createAgentReferencePrompt`), lengkap dengan unit test otomatis.

### 02-page-capture-to-figma-clipboard
- **Blocked by:** 01
- **What it delivers:** Alur end-to-end penangkapan 1 halaman web utuh. Ekstensi memindai DOM & style halaman $\rightarrow$ API menyimpan ke database $\rightarrow$ Web Dashboard menampilkan kartu page dengan tombol **"Copy to Figma"** $\rightarrow$ User tekan `Cmd+V` di Figma menghasilkan desain frame utuh.

### 03-component-hover-inspector-to-autolayout
- **Blocked by:** 02
- **What it delivers:** Alur end-to-end penangkapan komponen UI spesifik. Ekstensi menginjeksi overlay Shadow DOM non-intrusif, user klik kontainer flexbox/div $\rightarrow$ modal klasifikasi component/screen $\rightarrow$ API menyimpan data $\rightarrow$ Web Dashboard menampilkan kartu komponen dengan tombol **"Copy to Figma"** $\rightarrow$ User paste di Figma menjadi komponen Auto-Layout.

### 04-image-reference-vision-to-agent-prompt
- **Blocked by:** 01
- **What it delivers:** Alur end-to-end penangkapan gambar referensi. User klik gambar di web $\rightarrow$ background worker mengunduh resolusi tinggi (bypass CORS) $\rightarrow$ Cloud Backend mengeksekusi 5-step Managed Vision Service untuk menghasilkan dokumen baku `design.md` $\rightarrow$ Web Dashboard menampilkan preview & `design.md` viewer dengan tombol **"Reference this with your agent"** *(tanpa tombol Copy to Figma)* yang menyalin prompt snippet aman.

### 05-mcp-server-agent-reference-bridge
- **Blocked by:** 04
- **What it delivers:** Jembatan Model Context Protocol (MCP) untuk AI coding agent. Server Drop Taste MCP mengotentikasi token $\rightarrow$ mengekspos tools `list_taste`, `search_taste`, dan `get_taste` $\rightarrow$ agent (Claude Desktop, Cursor, Antigravity) membaca dokumen `design.md` untuk mereplikasi desain referensi ke dalam kode aplikasi.

### 06-token-revocation-and-session-audit-hub
- **Blocked by:** 05
- **What it delivers:** Manajemen keamanan token dan audit sesi agen. Halaman "Connect" di Web Dashboard memungkinkan pembuatan token `dt_pat_...`, menampilkan tabel audit sesi agen aktif secara real-time, dan menyediakan tombol 1-klik "Revoke Access" yang seketika menolak panggilan MCP berikutnya dengan `401 Unauthorized`.

### 07-multi-reference-agent-blending
- **Blocked by:** 05
- **What it delivers:** Sintesis perpaduan beberapa referensi desain. Tool MCP `blend_taste` menerima multiple reference IDs dan prompt instruksi $\rightarrow$ backend menghasilkan sintesis kode tata letak baru disertai penalaran desain multi-modal (menjelaskan bagian tipografi/spacing/warna mana yang diadaptasi dari masing-masing referensi).

### 08-figma-plugin-canvas-autolayout-builder
- **Blocked by:** 03
- **What it delivers:** Plugin Figma Drop Taste native. Designer login di dalam panel Figma, menjelajahi referensi library, dan melakukan drag-and-drop / 1-klik insert untuk membuat native Auto-Layout frame, teks, dan style langsung di canvas Figma.

### 09-figma-plugin-blend-prompt-box-local-runtime
- **Blocked by:** 07, 08
- **What it delivers:** Dialog modal *"Blend with Drop Taste"* di dalam plugin Figma. Designer memilih frame acuan di canvas dan mengirim instruksi prompt ke agent runtime lokal (`http://localhost:3847` / API keys milik user sendiri) tanpa biaya vendor AI Figma, dan hasil perpaduan desain langsung dirender di canvas.
