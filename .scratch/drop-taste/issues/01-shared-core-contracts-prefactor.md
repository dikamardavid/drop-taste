# 01 — Shared Core Contracts & Ingestion Prefactor

**What to build:**
Fondasi kontrak data bersama yang bersifat stack-agnostic untuk seluruh layanan Drop Taste. Menyediakan definisi tipe data baku untuk entitas penangkapan (`page`, `component`, `image`), representasi AST Figma Node terstandarisasi, skema validasi dokumen kanonikal `design.md` versi 1.0, utilitas clipboard dual-MIME untuk kebutuhan paste Figma, serta generator prompt snippet referensi agen yang dilengkapi perlindungan anti-prompt injection. Pilihan teknologi implementasi spesifik akan diselaraskan oleh Achmad Wahyudi.

**Blocked by:** None — can start immediately.

**Status:** ready-for-agent

- [ ] Definisi kontrak tipe data baku untuk `CaptureType`, metadata tangkapan, dan dimensi layout.
- [ ] Model data terstandarisasi untuk Figma Node AST (Frames, Auto Layout attributes, Text nodes, Vectors).
- [ ] Parser dan validator dokumen `design.md` (memastikan keberadaan frontmatter YAML 1.0 dan 5 seksi standar).
- [ ] Fungsi serializer prompt referensi agen dengan sanitasi karakter kontrol dan proteksi prompt injection.
- [ ] Pengujian unit otomatis memverifikasi kebenaran serialisasi dan ketahanan terhadap injeksi input.
