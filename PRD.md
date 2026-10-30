# Product Requirement Document (PRD)
# Smart Laptop Advisor - SPK Laptop Berbasis Web

## 1. Ringkasan Eksekutif

**Smart Laptop Advisor** adalah aplikasi web berbasis Sistem Pendukung Keputusan (SPK) yang membantu pengguna awam memilih laptop yang sesuai dengan kebutuhan mereka. Aplikasi ini menggunakan metode Weighted Scoring untuk memberikan rekomendasi laptop berdasarkan profesi, preferensi, dan spesifikasi hardware yang dipilih.

**Target User**: Mahasiswa, pekerja kantoran, kreator konten, programmer, game tester, guru, dan pengguna umum yang bingung memilih laptop.

**Visi**: Mempermudah keputusan pembelian laptop dengan antarmuka yang intuitif dan rekomendasi yang akurat.

---

## 2. Tujuan dan KPI

### Tujuan Produk:
- ✅ Membantu pengguna memahami spesifikasi laptop tanpa perlu expertise teknis
- ✅ Memberikan rekomendasi yang dipersonalisasi berdasarkan profesi dan kebutuhan
- ✅ Meningkatkan kepuasan pengguna dalam memilih laptop yang tepat
- ✅ Menyediakan platform yang mudah diakses dari berbagai perangkat

### KPI (Key Performance Indicators):
- User Satisfaction Rate: > 80%
- Average Recommendation Accuracy: > 85%
- Page Load Time: < 2 detik
- Mobile Responsiveness: 100% pada semua ukuran layar
- Conversion Rate (pengguna yang menyelesaikan workflow): > 60%

---

## 3. Fitur Utama

### 3.1 Halaman Landing (Home)
- Penjelasan singkat tentang aplikasi
- CTA (Call-to-Action) "Mulai Sekarang"
- Testimonial atau FAQ singkat

### 3.2 Wizard Pemilihan Profesi
- **Langkah 1**: Pilih 1 dari 8+ preset profesi (Kreator Konten, Programmer, Game Tester, Guru, Siswa, Pekerja Kantoran, Influencer, Data Analyst, Personalisasi)
- Setiap profesi memiliki deskripsi dan ikon/gambar
- Auto-generate rekomendasi spesifikasi dasar

### 3.3 Form Preferensi Opsional (Langkah 2)
- Tingkat penggunaan (Jarang, Sedang, Berat)
- Kebutuhan portabilitas (Ya/Tidak)
- Range budget
- Kebutuhan gaming
- Prioritas (Performa, Baterai, Desain, Harga)
- Live preview update saat user menjawab

### 3.4 Form Penyesuaian Hardware Manual (Langkah 3 - Opsional)
Pengguna bisa override spesifikasi otomatis:
- **CPU**: Tingkat, Brand, Generasi
- **RAM**: Kapasitas (4GB-64GB)
- **GPU**: Tipe, VRAM, Brand
- **Storage**: Tipe (SSD/HDD), Kapasitas
- **Display**: Ukuran, Resolusi, Refresh Rate, Panel Type
- **Baterai**: Estimasi durasi, Wattage
- **Bobot & Ukuran**: Kategori portabilitas

### 3.5 Hasil Rekomendasi (Langkah 4)
- Tampilkan 3-5 laptop top recommendations
- Urutkan berdasarkan compatibility score (tertinggi dahulu)
- Untuk setiap laptop:
  - Gambar/foto
  - Nama model
  - Compatibility score (0-10)
  - Spesifikasi ringkas
  - Harga (jika tersedia)
  - Badge keunggulan
  - Alasan dipilih
  - Tombol: Detail Lengkap, Bandingkan, Cek Harga

### 3.6 Halaman Detail Laptop
- Spesifikasi lengkap
- Keunggulan & kekurangan
- Cocok untuk... (list profesi)
- Tidak cocok untuk... (list profesi)
- Perbandingan grafis dengan rekomendasi lain
- Rating pengguna
- Link ke toko online (opsional)

### 3.7 Fitur Tambahan
- **Compare Mode**: Bandingkan 2-3 laptop side-by-side
- **Favorite**: Simpan rekomendasi ke local storage / account
- **Share**: Bagikan rekomendasi ke teman (generate link atau image)
- **Feedback**: Rating dan review rekomendasi
- **Reset/Mulai Ulang**: Ulangi wizard dari awal

---

## 4. User Flow

*Detail di file `USERFLOW.md`*

---

## 5. Data Model

### 5.1 Laptop Object
```json
{
  "id": "string",
  "brand": "string",
  "model": "string",
  "price": "number",
  "image_url": "string",
  "specs": {
    "cpu": { "name": "string", "cores": "number", "threads": "number" },
    "gpu": { "name": "string", "vram": "number" },
    "ram": "number (GB)",
    "storage": { "type": "SSD|HDD", "capacity": "number (GB)" },
    "display": { "size": "number", "resolution": "string", "refresh_rate": "number", "panel_type": "string" },
    "battery": "number (hours)",
    "weight": "number (kg)"
  },
  "price_range": "3-5M|5-8M|8-12M|12M+",
  "suitable_for": ["string (profesi)"],
  "rating": "number (0-5)",
  "review_count": "number"
}
```

### 5.2 Recommendation Object
```json
{
  "laptop_id": "string",
  "user_profile": {
    "profession": "string",
    "usage_intensity": "Jarang|Sedang|Berat",
    "portability_needed": "boolean",
    "budget_range": "string",
    "gaming_needed": "boolean",
    "priorities": ["string"]
  },
  "custom_specs": { ... },
  "compatibility_score": "number (0-10)",
  "reason": "string",
  "rank": "number"
}
```

---

## 6. Algoritma Recommendation

### Metode: Weighted Scoring

**Formula**:
```
Compatibility Score = (Σ(weight × normalized_score)) / Σ(weight)

Untuk setiap aspek (CPU, GPU, RAM, Storage, Display, Price, Portability):
- Normalisasi nilai ke 0-10
- Kalikan dengan bobot (tergantung profesi)
- Jumlahkan semua
- Bagi dengan total bobot
```

### Contoh Bobot untuk Kreator Konten:
| Aspek | Bobot |
|-------|-------|
| CPU | 25% |
| GPU | 25% |
| RAM | 20% |
| Storage | 15% |
| Display Quality | 15% |

### Contoh Bobot untuk Siswa:
| Aspek | Bobot |
|-------|-------|
| CPU | 15% |
| RAM | 20% |
| Storage | 15% |
| Price | 30% |
| Portability | 20% |

---

## 7. User Interface & Design System

### 7.1 Design Language
- **Style**: Neo-Brutalism dengan aksen KDE Plasma
- **Warna Utama**: 
  - Biru Cerah (#0066FF)
  - Putih (#FFFFFF, #F5F5F5)
  - Hijau Cerah (#00CC66)
  - Merah (#FF3333)
  - Hitam (#0A0A0A)
- **Typography**: 
  - Heading: Bold, sans-serif
  - Body: Regular, sans-serif
  - Monospace untuk spec values
- **Spacing**: 8px grid
- **Border Radius**: 0px-4px (brutalist style)
- **Shadows**: Minimal atau flat (neo-brutalism)

### 7.2 Responsive Design
- Mobile: 320px - 480px
- Tablet: 481px - 768px
- Desktop: 769px+
- All layouts touch-friendly (button min 48px)

---

## 8. Technical Stack

### Frontend:
- **Framework**: Svelte (SPA)
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Custom CSS (Neo-Brutalism)
- **State Management**: Svelte stores
- **Routing**: SvelteKit (opsional) atau client-side routing
- **UI Components**: Custom components

### Backend (Opsional):
- **Runtime**: Python Flask
- **Database**: JSON file (untuk prototype) / PostgreSQL (production)
- **Hosting**: Vercel (frontend), Vercel Serverless Functions atau Railway (backend)

### Data:
- **Laptop Data**: JSON file yang dapat di-update
- **Storage**: Browser localStorage untuk favorites

### DevOps:
- **Version Control**: GitHub
- **CI/CD**: GitHub Actions
- **Deployment**: Vercel
- **Monitoring**: Sentry (optional)

---

## 9. Acceptance Criteria

### Feature Completeness
- [ ] Landing page dengan CTA yang jelas
- [ ] Wizard 3-4 langkah berfungsi penuh
- [ ] Recommendation engine menampilkan 3-5 laptop teratas
- [ ] Detail page untuk setiap laptop
- [ ] Compare mode bekerja dengan baik
- [ ] Responsive di mobile, tablet, desktop

### Performance
- [ ] Page load time < 2 detik (dengan cache)
- [ ] First Contentful Paint < 1 detik
- [ ] Interaction to Next Paint (INP) < 100ms
- [ ] Cumulative Layout Shift (CLS) < 0.1

### Quality
- [ ] Unit tests untuk calculation logic (min 80% coverage)
- [ ] E2E tests untuk user flows utama
- [ ] Accessibility: WCAG 2.1 AA standard
- [ ] Cross-browser testing: Chrome, Firefox, Safari, Edge

### User Experience
- [ ] User satisfaction >= 80% (survey)
- [ ] Recommendation accuracy >= 85%
- [ ] No confusion dalam navigation
- [ ] Clear error messages dan guidance

---

## 10. Go-Live Roadmap

### Phase 1: MVP (Week 1-2)
- Landing page
- Basic wizard (profesi + hasil)
- 5-10 laptop sample data
- Mobile & desktop responsive

### Phase 2: Enhancement (Week 3-4)
- Extended preferences form
- Hardware customization
- Compare mode
- Favorites feature

### Phase 3: Polish & Deploy (Week 5-6)
- Design refinement
- Performance optimization
- Bug fixes
- Deployment ke Vercel

### Phase 4: Post-Launch (Week 7+)
- User feedback collection
- Data expansion (lebih banyak laptop)
- Advanced features (filters, sorting)
- Backend setup jika diperlukan

---

## 11. Success Metrics (Post-Launch)

- 1000+ monthly active users dalam 3 bulan pertama
- 70%+ completion rate dari wizard
- 4.5+ rating dari user reviews
- 0 critical bugs selama 30 hari pertama
- Average time on site >= 3 menit

---

## 12. Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Data laptop tidak akurat | High | Regular updates, source dari official specs, user feedback |
| Algorithm tidak akurat | High | Testing extensive, A/B testing, feedback loop |
| Performance issues | Medium | Optimize build, lazy loading, caching |
| Poor UX pada mobile | Medium | Mobile-first design, testing |
| Incomplete laptop database | Medium | Start with 20-30 popular models, expand gradually |

---

## 13. Appendix

### A. Supported Professions
1. Kreator Konten (Video Editing, Fotografi, Desain Grafis)
2. Programmer/Developer
3. Game Tester
4. Guru/Dosen
5. Siswa/Mahasiswa
6. Pekerja Kantoran
7. Influencer/Streamer
8. Data Analyst
9. Personalisasi (Custom)

### B. Hardware Parameters
- CPU: i3, i5, i7, i9, Ryzen 3, 5, 7, 9
- RAM: 4GB, 8GB, 16GB, 32GB, 64GB
- GPU: Integrated, GTX, RTX, AMD Radeon, Intel Arc
- Storage: SSD, HDD; 256GB, 512GB, 1TB, 2TB
- Display: 13.3", 14", 15.6", 17.3"; 1080p, 1440p, 2.8K, 4K; 60Hz, 120Hz, 144Hz, 165Hz, 240Hz
- Battery: 4-12 jam
- Weight: Ultrabook (<1.5kg), Portable (1.5-2kg), Standard (2-2.5kg), Desktop Replacement (>2.5kg)

---

**Document Version**: 1.0  
**Last Updated**: October 2026  
**Author**: Dev Team  
**Status**: Ready for Development
```

---
