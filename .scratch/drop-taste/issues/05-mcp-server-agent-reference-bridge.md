# 05 — MCP Server & Agent Reference Bridge

**What to build:**
Jembatan komunikasi Model Context Protocol (MCP) yang menghubungkan AI coding agent eksternal (seperti Claude Desktop, Cursor, Antigravity) ke koleksi referensi desain Drop Taste. Server MCP mendukung transport Stdio dan HTTP, mengotentikasi request menggunakan Personal Access Token (`DROP_TASTE_API_TOKEN`), serta mengimplementasikan tools standar: `list_taste`, `search_taste`, dan `get_taste`. Agent dapat meminta dokumen `design.md` dari item referensi gambar untuk digunakan sebagai acuan pembuatan kode antarmuka baru.

**Blocked by:** 04 — Image Reference Vision to Agent Prompt.

**Status:** ready-for-agent

- [ ] Inisialisasi MCP server yang patuh terhadap protokol JSON-RPC MCP resmi.
- [ ] Implementasi otentikasi token agen pada setiap pemanggilan tool.
- [ ] Tool `list_taste`: Mengembalikan katalog referensi pengguna terfilter berdasarkan kategori atau tipe.
- [ ] Tool `search_taste`: Melakukan pencarian kata kunci dan tag terhadap seluruh referensi yang tersimpan.
- [ ] Tool `get_taste`: Mengembalikan detail lengkap referensi, termasuk dokumen kanonikal `design.md` jika bertipe image.
- [ ] Pengujian kepatuhan protokol MCP memverifikasi respon tool `tools/list` dan `tools/call`.
