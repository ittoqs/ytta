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
</script>

<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
  <div class="neo-box bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 relative animate-in fade-in zoom-in duration-150">
    <!-- Close Button -->
    <button
      on:click={onClose}
      class="absolute top-4 right-4 neo-btn neo-btn-yellow w-8 h-8 text-lg font-black"
    >
      ✕
    </button>

    <div class="space-y-6">
      <!-- Header Info -->
      <div class="flex items-start gap-4">
        <div class="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 border-2 border-black flex-shrink-0 p-2 flex items-center justify-center">
          <img src={laptop.image_url} alt={laptop.model} class="max-h-full max-w-full object-contain" />
        </div>

        <div class="space-y-1">
          <span class="neo-badge bg-[#0066FF] text-white">{laptop.brand}</span>
          <h2 class="text-xl sm:text-2xl font-black uppercase leading-tight">{laptop.model}</h2>
          <p class="text-xl font-black text-[#0066FF]">{formatIDR(laptop.price)}</p>
          <div class="flex items-center gap-2 pt-1 text-xs font-bold">
            <span>⭐ {laptop.rating} ({laptop.review_count} ulasan)</span>
            <span>• Range: {laptop.price_range}</span>
          </div>
        </div>
      </div>

      <!-- Compatibility Bar if available -->
      {#if recResult}
        <div class="neo-box-sm p-4 bg-sky-50 space-y-2">
          <div class="flex justify-between items-center text-xs font-black uppercase">
            <span>Kompatibilitas SPK ({recResult.compatibility_score}%)</span>
            <span class="neo-badge bg-[#00CC66]">Rank #{recResult.rank}</span>
          </div>
          <div class="w-full bg-gray-200 h-4 border-2 border-black overflow-hidden">
            <div class="bg-[#00CC66] h-full" style="width: {recResult.compatibility_score}%"></div>
          </div>
        </div>
      {/if}

      <!-- Detailed Specs Grid -->
      <div>
        <h3 class="text-base font-black uppercase border-b-2 border-black pb-1 mb-3">📋 Spesifikasi Hardware Lengkap</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div class="neo-box-sm p-3 bg-gray-50">
            <span class="font-bold text-gray-500 uppercase block text-[10px]">Processor / CPU:</span>
            <span class="font-bold text-black">{laptop.specs.cpu.name} ({laptop.specs.cpu.cores} Cores / {laptop.specs.cpu.threads} Threads)</span>
          </div>

          <div class="neo-box-sm p-3 bg-gray-50">
            <span class="font-bold text-gray-500 uppercase block text-[10px]">Kartu Grafis / GPU:</span>
            <span class="font-bold text-black">{laptop.specs.gpu.name} ({laptop.specs.gpu.vram > 0 ? `${laptop.specs.gpu.vram}GB VRAM` : 'Integrated'})</span>
          </div>

          <div class="neo-box-sm p-3 bg-gray-50">
            <span class="font-bold text-gray-500 uppercase block text-[10px]">RAM System:</span>
            <span class="font-bold text-black">{laptop.specs.ram} GB DDR4/DDR5</span>
          </div>

          <div class="neo-box-sm p-3 bg-gray-50">
            <span class="font-bold text-gray-500 uppercase block text-[10px]">Storage Penyimpanan:</span>
            <span class="font-bold text-black">{laptop.specs.storage.capacity} GB {laptop.specs.storage.type} NVMe</span>
          </div>

          <div class="neo-box-sm p-3 bg-gray-50">
            <span class="font-bold text-gray-500 uppercase block text-[10px]">Layar Display:</span>
            <span class="font-bold text-black">{laptop.specs.display.size}" {laptop.specs.display.resolution} {laptop.specs.display.refresh_rate}Hz {laptop.specs.display.panel_type}</span>
          </div>

          <div class="neo-box-sm p-3 bg-gray-50">
            <span class="font-bold text-gray-500 uppercase block text-[10px]">Baterai & Bobot:</span>
            <span class="font-bold text-black">Hingga {laptop.specs.battery} Jam / {laptop.specs.weight} kg</span>
          </div>
        </div>
      </div>

      <!-- Suitable Professions -->
      <div>
        <h3 class="text-base font-black uppercase border-b-2 border-black pb-1 mb-2">🎯 Cocok Untuk Profesi:</h3>
        <div class="flex flex-wrap gap-2">
          {#each laptop.suitable_for as prof}
            <span class="neo-badge bg-[#FFCC00] text-black uppercase font-bold text-xs">
              {prof}
            </span>
          {/each}
        </div>
      </div>

      <!-- Bottom Toolbar -->
      <div class="pt-4 border-t-2 border-black flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-2">
          <button
            on:click={() => onToggleFavorite(laptop.id)}
            class="neo-btn neo-btn-outline px-4 py-2 text-xs font-bold"
          >
            {isFavorite ? '❤️ Disimpan di Favorit' : '🤍 Tambah ke Favorit'}
          </button>

          <button
            on:click={() => onToggleCompare(laptop.id)}
            class="neo-btn neo-btn-outline px-4 py-2 text-xs font-bold {isInCompare ? 'bg-[#FFCC00]' : ''}"
          >
            ⚖️ {isInCompare ? 'Hapus dari Pembanding' : '+ Bandingkan'}
          </button>
        </div>

        <button
          on:click={onClose}
          class="neo-btn neo-btn-yellow px-6 py-2 text-xs font-bold"
        >
          Tutup Detail
        </button>
      </div>
    </div>
  </div>
</div>
