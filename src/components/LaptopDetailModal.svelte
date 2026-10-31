<script lang="ts">
  import type { Laptop, RecommendationResult } from '../lib/spkEngine';

  export let laptop: Laptop;
  export let recResult: RecommendationResult | undefined = undefined;
  export let isFavorite = false;
  export let isInCompare = false;
  export let onClose: () => void;
  export let onToggleFavorite: (id: string) => void;
  export let onToggleCompare: (id: string) => void;

  function formatIDR(price: number): string {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      onClose();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div
  class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs"
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-laptop-title"
  tabindex="-1"
  on:click|self={onClose}
  on:keydown={handleKeydown}
>
  <div class="neo-box bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6 relative animate-in fade-in zoom-in duration-150 border-3 border-black text-black">
    <!-- Close Button -->
    <button
      type="button"
      on:click={onClose}
      class="absolute top-3 right-3 sm:top-4 sm:right-4 neo-btn bg-[#FFCC00] hover:bg-yellow-400 text-black w-8 h-8 text-base font-black border-2 border-black flex items-center justify-center"
      aria-label="Tutup Detail"
    >
      ✕
    </button>

    <div class="space-y-5 sm:space-y-6">
      <!-- Header Info -->
      <div class="flex flex-col sm:flex-row items-center sm:items-start gap-4 pr-8">
        <div class="w-28 h-28 sm:w-32 sm:h-32 bg-gray-50 border-2 border-black flex-shrink-0 p-2 flex items-center justify-center">
          <img src={laptop.image_url} alt={laptop.model} class="max-h-full max-w-full object-contain" />
        </div>

        <div class="space-y-1 text-center sm:text-left">
          <span class="neo-badge bg-[#0055DD] text-white border border-black font-black">{laptop.brand}</span>
          <h2 id="modal-laptop-title" class="text-lg sm:text-2xl font-black uppercase leading-tight text-black">{laptop.model}</h2>
          <p class="text-xl sm:text-2xl font-black text-[#0055DD]">{formatIDR(laptop.price)}</p>
          <div class="flex items-center justify-center sm:justify-start gap-2 pt-1 text-xs font-bold text-gray-700">
            <span>⭐ {laptop.rating} ({laptop.review_count} ulasan)</span>
            <span>• Range: {laptop.price_range}</span>
          </div>
        </div>
      </div>

      <!-- Compatibility Bar if available -->
      {#if recResult}
        <div class="neo-box-sm p-4 bg-sky-50 space-y-2 border-2 border-black">
          <div class="flex justify-between items-center text-xs font-black uppercase text-black">
            <span>Kompatibilitas SPK ({recResult.compatibility_score}%)</span>
            <span class="neo-badge bg-[#00CC66] text-black border border-black font-black">Rank #{recResult.rank}</span>
          </div>
          <div class="w-full bg-gray-200 h-4 border-2 border-black overflow-hidden">
            <div class="bg-[#00CC66] h-full" style="width: {recResult.compatibility_score}%"></div>
          </div>
        </div>
      {/if}

      <!-- Detailed Specs Grid -->
      <div>
        <h3 class="text-sm sm:text-base font-black uppercase border-b-2 border-black pb-1 mb-3 text-black">📋 Spesifikasi Hardware Lengkap</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div class="neo-box-sm p-3 bg-gray-50 border-2 border-black">
            <span class="font-black text-gray-700 uppercase block text-[10px]">Processor / CPU:</span>
            <span class="font-black text-black">{laptop.specs.cpu.name} ({laptop.specs.cpu.cores} Cores / {laptop.specs.cpu.threads} Threads)</span>
          </div>

          <div class="neo-box-sm p-3 bg-gray-50 border-2 border-black">
            <span class="font-black text-gray-700 uppercase block text-[10px]">Kartu Grafis / GPU:</span>
            <span class="font-black text-black">{laptop.specs.gpu.name} ({laptop.specs.gpu.vram > 0 ? `${laptop.specs.gpu.vram}GB VRAM` : 'Integrated'})</span>
          </div>

          <div class="neo-box-sm p-3 bg-gray-50 border-2 border-black">
            <span class="font-black text-gray-700 uppercase block text-[10px]">RAM System:</span>
            <span class="font-black text-black">{laptop.specs.ram} GB DDR4/DDR5</span>
          </div>

          <div class="neo-box-sm p-3 bg-gray-50 border-2 border-black">
            <span class="font-black text-gray-700 uppercase block text-[10px]">Storage Penyimpanan:</span>
            <span class="font-black text-black">{laptop.specs.storage.capacity} GB {laptop.specs.storage.type} NVMe</span>
          </div>

          <div class="neo-box-sm p-3 bg-gray-50 border-2 border-black">
            <span class="font-black text-gray-700 uppercase block text-[10px]">Layar Display:</span>
            <span class="font-black text-black">{laptop.specs.display.size}" {laptop.specs.display.resolution} {laptop.specs.display.refresh_rate}Hz {laptop.specs.display.panel_type}</span>
          </div>

          <div class="neo-box-sm p-3 bg-gray-50 border-2 border-black">
            <span class="font-black text-gray-700 uppercase block text-[10px]">Baterai & Bobot:</span>
            <span class="font-black text-black">Hingga {laptop.specs.battery} Jam / {laptop.specs.weight} kg</span>
          </div>
        </div>
      </div>

      <!-- Suitable Professions -->
      <div>
        <h3 class="text-sm sm:text-base font-black uppercase border-b-2 border-black pb-1 mb-2 text-black">🎯 Cocok Untuk Profesi:</h3>
        <div class="flex flex-wrap gap-2">
          {#each laptop.suitable_for as prof}
            <span class="neo-badge bg-[#FFCC00] text-black border border-black uppercase font-black text-xs">
              {prof}
            </span>
          {/each}
        </div>
      </div>

      <!-- Bottom Toolbar -->
      <div class="pt-4 border-t-2 border-black flex flex-col sm:flex-row items-center justify-between gap-3">
        <div class="flex items-center flex-wrap gap-2 w-full sm:w-auto">
          <button
            type="button"
            on:click={() => onToggleFavorite(laptop.id)}
            class="neo-btn px-4 py-2 text-xs font-black border-2 border-black transition-colors {isFavorite ? 'bg-red-500 text-white' : 'bg-white text-black hover:bg-yellow-100'}"
          >
            {isFavorite ? '❤️ Disimpan di Favorit' : '🤍 Tambah ke Favorit'}
          </button>

          <button
            type="button"
            on:click={() => onToggleCompare(laptop.id)}
            class="neo-btn px-4 py-2 text-xs font-black border-2 border-black transition-colors {isInCompare ? 'bg-[#FFCC00] text-black shadow-[2px_2px_0_#000]' : 'bg-white text-black hover:bg-yellow-100'}"
          >
            ⚖️ {isInCompare ? 'Hapus dari Pembanding' : '+ Bandingkan'}
          </button>
        </div>

        <button
          type="button"
          on:click={onClose}
          class="neo-btn px-6 py-2 text-xs font-black bg-[#FFCC00] text-black hover:bg-yellow-400 border-2 border-black w-full sm:w-auto"
        >
          Tutup Detail
        </button>
      </div>
    </div>
  </div>
</div>
