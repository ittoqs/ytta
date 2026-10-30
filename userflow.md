# User Flow - Smart Laptop Advisor

Dokumen ini menjelaskan alur kerja dan interaksi pengguna (*user flow*) pada aplikasi web **Smart Laptop Advisor**, mulai dari saat pertama kali membuka halaman awal hingga keputusan akhir dibuat.

---

## Ringkasan Alur Utama


```

[1. Landing Page] ──(Klik "Mulai Sekarang")──> [2. Wizard Langkah 1: Pilih Profesi]
│
(Lanjut / Lewati)
▼
[4. Langkah 4: Hasil Rekomendasi] <──(Proses SPK)── [3. Wizard Langkah 2 & 3: Preferensi & Hardware]
│
├─> [4a. Detail Laptop] ──> [Bandingkan / Beli]
├─> [4b. Mode Pembandingan (Compare)]
├─> [4c. Simpan ke Favorit (Bookmark)]
└─> [4d. Bagikan / Reset]

```

---

## Detail Alur Kerja Pengguna (Step-by-Step)

### 1. Halaman Landing (Home / Entry Point)
* **Aksi Pengguna**: Pengguna membuka URL aplikasi web.
* **Tampilan**: 
  * Header navigasi (Logo, Menu, Tombol Favorit).
  * Section Hero dengan penjelas singkat fungsi aplikasi.
  * *Call-to-Action* (CTA) utama: **"Mulai Sekarang"** atau **"Cari Laptop Saya"**.
  * FAQ & Penjelasan Singkat Metode Rekomendasi (Weighted Scoring).
* **Keputusan Pengguna**:
  * Membaca informasi dan mengklik tombol CTA **"Mulai Sekarang"** untuk memulai wizard.

---

### 2. Wizard Langkah 1: Pemilihan Profesi (Core Step)
* **Tampilan**:
  * Grid berisi 8+ pilihan preset profesi:
    1. Kreator Konten
    2. Programmer / Developer
    3. Game Tester
    4. Guru / Dosen
    5. Siswa / Mahasiswa
    6. Pekerja Kantoran
    7. Influencer / Streamer
    8. Data Analyst
    9. Personalisasi (Custom)
* **Aksi Pengguna**:
  * Memilih 1 kartu profesi yang paling sesuai.
  * Sistem secara otomatis mengisi draf bobot & kriteria spesifikasi dasar secara latar belakang.
* **Keputusan Pengguna**:
  * Mengklik **"Lanjut ke Preferensi"** ATAU mengklik **"Langsung Lihat Rekomendasi"** (Skip ke Langkah 4).

---

### 3. Wizard Langkah 2 & 3: Preferensi Opsional & Manual Tweak (Refinement)

#### Langkah 2: Form Preferensi Detail (Opsional)
* **Tampilan Form**:
  * Tingkat Penggunaan: Jarang / Sedang / Berat.
  * Kebutuhan Portabilitas: Ya (ringan/tipis) / Tidak.
  * Rentang Anggaran (Budget Range): < 5 Juta, 5-8 Juta, 8-12 Juta, 12 Juta+.
  * Kebutuhan Gaming: Ya / Tidak.
  * Prioritas Utama: Performa / Ketahanan Baterai / Desain & Bobot / Harga Murah.
* **Aksi Pengguna**: Menjawab pertanyaan preferensi sesuai kebutuhan spesifik.

#### Langkah 3: Penyesuaian Hardware Manual (Opsional / Advanced)
* **Tampilan Form**:
  * Penyesuaian kriteria teknis manual jika pengguna memiliki preferensi hardware tertentu (CPU, RAM minimum, Tipe GPU, Storage SSD/HDD, Ukuran & Resolusi Layar, Durasi Baterai).
* **Aksi Pengguna**: Mengatur slider/dropdown atau membiarkan default dari preset profesi.
* **Keputusan Pengguna**: Mengklik tombol **"Dapatkan Rekomendasi"**.

---

### 4. Halaman Hasil Rekomendasi (Output SPK)
* **Proses Sistem**:
  * Algoritma *Weighted Scoring* menghitung compatibility score untuk seluruh laptop di database.
* **Tampilan**:
  * Menampilkan 3–5 Laptop Teratas (Top Recommendations) diurutkan berdasarkan **Compatibility Score (0–10)**.
  * Kartu Laptop berisi: Foto, Nama Model, Harga, Skor Kecocokan, Spesifikasi Ringkas, Badge Keunggulan, dan Alasan Rekomendasi.
* **Interaksi & Keputusan Pengguna**:
  1. **Lihat Detail**: Mengklik "Detail Lengkap" untuk membuka modal/halaman spesifikasi mendalam.
  2. **Mode Bandingkan (Compare)**: Memilih 2–3 laptop lalu mengklik "Bandingkan" untuk melihat tabel komparasi *side-by-side*.
  3. **Simpan Favorit**: Mengklik ikon hati/bookmark untuk menyimpan laptop ke `localStorage`.
  4. **Cek Harga / Beli**: Mengklik link eksternal ke marketplace/toko online.
  5. **Mulai Ulang**: Mengklik "Reset" untuk mengulang wizard dari awal.

```

---
