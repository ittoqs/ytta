<script lang="ts">
  import type { Laptop } from '../lib/spkEngine';

  export let laptops: Laptop[];
  export let onRemoveFavorite: (id: string) => void;
  export let onSelectLaptop: (id: string) => void;

  function formatIDR(price: number): string {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);
  }
</script>

<div class="space-y-6 sm:space-y-8">
  <!-- Title Banner -->
  <div class="neo-box p-5 sm:p-6 bg-[#FF3333] text-white border-3 border-black">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <span class="neo-badge bg-[#FFCC00] text-black border border-black font-black">Item Tersimpan</span>
        <h2 class="text-xl sm:text-2xl lg:text-3xl font-black uppercase mt-2">Daftar Laptop Favorit</h2>
        <p class="text-xs sm:text-sm font-bold text-yellow-100 mt-1">
          Laptop yang telah dibookmark disimpan di penyimpanan lokal perangkat ini.
        </p>
      </div>
    </div>
  </div>

  {#if laptops.length === 0}
    <div class="neo-box p-8 sm:p-12 text-center bg-white space-y-4 border-3 border-black text-black">
      <div class="text-4xl sm:text-5xl">❤️</div>
      <h3 class="text-lg sm:text-xl font-black uppercase text-black">Belum Ada Laptop Favorit</h3>
      <p class="text-xs sm:text-sm text-gray-700 max-w-md mx-auto font-medium">
        Klik ikon hati (❤️) pada kartu laptop rekomendasi untuk menyimpan laptop favorit di sini.
      </p>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each laptops as lap (lap.id)}
        <div class="neo-box bg-white p-5 flex flex-col justify-between relative border-3 border-black text-black">
          <div>
            <!-- Header buttons -->
            <div class="flex items-center justify-between mb-3">
              <span class="neo-badge bg-[#0055DD] text-white border border-black font-black">{lap.brand}</span>
              <button
                type="button"
                on:click={() => onRemoveFavorite(lap.id)}
                class="neo-btn px-2 py-1 text-xs font-black bg-red-100 hover:bg-red-200 text-red-900 border-2 border-black"
                title="Hapus dari Favorit"
              >
                ❤️ Hapus
              </button>
            </div>

            <!-- Laptop Image -->
            <div class="bg-gray-50 border-2 border-black mb-4 overflow-hidden h-44 flex items-center justify-center p-3">
              <img src={lap.image_url} alt={lap.model} class="max-h-full max-w-full object-contain" loading="lazy" />
            </div>

            <!-- Laptop Title -->
            <div class="mb-3">
              <h3 class="text-base font-black uppercase leading-tight line-clamp-2 text-black">{lap.model}</h3>
              <p class="text-lg font-black text-[#0055DD] mt-1">{formatIDR(lap.price)}</p>
            </div>

            <!-- Specs Summary -->
            <div class="neo-box-sm p-3 bg-slate-50 text-xs space-y-1.5 font-mono mb-4 border-2 border-black text-black">
              <div class="flex justify-between items-center gap-2">
                <span class="text-gray-600 font-bold">CPU:</span>
                <span class="font-black text-black truncate max-w-[170px] text-right">{lap.specs.cpu.name}</span>
              </div>
              <div class="flex justify-between items-center gap-2">
                <span class="text-gray-600 font-bold">RAM / SSD:</span>
                <span class="font-black text-black">{lap.specs.ram}GB / {lap.specs.storage.capacity}GB</span>
              </div>
              <div class="flex justify-between items-center gap-2">
                <span class="text-gray-600 font-bold">GPU:</span>
                <span class="font-black text-black truncate max-w-[170px] text-right">{lap.specs.gpu.name}</span>
              </div>
            </div>
          </div>

          <!-- Bottom Action -->
          <button
            type="button"
            on:click={() => onSelectLaptop(lap.id)}
            class="neo-btn w-full py-2.5 text-xs font-black uppercase bg-[#00CC66] text-black hover:bg-[#00b359] border-2 border-black"
          >
            🔍 Lihat Detail
          </button>
        </div>
      {/each}
    </div>
  {/if}
</div>
