# UX-05 — Web Dashboard: Connect Hub (Agent Audit & Token Revocation)

**What to build:**
Desain halaman "Connect" pada web dashboard Drop Taste untuk menghubungkan AI coding agent via Model Context Protocol (MCP). Desain mencakup kartu panduan setup interaktif untuk Claude Desktop dan Antigravity, kartu generator Personal Access Token baru (`dt_pat_...`), tabel riwayat token aktif dengan tombol 1-klik "Revoke Access" beserta modal dialog konfirmasi, dan tabel audit sesi agen aktif secara real-time.

**Blocked by:** UX-03 — Web Dashboard: Taste Library Gallery & Bento Grid.

**Status:** ready-for-agent

- [ ] Kartu generator token dengan form nama token, tombol generate, dan tampilan rahasia token satu kali lihat lengkap dengan tombol salin.
- [ ] Panduan visual konfigurasi MCP (snippet konfigurasi JSON untuk Claude Desktop dan Antigravity).
- [ ] Tabel token aktif dengan status badge visual (`ACTIVE` warna hijau, `REVOKED` warna merah) dan tombol Revoke.
- [ ] Modal dialog konfirmasi revocasi token yang menjelaskan dampak pemutusan sesi agen secara instan.
- [ ] Tabel log audit sesi agen aktif (Nama client, Host OS, jumlah query, timestamp aktivitas terakhir).
