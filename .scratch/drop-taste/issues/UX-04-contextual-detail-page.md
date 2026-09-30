# UX-04 — Web Dashboard: Contextual Detail Page (Figma Copy vs Agent Reference)

**What to build:**
Desain halaman detail referensi yang menerapkan diferensiasi aksi secara tegas:
1. **Untuk Aset Page & Component:** Menyediakan tombol aksi primer **"Copy to Figma"** (dengan transisi state visual ke `Copied! Paste with Cmd+V in Figma`).
2. **Untuk Aset Image Reference:** Menyediakan tombol aksi primer **"Reference this with your agent"** (dengan transisi state visual ke `Copied! Paste into Cursor/Claude`). Halaman ini **TIDAK** menampilkan tombol Copy to Figma.
Layout mencakup workspace pratinjau (Visual Preview, Canonical `design.md` viewer dengan tabel token warna & font, serta DOM source) di sisi kiri, dan panel metadata serta box helper *"Agent Quick Paste"* di sisi kanan.

**Blocked by:** UX-03 — Web Dashboard: Taste Library Gallery & Bento Grid.

**Status:** ready-for-agent

- [ ] Layout dua kolom (Kiri: Viewer konten/spesifikasi; Kanan: Metadata & panel instruksi agent).
- [ ] Varian tombol aksi primer khusus: "Copy to Figma" untuk Page/Component dan "Reference this with your agent" untuk Image.
- [ ] Desain tampilan pembaca `design.md` terstruktur: Swatch tabel palet warna, tipografi, spacing, diagram hierarki, dan syntax highlighting code block.
- [ ] Box helper "Agent Quick Paste" dengan tampilan command snippet dan banner penjelasan anti-prompt injection.
