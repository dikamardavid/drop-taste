# 09 — Figma Plugin "Blend with Drop Taste" Local Runtime Loop

**What to build:**
Modal prompt box *"Blend with Drop Taste"* di dalam plugin Figma yang memanfaatkan runtime agen lokal pengguna (`http://localhost:3847` / kunci API pribadi pengguna) untuk melakukan sintesis perpaduan layout tanpa biaya langganan AI pihak ketiga Figma. Desainer dapat memilih frame acuan di canvas, memilih referensi sekunder dari library, mengetikkan prompt instruksi, dan memicu blending. Hasil layout yang disintesiskan langsung dirender ke dalam canvas Figma sebagai frame Auto-Layout baru yang siap diedit.

**Blocked by:** 07 — Multi-Reference Agent Blending, 08 — Figma Plugin Canvas Auto-Layout Builder.

**Status:** ready-for-agent

- [ ] Modal dialog *"Blend with Drop Taste"* di dalam antarmuka plugin Figma.
- [ ] Deteksi frame yang sedang aktif dipilih di canvas Figma sebagai input referensi visual.
- [ ] Opsi konfigurasi endpoint runtime lokal (default `http://localhost:3847` atau API key pribadi).
- [ ] Transmisi payload blend ke runtime lokal dan penerimaan skema layout hasil sintesis.
- [ ] Perenderan otomatis hasil sintesis ke canvas Figma tepat di samping frame acuan.
- [ ] Notifikasi status koneksi runtime lokal (online/offline) dan feedback penanganan error.
