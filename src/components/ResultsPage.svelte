<script lang="ts">
  import type { RecommendationResult, UserPreferences } from '../lib/spkEngine';

  export let results: RecommendationResult[];
  export let preferences: UserPreferences;
  export let favorites: string[];
  export let compareList: string[];
  export let onToggleFavorite: (id: string) => void;
  export let onToggleCompare: (id: string) => void;
  export let onSelectLaptop: (id: string) => void;
  export let onReset: () => void;

  function formatIDR(price: number): string {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);
  }

  function getScoreColor(score: number): string {
    if (score >= 85) return 'bg-[#00CC66] text-black';
    if (score >= 70) return 'bg-[#FFCC00] text-black';
    return 'bg-sky-400 text-black';
  }
</script>

<div class="space-y-8">
  <!-- Top Banner -->
  <div class="neo-box p-6 bg-[#0066FF] text-white">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <span class="neo-badge bg-[#FFCC00] text-black">Hasil Perhitungan SPK</span>
        <h2 class="text-2xl lg:text-3xl font-black uppercase mt-2">
          {results.length} Laptop Rekomendasi Terbaik Untuk {preferences.profession || 'Anda'}
        </h2>
        <p class="text-xs lg:text-sm font-semibold text-blue-100 mt-1">
          Diurutkan secara obyektif dari Compatibility Score (0-100%) berdasarkan metode Weighted Scoring.
        </p>
      </div>

      <button
        on:click={onReset}
        class="neo-btn neo-btn-yellow px-4 py-2 text-xs font-bold"
      >
        🔄 Ulangi Wizard
      </button>
    </div>
  </div>

  {#if results.length === 0}
    <div class="neo-box p-12 text-center bg-white space-y-4">
      <div class="text-5xl">🔍</div>
      <h3 class="text-xl font-black uppercase">Tidak Ada Laptop Yang Cocok Persis</h3>
      <p class="text-sm text-gray-600 max-w-md mx-auto">
        Kriteria filter atau kustomisasi hardware kamu terlalu ketat. Coba longgarkan rentang anggaran atau batas spesifikasi minimum.
      </p>
      <button
        on:click={onReset}
        class="neo-btn neo-btn-accent px-6 py-2 text-sm"
      >
        Reset Kriteria & Coba Lagi
      </button>
    </div>
  {:else}
    <!-- Results Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each results as item (item.laptop.id)}
        <div class="neo-box bg-white p-5 flex flex-col justify-between relative group hover:translate-x-0.5 hover:translate-y-0.5">
          <!-- Rank Badge -->
          <div class="absolute -top-3 -left-3 z-10">
            <span class="neo-badge text-sm uppercase px-3 py-1 {item.rank === 1 ? 'bg-[#FFCC00] text-black' : 'bg-black text-white'}">
              #{item.rank} {item.rank === 1 ? '🥇 REKOMENDASI TERBAIK' : ''}
            </span>
          </div>

          <div>
            <!-- Header buttons -->
            <div class="flex items-center justify-end gap-2 mb-3">
              <button
                on:click={() => onToggleFavorite(item.laptop.id)}
                class="neo-btn neo-btn-outline p-1.5 text-xs font-bold"
                title="Simpan ke Favorit"
              >
                {favorites.includes(item.laptop.id) ? '❤️' : '🤍'}
              </button>

              <button
                on:click={() => onToggleCompare(item.laptop.id)}
                class="neo-btn neo-btn-outline p-1.5 text-xs font-bold {compareList.includes(item.laptop.id) ? 'bg-[#FFCC00]' : ''}"
                title="Bandingkan"
              >
                ⚖️ {compareList.includes(item.laptop.id) ? 'Didepan' : '+ Compare'}
              </button>
            </div>

            <!-- Laptop Image & Compatibility Score Overlay -->
            <div class="relative bg-gray-100 border-2 border-black mb-4 overflow-hidden h-48 flex items-center justify-center p-2">
              <img
                src={item.laptop.image_url}
                alt={item.laptop.model}
                class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
              />
              <div class="absolute bottom-2 right-2">
                <span class="neo-badge text-xs font-black uppercase px-2 py-1 {getScoreColor(item.compatibility_score)}">
                  Skor {item.compatibility_score}%
                </span>
              </div>
            </div>

            <!-- Laptop Title & Brand -->
            <div class="mb-3">
              <span class="text-[10px] font-mono font-bold uppercase text-gray-500">{item.laptop.brand}</span>
              <h3 class="text-base font-black uppercase leading-tight line-clamp-2">{item.laptop.model}</h3>
              <p class="text-lg font-black text-[#0066FF] mt-1">{formatIDR(item.laptop.price)}</p>
            </div>

            <!-- Specs Summary -->
            <div class="neo-box-sm p-3 bg-slate-50 text-xs space-y-1 font-mono mb-4">
              <div class="flex justify-between">
                <span class="text-gray-500">CPU:</span>
                <span class="font-bold text-black truncate max-w-[160px]">{item.laptop.specs.cpu.name}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">RAM / SSD:</span>
                <span class="font-bold text-black">{item.laptop.specs.ram}GB / {item.laptop.specs.storage.capacity}GB</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">GPU:</span>
                <span class="font-bold text-black truncate max-w-[160px]">{item.laptop.specs.gpu.name}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Display:</span>
                <span class="font-bold text-black">{item.laptop.specs.display.size}" {item.laptop.specs.display.panel_type} {item.laptop.specs.display.refresh_rate}Hz</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Bobot:</span>
                <span class="font-bold text-black">{item.laptop.specs.weight} kg</span>
              </div>
            </div>

            <!-- Match Reasons -->
            <div class="space-y-1 mb-4">
              <div class="text-[10px] font-bold uppercase text-gray-500">Alasan Kompatibilitas:</div>
              {#each item.match_reasons as reason}
                <div class="text-[11px] font-semibold text-gray-700 flex items-start gap-1">
                  <span class="text-[#00CC66]">✓</span>
                  <span>{reason}</span>
                </div>
              {/each}
            </div>
          </div>

          <!-- Bottom Action -->
          <button
            on:click={() => onSelectLaptop(item.laptop.id)}
            class="neo-btn neo-btn-accent w-full py-2.5 text-xs font-black uppercase"
          >
            🔍 Lihat Detail Lengkap
          </button>
        </div>
      {/each}
    </div>
  {/if}
</div>
