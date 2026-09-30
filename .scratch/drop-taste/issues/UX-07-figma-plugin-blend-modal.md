# UX-07 — Figma Plugin UI: "Blend with Drop Taste" Modal Prompt Box

**What to build:**
Desain modal dialog *"Blend with Drop Taste"* di dalam panel plugin Figma. Antarmuka ini memberikan kontrol kepada desainer untuk memadukan beberapa referensi menjadi desain baru menggunakan AI runtime lokal (`http://localhost:3847` / kunci API pribadi user) tanpa biaya langganan AI Figma. Antarmuka mencakup pill frame aktif yang dipilih di canvas, pemilih referensi sekunder dari library, textarea prompt blending, badge status runtime lokal, dan animasi loading saat proses sintesis berjalan.

**Blocked by:** UX-06 — Figma Plugin UI: Library Browser & Auto-Layout Inserter.

**Status:** ready-for-agent

- [ ] Modal dialog interaktif di dalam panel plugin Figma.
- [ ] Pill visual menampilkan frame aktif canvas yang terpilih sebagai referensi konteks.
- [ ] Selector referensi tambahan dari Taste Library pengguna.
- [ ] Input textarea prompt blending dengan contoh template instruksi.
- [ ] Indikator status koneksi runtime lokal (Hijau = Connected `localhost:3847`, Kuning = Key Configured, Merah = Offline).
- [ ] State loading sintesis layout dan penanganan error yang jelas.
