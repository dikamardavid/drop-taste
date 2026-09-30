# 02 — Page Capture to Figma Clipboard

**What to build:**
Alur fungsional end-to-end penangkapan 1 halaman web penuh. Dari ekstensi browser, pengguna menekan menu "Capture Page" untuk memindai DOM dan computed styles dari atas ke bawah. Data ditransmisikan ke backend ingestion API (`POST /api/v1/captures/page`) dan disimpan ke cloud library. Pada web dashboard, pengguna dapat membuka halaman detail hasil tangkapan dan menekan tombol primer **"Copy to Figma"**. Payload clipboard dual-MIME disalin ke sistem, memungkinkan pengguna menekan `Cmd+V` di Figma untuk langsung menghasilkan desain halaman utuh yang editable.

**Blocked by:** 01 — Shared Core Contracts & Ingestion Prefactor.

**Status:** ready-for-agent

- [ ] Ekstensi mengekstrak struktur DOM halaman aktif beserta computed styles dan dimensi layar.
- [ ] Endpoint `POST /api/v1/captures/page` memvalidasi dan menyimpan tangkapan ke database dengan payload Figma clipboard siap pakai.
- [ ] Web dashboard menampilkan halaman detail dengan tombol primer **"Copy to Figma"**.
- [ ] Menekan tombol "Copy to Figma" menyalin payload HTML dual-MIME ke clipboard dan mengubah state tombol ke `Copied!`.
- [ ] Paste `Cmd+V` pada canvas Figma menghasilkan frame desain utuh.
- [ ] Tes integrasi otomatis memvalidasi alur transmisi data dari request hingga generasi payload clipboard.
