# UX-02 — Chrome Extension UI & In-Page Overlay

**What to build:**
Desain antarmuka Chrome Extension Drop Taste yang mencakup popup view (320px) dengan 2 menu utama (*Capture Page* dan *Capture Element*), overlay penyorot in-page (hover inspector highlight dengan badge dimensi `<tag>` + `W × H px`), modal in-page pemilihan klasifikasi Component vs Screen saat kontainer flexbox diklik, serta toast notifikasi non-intrusif di pojok layar.

**Blocked by:** UX-01 — Design System & Design Tokens Foundation.

**Status:** ready-for-agent

- [ ] Frame popup 320px dengan branding DT, tombol aksi Menu 1 (Capture Page), Menu 2 (Capture Element), dan link footer.
- [ ] Desain visual overlay hover inspector dengan border biru ber-glow, dimensi badge, dan pembeda visual saat kursor berada di atas gambar vs elemen div/flexbox.
- [ ] Desain modal in-page klasifikasi elemen (dropdown Component vs Screen, input judul, kategori, tags).
- [ ] Desain micro-interaction toast sukses untuk Image capture (*"🖼️ Image Asset Saved & Sent to Vision AI"*) dan Component capture (*"✅ Saved! Ready to Copy to Figma"*).
