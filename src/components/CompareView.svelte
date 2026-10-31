<script lang="ts">
  import type { Laptop } from '../lib/spkEngine';

  export let laptops: Laptop[];
  export let onRemoveFromCompare: (id: string) => void;
  export let onClearCompare: () => void;

  function formatIDR(price: number): string {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);
  }
</script>

<div class="space-y-6 sm:space-y-8">
  <!-- Title Banner -->
  <div class="neo-box p-5 sm:p-6 bg-[#00CC66] border-3 border-black text-black">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <span class="neo-badge bg-black text-white font-black">Mode Pembandingan Berdampingan</span>
        <h2 class="text-xl sm:text-2xl lg:text-3xl font-black uppercase mt-2">Perbandingan Spesifikasi Laptop</h2>
        <p class="text-xs sm:text-sm font-bold text-gray-900 mt-1">
          Bandingkan langsung 2 hingga 3 laptop pilihan secara sejajar untuk mempermudah keputusan.
        </p>
      </div>

      {#if laptops.length > 0}
        <button
          type="button"
          on:click={onClearCompare}
          class="neo-btn px-4 py-2 text-xs sm:text-sm font-black bg-[#FFCC00] text-black hover:bg-yellow-400 border-2 border-black self-start sm:self-center"
        >
          🗑️ Bersihkan Semua
        </button>
      {/if}
    </div>
  </div>

  {#if laptops.length === 0}
    <div class="neo-box p-8 sm:p-12 text-center bg-white space-y-4 border-3 border-black text-black">
      <div class="text-4xl sm:text-5xl">⚖️</div>
      <h3 class="text-lg sm:text-xl font-black uppercase text-black">Belum Ada Laptop Dihubungkan</h3>
      <p class="text-xs sm:text-sm text-gray-700 max-w-md mx-auto font-medium">
        Klik tombol "+ Bandingkan" / "+ Compare" pada kartu laptop di daftar rekomendasi untuk melihat perbandingan side-by-side.
      </p>
    </div>
  {:else}
    <div class="neo-box bg-white p-3 sm:p-5 overflow-x-auto border-3 border-black">
      <table class="w-full border-collapse text-left text-xs font-mono min-w-[500px]">
        <thead>
          <tr class="border-b-4 border-black bg-sky-50">
            <th class="p-3 font-black uppercase w-32 sm:w-40 text-black border-r-2 border-black">Spesifikasi</th>
            {#each laptops as lap}
              <th class="p-3 font-bold border-r-2 border-black last:border-r-0 min-w-[200px]">
                <div class="flex items-center justify-between gap-2 mb-2">
                  <span class="neo-badge bg-[#0055DD] text-white border border-black font-black">{lap.brand}</span>
                  <button
                    type="button"
                    on:click={() => onRemoveFromCompare(lap.id)}
                    class="neo-btn bg-red-500 hover:bg-red-600 text-white font-black text-xs px-2 py-0.5 border border-black"
                    title="Hapus"
                    aria-label="Hapus dari pembanding"
                  >
                    ✕
                  </button>
                </div>
                <div class="font-black text-xs sm:text-sm text-black uppercase line-clamp-1">{lap.model}</div>
                <div class="font-black text-[#0055DD] mt-0.5">{formatIDR(lap.price)}</div>
              </th>
            {/each}
          </tr>
        </thead>
        <tbody class="divide-y-2 divide-black">
          <tr>
            <td class="p-3 font-black uppercase bg-gray-100 border-r-2 border-black text-black">Foto Laptop</td>
            {#each laptops as lap}
              <td class="p-3 border-r-2 border-black last:border-r-0">
                <div class="w-full h-28 sm:h-32 bg-gray-50 border border-black p-2 flex items-center justify-center">
                  <img src={lap.image_url} alt={lap.model} class="max-h-full max-w-full object-contain" loading="lazy" />
                </div>
              </td>
            {/each}
          </tr>

          <tr>
            <td class="p-3 font-black uppercase bg-gray-100 border-r-2 border-black text-black">CPU / Processor</td>
            {#each laptops as lap}
              <td class="p-3 border-r-2 border-black last:border-r-0 font-bold text-black">
                {lap.specs.cpu.name}
                <div class="text-[10px] text-gray-700 font-semibold">{lap.specs.cpu.cores} Cores / {lap.specs.cpu.threads} Threads</div>
              </td>
            {/each}
          </tr>

          <tr>
            <td class="p-3 font-black uppercase bg-gray-100 border-r-2 border-black text-black">GPU / Grafis</td>
            {#each laptops as lap}
              <td class="p-3 border-r-2 border-black last:border-r-0 font-bold text-black">
                {lap.specs.gpu.name}
                <div class="text-[10px] text-gray-700 font-semibold">{lap.specs.gpu.vram > 0 ? `${lap.specs.gpu.vram} GB VRAM` : 'Integrated'}</div>
              </td>
            {/each}
          </tr>

          <tr>
            <td class="p-3 font-black uppercase bg-gray-100 border-r-2 border-black text-black">RAM</td>
            {#each laptops as lap}
              <td class="p-3 border-r-2 border-black last:border-r-0 font-black text-black">
                {lap.specs.ram} GB
              </td>
            {/each}
          </tr>

          <tr>
            <td class="p-3 font-black uppercase bg-gray-100 border-r-2 border-black text-black">SSD Storage</td>
            {#each laptops as lap}
              <td class="p-3 border-r-2 border-black last:border-r-0 font-black text-black">
                {lap.specs.storage.capacity} GB {lap.specs.storage.type}
              </td>
            {/each}
          </tr>

          <tr>
            <td class="p-3 font-black uppercase bg-gray-100 border-r-2 border-black text-black">Layar</td>
            {#each laptops as lap}
              <td class="p-3 border-r-2 border-black last:border-r-0 font-bold text-black">
                {lap.specs.display.size}" {lap.specs.display.resolution}
                <div class="text-[10px] text-gray-700 font-semibold">{lap.specs.display.panel_type} • {lap.specs.display.refresh_rate}Hz</div>
              </td>
            {/each}
          </tr>

          <tr>
            <td class="p-3 font-black uppercase bg-gray-100 border-r-2 border-black text-black">Baterai & Bobot</td>
            {#each laptops as lap}
              <td class="p-3 border-r-2 border-black last:border-r-0 font-bold text-black">
                ~{lap.specs.battery} Jam / {lap.specs.weight} kg
              </td>
            {/each}
          </tr>
        </tbody>
      </table>
    </div>
  {/if}
</div>
