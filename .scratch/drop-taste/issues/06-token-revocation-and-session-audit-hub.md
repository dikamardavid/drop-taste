# 06 — Token Revocation & Session Audit Hub

**What to build:**
Sistem manajemen keamanan token dan audit sesi agen terpusat. Melalui halaman "Connect" di web dashboard, pengguna dapat membuat Personal Access Token baru (`dt_pat_...`), melihat daftar token aktif, serta memantau log sesi agen yang sedang terhubung (nama client runtime, Host OS, jumlah query, dan waktu aktivitas terakhir). Menyediakan tombol aksi 1-klik "Revoke Access" yang seketika mengubah status token menjadi revoked, menyebabkan seluruh pemanggilan tool MCP berikutnya dengan token tersebut langsung ditolak dengan status `401 Unauthorized`.

**Blocked by:** 05 — MCP Server & Agent Reference Bridge.

**Status:** ready-for-agent

- [ ] Endpoint `POST /api/v1/agents/tokens` untuk membuat token baru yang di-hash dengan aman.
- [ ] Endpoint `GET /api/v1/agents/tokens` dan `GET /api/v1/agents/sessions` untuk mengambil daftar token dan log aktivitas sesi.
- [ ] Endpoint `DELETE /api/v1/agents/tokens/:id` untuk pencabutan token secara instan (instant revocation).
- [ ] Antarmuka web Connect menampilkan form pembuatan token, tabel audit sesi, dan tombol revoke dengan modal konfirmasi.
- [ ] Verifikasi tes otomatis memastikan bahwa token yang telah di-revoke langsung ditolak pada pemanggilan MCP berikutnya.
