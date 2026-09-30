# 03 — Component Hover Inspector to Auto-Layout

**What to build:**
Alur fungsional end-to-end penangkapan komponen UI spesifik melalui browser. Pengguna mengaktifkan hover inspector dari ekstensi, yang memunculkan overlay highlight biru dengan badge ukuran pada elemen yang diarahkan. Saat kontainer flexbox/div diklik, muncul modal in-page untuk mengklasifikasikan elemen sebagai `Component` atau `Screen` serta mengisi metadata. Data dikirim ke backend (`POST /api/v1/captures/element`) dan disimpan. Di web dashboard, pengguna dapat membuka detail komponen dan mengklik tombol primer **"Copy to Figma"**, yang siap di-paste di Figma sebagai komponen Auto-Layout.

**Blocked by:** 02 — Page Capture to Figma Clipboard.

**Status:** ready-for-agent

- [ ] Injeksi hover inspector menggunakan Shadow DOM terisolasi agar tidak merusak tata letak halaman asli.
- [ ] Highlight elemen dinamis mengikuti kursor dengan menampilkan badge ukuran `<tag>` dan resolusi pixel.
- [ ] Modal dialog interaktif untuk memilih klasifikasi (Component vs Screen), mengedit judul, kategori, dan tags.
- [ ] Endpoint `POST /api/v1/captures/element` menerima data komponen dan membangun representasi Figma Auto-Layout AST.
- [ ] Halaman detail web dashboard menyediakan tombol primer **"Copy to Figma"**.
- [ ] Paste `Cmd+V` di Figma menghasilkan frame native Auto-Layout dengan padding dan gap yang akurat.
- [ ] Tes integrasi memverifikasi penyimpanan komponen dan pembentukan payload auto-layout.
