# 07 — Multi-Reference Agent Blending

**What to build:**
Kemampuan perpaduan multi-referensi (*design trait blending*) melalui Model Context Protocol. Tool MCP `blend_taste` menerima array ID referensi dari library pengguna bersama dengan prompt instruksi natural language (misal: *"Padukan kartu pricing modern dark-mode ini dengan tipografi display retro dari referensi B"*). Layanan backend mengekstraksi trait desain dari masing-masing referensi dan mensintesiskan struktur desain baru, lengkap dengan narasi penalaran multi-modal (critique & attribution rationale) yang menjelaskan sumber inspirasi dari setiap elemen yang digabungkan.

**Blocked by:** 05 — MCP Server & Agent Reference Bridge.

**Status:** ready-for-agent

- [ ] Implementasi tool MCP `blend_taste` menerima parameter `reference_ids: string[]` dan `prompt: string`.
- [ ] Logika backend memverifikasi kepemilikan seluruh ID referensi dan mengambil metadata/traits terkait.
- [ ] Sintesis perpaduan menghasilkan kode antarmuka baru dan narasi ulasan penalaran desain (*reasoning breakdown*).
- [ ] Respons mengembalikan atribusi eksplisit (misal: warna dari referensi 1, hierarki dari referensi 2).
- [ ] Pengujian integrasi memvalidasi pemanggilan `blend_taste` dengan beberapa referensi valid dan penanganan error jika ID tidak ditemukan.
