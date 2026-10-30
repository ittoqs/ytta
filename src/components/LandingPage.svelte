<script lang="ts">
  export let onStartWizard: () => void;
  export let onSelectProfession: (prof: string) => void;

  const quickProfessions = [
    { title: 'Kreator Konten', icon: '🎬', desc: 'Editing video, render & grafis' },
    { title: 'Programmer', icon: '💻', desc: 'Coding, Docker, emulator & IDE' },
    { title: 'Siswa', icon: '🎓', desc: 'Tugas sekolah, browsing & Zoom' },
    { title: 'Game Tester', icon: '🎮', desc: 'Gaming AAA & uji performa FPS' }
  ];

  const faqs = [
    {
      q: 'Bagaimana cara kerja Smart Laptop Advisor?',
      a: 'Aplikasi ini menerapkan Sistem Pendukung Keputusan (SPK) menggunakan metode Weighted Scoring. Bobot prioritas dihitung berdasarkan kebutuhan profesi Anda dan dicocokkan secara matematis dengan spesifikasi laptop.'
    },
    {
      q: 'Apakah saya bisa mengubah spesifikasi kriteria sendiri?',
      a: 'Tentu! Setelah memilih profesi dasar, Anda dapat menyesuaikan preferensi tingkat penggunaan, anggaran, portabilitas, hingga kriteria hardware manual di Langkah 3.'
    },
    {
      q: 'Apakah data harga dan laptop ini diperbarui?',
      a: 'Data disinkronkan dari database spesifikasi resmi laptop terkini dengan perkiraan range harga pasar Indonesia.'
    }
  ];
</script>

<div class="space-y-16">
  <!-- Hero Section -->
  <section class="neo-box p-8 lg:p-12 bg-[#FFCC00] relative overflow-hidden">
    <div class="max-w-3xl space-y-6 relative z-10">
      <div class="inline-block bg-black text-white text-xs font-black uppercase px-3 py-1 border border-black shadow-[2px_2px_0_#fff]">
        ✨ SPK Rekomendasi Laptop Cerdas
      </div>

      <h1 class="text-4xl lg:text-6xl font-black uppercase tracking-tight text-black leading-none">
        Bingung Pilih Laptop Mana?
      </h1>

      <p class="text-base lg:text-xl font-bold text-black leading-relaxed">
        Temukan laptop terbaik yang cocok 100% untuk profesi, kebutuhan hardware, dan budget kamu hanya dalam 3 langkah mudah.
      </p>

      <div class="pt-4 flex flex-wrap items-center gap-4">
        <button
          on:click={onStartWizard}
          class="neo-btn text-lg px-8 py-4 bg-[#0066FF] hover:bg-[#0052cc] text-white flex items-center gap-3"
        >
          <span>🚀</span>
          <span>Mulai Cari Sekarang</span>
        </button>
      </div>
    </div>

    <!-- Decorative brutalist shape -->
    <div class="hidden md:block absolute -right-10 -bottom-10 w-72 h-72 bg-[#00CC66] border-4 border-black rotate-12 -z-0"></div>
  </section>

  <!-- Quick Profession Selector -->
  <section class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl lg:text-3xl font-black uppercase">Pilih Profesi Kamu</h2>
        <p class="text-sm text-gray-600 font-semibold">Rekomendasi langsung disesuaikan dengan kriteria umum profesi kamu</p>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {#each quickProfessions as prof}
        <button
          on:click={() => onSelectProfession(prof.title)}
          class="neo-box p-6 text-left cursor-pointer hover:bg-sky-50 flex flex-col justify-between group"
        >
          <div>
            <div class="text-4xl mb-3 group-hover:scale-110 transition-transform inline-block">
              {prof.icon}
            </div>
            <h3 class="text-lg font-black uppercase text-black">{prof.title}</h3>
            <p class="text-xs text-gray-600 font-medium mt-1">{prof.desc}</p>
          </div>
          <div class="mt-4 text-xs font-bold text-[#0066FF] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <span>Pilih Profesi</span>
            <span>→</span>
          </div>
        </button>
      {/each}
    </div>
  </section>

  <!-- How SPK Works -->
  <section class="neo-box p-8 bg-white space-y-6">
    <div class="border-b-4 border-black pb-4">
      <h2 class="text-2xl font-black uppercase flex items-center gap-2">
        <span>📊</span>
        <span>Metode SPK Weighted Scoring</span>
      </h2>
      <p class="text-sm text-gray-600 font-medium">Proses obyektif berbasis perhitungan matematis kriteria hardware</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
      <div class="neo-box-sm p-4 bg-sky-100">
        <div class="font-black text-2xl text-[#0066FF] mb-1">1</div>
        <h3 class="font-bold text-sm">Pilih Profesi</h3>
        <p class="text-xs text-gray-600 mt-1">Sistem otomatis menentukan pembobotan prioritas awal.</p>
      </div>

      <div class="neo-box-sm p-4 bg-emerald-100">
        <div class="font-black text-2xl text-[#00CC66] mb-1">2</div>
        <h3 class="font-bold text-sm">Kustomisasi Kriteria</h3>
        <p class="text-xs text-gray-600 mt-1">Atur budget, durasi baterai, portabilitas & hardware.</p>
      </div>

      <div class="neo-box-sm p-4 bg-amber-100">
        <div class="font-black text-2xl text-amber-600 mb-1">3</div>
        <h3 class="font-bold text-sm">Normalisasi Skor</h3>
        <p class="text-xs text-gray-600 mt-1">Setiap spesifikasi laptop dinormalisasi ke skala 0-10.</p>
      </div>

      <div class="neo-box-sm p-4 bg-purple-100">
        <div class="font-black text-2xl text-purple-600 mb-1">4</div>
        <h3 class="font-bold text-sm">Perhitungan Akurat</h3>
        <p class="text-xs text-gray-600 mt-1">Mendapatkan skor kompatibilitas (0-100%) dan peringkat.</p>
      </div>
    </div>
  </section>

  <!-- FAQ Section -->
  <section class="space-y-4">
    <h2 class="text-2xl font-black uppercase">Pertanyaan Sering Diajukan (FAQ)</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      {#each faqs as faq}
        <div class="neo-box-sm p-5 bg-white">
          <h3 class="font-black text-sm mb-2 flex items-start gap-2">
            <span class="text-[#0066FF]">❓</span>
            <span>{faq.q}</span>
          </h3>
          <p class="text-xs text-gray-600 font-medium leading-relaxed">{faq.a}</p>
        </div>
      {/each}
    </div>
  </section>
</div>
