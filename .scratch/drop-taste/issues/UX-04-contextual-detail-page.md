# UX: Web — Capture Detail Page (Full Screen Modal with Prev/Next Navigation)

**What to build:**
Desain antarmuka modal layar penuh (Full Screen Modal Overlay) untuk melihat detail referensi langsung di atas Taste Library:
- **Navigasi Kiri / Kanan (Prev / Next Carousel):**
  - Tombol panah `← Prev` dan `Next →` serta indikator posisi (misal: "3 of 12").
  - Dukungan navigasi keyboard panah kiri/kanan (`ArrowLeft` / `ArrowRight`) untuk berpindah referensi tanpa menutup modal.
  - Tombol tutup modal `✕` dan shortcut `Esc`.
- **Sisi Kiri (Preview Area):**
  - Visual preview resolusi tinggi / Render DOM frame.
  - Tabs: Viewer dokumen kanonikal `design.md` (tabel token warna HEX, skala tipografi, spacing, layout tree, code template) untuk gambar, atau DOM source untuk komponen/halaman.
- **Sisi Kanan (Detail Fields yang ditangkap ekstensi):**
  - Badge tipe (`Page Capture` / `Component` / `Image Reference`) + resolusi dimensi (`W × H px`).
  - Judul referensi, link domain asal (clickable external link), tanggal/waktu capture, kategori, dan tag chips.
  - **Aksi Sesuai Kesepakatan Awal:**
    - Jika Page atau Component $\rightarrow$ Tombol primer **"Copy to Figma"** (state berubah ke `Copied! Paste with Cmd+V in Figma`).
    - Jika Image Reference $\rightarrow$ Tombol primer **"Reference this with your agent"** (state berubah ke `Copied! Paste into Cursor/Claude`, TANPA tombol Copy to Figma).
  - Box helper "Agent Reference Command" berisi prompt template aman anti-injection.

**Assignee:** GoreGadget
**Status:** ready-for-agent

- [ ] Desain modal layar penuh (Full Screen Modal Overlay) di atas galeri library.
- [ ] Kontrol navigasi panah kiri (`← Prev`) dan kanan (`Next →`) di top bar modal.
- [ ] Workspace sisi kiri dengan tab switch antara Visual Preview dan Canonical `design.md` Viewer.
- [ ] Panel sisi kanan menampilkan field tangkapan lengkap dari ekstensi.
- [ ] Varian tombol aksi primer kontekstual: "Copy to Figma" untuk Page/Component dan "Reference this with your agent" untuk Image Reference.
