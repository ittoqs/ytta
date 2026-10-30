<script lang="ts">
  import type { Laptop } from '../lib/spkEngine';

  export let laptops: Laptop[];
  export let onRemoveFavorite: (id: string) => void;
  export let onSelectLaptop: (id: string) => void;

  function formatIDR(price: number): string {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);
  }
</script>

<div class="space-y-8">
  <!-- Title Banner -->
  <div class="neo-box p-6 bg-[#FF3333] text-white">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <span class="neo-badge bg-[#FFCC00] text-black">Saved Items</span>
        <h2 class="text-2xl lg:text-3xl font-black uppercase mt-2">Daftar Laptop Favorit Anda</h2>
        <p class="text-xs lg:text-sm font-semibold text-red-100">
          Laptop yang telah Anda bookmark disimpan di penyimpanan lokal perangkat ini.
        </p>
      </div>
    </div>
  </div>

  {#if laptops.length === 0}
    <div class="neo-box p-12 text-center bg-white space-y-4">
      <div class="text-5xl">❤️</div>
      <h3 class="text-xl font-black uppercase">Belum Ada Laptop Favorit</h3>
      <p class="text-sm text-gray-600 max-w-md mx-auto">
        Klik ikon hati (❤️) pada kartu laptop rekomendasi untuk menyimpan laptop favorit Anda di sini.
      </p>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each laptops as lap (lap.id)}
        <div class="neo-box bg-white p-5 flex flex-col justify-between relative">
          <div>
            <!-- Header buttons -->
            <div class="flex items-center justify-between mb-3">
              <span class="neo-badge bg-[#0066FF] text-white">{lap.brand}</span>
              <button
                on:click={() => onRemoveFavorite(lap.id)}
                class="neo-btn neo-btn-outline p-1 text-xs font-bold bg-red-100 hover:bg-red-200"
                title="Hapus dari Favorit"
              >
                ❤️ Hapus
              </button>
            </div>

            <!-- Laptop Image -->
            <div class="bg-gray-100 border-2 border-black mb-4 overflow-hidden h-44 flex items-center justify-center p-2">
              <img src={lap.image_url} alt={lap.model} class="max-h-full max-w-full object-contain" />
            </div>

            <!-- Laptop Title -->
            <div class="mb-3">
              <h3 class="text-base font-black uppercase leading-tight line-clamp-2">{lap.model}</h3>
              <p class="text-lg font-black text-[#0066FF] mt-1">{formatIDR(lap.price)}</p>
            </div>

            <!-- Specs Summary -->
            <div class="neo-box-sm p-3 bg-slate-50 text-xs space-y-1 font-mono mb-4">
              <div class="flex justify-between">
                <span class="text-gray-500">CPU:</span>
                <span class="font-bold text-black truncate max-w-[160px]">{lap.specs.cpu.name}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">RAM / SSD:</span>
                <span class="font-bold text-black">{lap.specs.ram}GB / {lap.specs.storage.capacity}GB</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">GPU:</span>
                <span class="font-bold text-black truncate max-w-[160px]">{lap.specs.gpu.name}</span>
              </div>
            </div>
          </div>

          <!-- Bottom Action -->
          <button
            on:click={() => onSelectLaptop(lap.id)}
            class="neo-btn neo-btn-accent w-full py-2 text-xs font-black uppercase"
          >
            🔍 Lihat Detail
          </button>
        </div>
      {/each}
    </div>
  {/if}
</div>
