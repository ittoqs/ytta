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
    if (score >= 85) return 'bg-[#00CC66] text-black border-black';
    if (score >= 70) return 'bg-[#FFCC00] text-black border-black';
    return 'bg-sky-400 text-black border-black';
  }
</script>

<div class="space-y-6 sm:space-y-8">
  <!-- Top Banner -->
  <div class="neo-box p-5 sm:p-6 bg-[#0055DD] text-white border-3 border-black">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <span class="neo-badge bg-[#FFCC00] text-black border border-black font-black">Hasil Perhitungan SPK</span>
        <h2 class="text-xl sm:text-2xl lg:text-3xl font-black uppercase mt-2">
          {results.length} Laptop Rekomendasi Terbaik Untuk {preferences.profession || 'Kebutuhan Terpilih'}
        </h2>
        <p class="text-xs sm:text-sm font-bold text-yellow-200 mt-1">
          Diurutkan secara obyektif dari Compatibility Score (0-100%) berdasarkan metode Weighted Scoring.
        </p>
      </div>

      <button
        type="button"
        on:click={onReset}
        class="neo-btn px-4 py-2 text-xs sm:text-sm font-black bg-[#FFCC00] text-black hover:bg-yellow-400 border-2 border-black self-start sm:self-center"
      >
        🔄 Ulangi Wizard
      </button>
    </div>
  </div>

  {#if results.length === 0}
    <div class="neo-box p-8 sm:p-12 text-center bg-white space-y-4 border-3 border-black">
      <div class="text-4xl sm:text-5xl">🔍</div>
      <h3 class="text-lg sm:text-xl font-black uppercase text-black">Tidak Ada Laptop Yang Cocok Persis</h3>
      <p class="text-xs sm:text-sm text-gray-700 max-w-md mx-auto font-medium">
        Kriteria filter atau kustomisasi hardware terlalu ketat. Coba longgarkan rentang anggaran atau batas spesifikasi minimum.
      </p>
      <button
        type="button"
        on:click={onReset}
        class="neo-btn px-6 py-2.5 text-xs sm:text-sm font-black bg-[#00CC66] text-black hover:bg-[#00b359] border-2 border-black"
      >
        Reset Kriteria & Coba Lagi
      </button>
    </div>
  {:else}
    <!-- Results Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each results as item (item.laptop.id)}
        <div class="neo-box bg-white p-5 flex flex-col justify-between relative group border-3 border-black text-black">
          <!-- Rank Badge -->
          <div class="absolute -top-3 -left-3 z-10">
            <span class="neo-badge text-xs sm:text-sm uppercase px-3 py-1 font-black border-2 border-black {item.rank === 1 ? 'bg-[#FFCC00] text-black shadow-[2px_2px_0_#000]' : 'bg-black text-white'}">
              #{item.rank} {item.rank === 1 ? '🥇 REKOMENDASI TERBAIK' : ''}
            </span>
          </div>

          <div>
            <!-- Header buttons -->
            <div class="flex items-center justify-end gap-2 mb-3">
              <button
                type="button"
                on:click={() => onToggleFavorite(item.laptop.id)}
                class="neo-btn p-1.5 text-xs font-black border-2 border-black transition-colors {favorites.includes(item.laptop.id) ? 'bg-red-500 text-white shadow-[2px_2px_0_#000]' : 'bg-white text-black hover:bg-yellow-100'}"
                title="Simpan ke Favorit"
                aria-label="Simpan ke Favorit"
              >
                {favorites.includes(item.laptop.id) ? '❤️' : '🤍'}
              </button>

              <button
                type="button"
                on:click={() => onToggleCompare(item.laptop.id)}
                class="neo-btn p-1.5 px-2.5 text-xs font-black border-2 border-black transition-colors {compareList.includes(item.laptop.id) ? 'bg-[#FFCC00] text-black shadow-[2px_2px_0_#000] ring-2 ring-black' : 'bg-white text-black hover:bg-yellow-100'}"
                title="Bandingkan"
              >
                ⚖️ {compareList.includes(item.laptop.id) ? 'Didepan' : '+ Compare'}
              </button>
            </div>

            <!-- Laptop Image & Compatibility Score Overlay -->
            <div class="relative bg-gray-50 border-2 border-black mb-4 overflow-hidden h-48 flex items-center justify-center p-3">
              <img
                src={item.laptop.image_url}
                alt={item.laptop.model}
                class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                loading="lazy"
              />
              <div class="absolute bottom-2 right-2">
                <span class="neo-badge text-xs font-black uppercase px-2.5 py-1 border-2 {getScoreColor(item.compatibility_score)}">
                  Skor {item.compatibility_score}%
                </span>
              </div>
            </div>

            <!-- Laptop Title & Brand -->
            <div class="mb-3">
              <span class="text-[10px] font-mono font-black uppercase text-gray-600 block">{item.laptop.brand}</span>
              <h3 class="text-base font-black uppercase leading-tight line-clamp-2 text-black">{item.laptop.model}</h3>
              <p class="text-lg font-black text-[#0055DD] mt-1">{formatIDR(item.laptop.price)}</p>
            </div>

            <!-- Specs Summary -->
            <div class="neo-box-sm p-3 bg-slate-50 text-xs space-y-1.5 font-mono mb-4 border-2 border-black text-black">
              <div class="flex justify-between items-center gap-2">
                <span class="text-gray-600 font-bold">CPU:</span>
                <span class="font-black text-black truncate max-w-[170px] text-right">{item.laptop.specs.cpu.name}</span>
              </div>
              <div class="flex justify-between items-center gap-2">
                <span class="text-gray-600 font-bold">RAM / SSD:</span>
                <span class="font-black text-black">{item.laptop.specs.ram}GB / {item.laptop.specs.storage.capacity}GB</span>
              </div>
              <div class="flex justify-between items-center gap-2">
                <span class="text-gray-600 font-bold">GPU:</span>
                <span class="font-black text-black truncate max-w-[170px] text-right">{item.laptop.specs.gpu.name}</span>
              </div>
              <div class="flex justify-between items-center gap-2">
                <span class="text-gray-600 font-bold">Display:</span>
                <span class="font-black text-black">{item.laptop.specs.display.size}" {item.laptop.specs.display.panel_type} {item.laptop.specs.display.refresh_rate}Hz</span>
              </div>
              <div class="flex justify-between items-center gap-2">
                <span class="text-gray-600 font-bold">Bobot:</span>
                <span class="font-black text-black">{item.laptop.specs.weight} kg</span>
              </div>
            </div>

            <!-- Match Reasons -->
            <div class="space-y-1 mb-4">
              <div class="text-[10px] font-black uppercase text-gray-600">Alasan Kompatibilitas:</div>
              {#each item.match_reasons as reason}
                <div class="text-[11px] font-bold text-gray-800 flex items-start gap-1">
                  <span class="text-[#008844] font-black">✓</span>
                  <span>{reason}</span>
                </div>
              {/each}
            </div>
          </div>

          <!-- Bottom Action -->
          <button
            type="button"
            on:click={() => onSelectLaptop(item.laptop.id)}
            class="neo-btn w-full py-2.5 text-xs font-black uppercase bg-[#00CC66] text-black hover:bg-[#00b359] border-2 border-black"
          >
            🔍 Lihat Detail Lengkap
          </button>
        </div>
      {/each}
    </div>
  {/if}
</div>
