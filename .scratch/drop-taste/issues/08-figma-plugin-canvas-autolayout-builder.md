# 08 — Figma Plugin Canvas Auto-Layout Builder

**What to build:**
Plugin Figma native untuk Drop Taste. Memungkinkan desainer masuk menggunakan kredensial Drop Taste, menjelajahi galeri referensi cloud langsung dari panel samping Figma, dan melakukan drag-and-drop atau 1-klik insert untuk membuat frame native Figma. Handler plugin mengurai skema AST Figma Node dan memanggil API Figma (`figma.createFrame()`, `figma.createText()`, `figma.loadFontAsync()`) untuk menghasilkan layer vektor dan Auto-Layout yang sepenuhnya dapat diedit oleh desainer.

**Blocked by:** 03 — Component Hover Inspector to Auto-Layout.

**Status:** ready-for-agent

- [ ] Panel UI plugin Figma (360 × 560px) menampilkan input login dan daftar referensi dari cloud library.
- [ ] Pengambilan daftar referensi melalui HTTP API Drop Taste.
- [ ] Handler drag-and-drop atau klik insert mengirimkan skema AST ke sandbox plugin utama Figma.
- [ ] Rekonstruksi hierarki Auto-Layout native: arah layout (horizontal/vertikal), padding, gap, background fills, corner radius, dan stroke.
- [ ] Loader font otomatis yang memuat font keluarga terkait sebelum mengisi teks karakter.
- [ ] Pengujian manual memverifikasi bahwa item yang di-insert menghasilkan node Figma yang dapat diedit langsung.
