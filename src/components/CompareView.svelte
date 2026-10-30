<script lang="ts">
  import type { Laptop } from '../lib/spkEngine';

  export let laptops: Laptop[];
  export let onRemoveFromCompare: (id: string) => void;
  export let onClearCompare: () => void;

  function formatIDR(price: number): string {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);
  }
</script>

<div class="space-y-8">
  <!-- Title Banner -->
  <div class="neo-box p-6 bg-[#00CC66]">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <span class="neo-badge bg-black text-white">Side-by-Side Comparison Mode</span>
        <h2 class="text-2xl lg:text-3xl font-black uppercase mt-2">Perbandingan Spesifikasi Laptop</h2>
        <p class="text-xs lg:text-sm font-bold text-gray-800">
          Bandingkan langsung 2 hingga 3 laptop pilihan Anda secara sejajar untuk mempermudah keputusan.
        </p>
      </div>

      {#if laptops.length > 0}
        <button
          on:click={onClearCompare}
          class="neo-btn neo-btn-yellow px-4 py-2 text-xs font-bold"
        >
          🗑️ Bersihkan Semua
        </button>
      {/if}
    </div>
  </div>

  {#if laptops.length === 0}
    <div class="neo-box p-12 text-center bg-white space-y-4">
      <div class="text-5xl">⚖️</div>
      <h3 class="text-xl font-black uppercase">Belum Ada Laptop Dihubungkan</h3>
      <p class="text-sm text-gray-600 max-w-md mx-auto">
        Klik tombol "+ Bandingkan" / "Compare" pada kartu laptop di daftar rekomendasi untuk melihat perbandingan side-by-side.
      </p>
    </div>
  {:else}
    <div class="neo-box bg-white p-4 overflow-x-auto">
      <table class="w-full border-collapse text-left text-xs font-mono">
        <thead>
          <tr class="border-b-4 border-black bg-sky-50">
            <th class="p-3 font-bold uppercase w-40 text-black border-r-2 border-black">Spesifikasi</th>
            {#each laptops as lap}
              <th class="p-3 font-bold border-r-2 border-black last:border-r-0 min-w-[220px]">
                <div class="flex items-center justify-between gap-2 mb-2">
                  <span class="neo-badge bg-[#0066FF] text-white">{lap.brand}</span>
                  <button
                    on:click={() => onRemoveFromCompare(lap.id)}
                    class="text-red-600 hover:text-red-800 font-bold text-base px-1"
                    title="Hapus"
                  >
                    ✕
                  </button>
                </div>
                <div class="font-black text-sm text-black uppercase line-clamp-1">{lap.model}</div>
                <div class="font-bold text-[#0066FF] mt-0.5">{formatIDR(lap.price)}</div>
              </th>
            {/each}
          </tr>
        </thead>
        <tbody class="divide-y-2 divide-black">
          <tr>
            <td class="p-3 font-bold uppercase bg-gray-100 border-r-2 border-black">Foto Laptop</td>
            {#each laptops as lap}
              <td class="p-3 border-r-2 border-black last:border-r-0">
                <div class="w-full h-32 bg-gray-50 border border-black p-2 flex items-center justify-center">
                  <img src={lap.image_url} alt={lap.model} class="max-h-full max-w-full object-contain" />
                </div>
              </td>
            {/each}
          </tr>

          <tr>
            <td class="p-3 font-bold uppercase bg-gray-100 border-r-2 border-black">CPU / Processor</td>
            {#each laptops as lap}
              <td class="p-3 border-r-2 border-black last:border-r-0 font-bold text-black">
                {lap.specs.cpu.name}
                <div class="text-[10px] text-gray-500 font-normal">{lap.specs.cpu.cores} Cores / {lap.specs.cpu.threads} Threads</div>
              </td>
            {/each}
          </tr>

          <tr>
            <td class="p-3 font-bold uppercase bg-gray-100 border-r-2 border-black">GPU / Grafis</td>
            {#each laptops as lap}
              <td class="p-3 border-r-2 border-black last:border-r-0 font-bold text-black">
                {lap.specs.gpu.name}
                <div class="text-[10px] text-gray-500 font-normal">{lap.specs.gpu.vram > 0 ? `${lap.specs.gpu.vram} GB VRAM` : 'Integrated'}</div>
              </td>
            {/each}
          </tr>

          <tr>
            <td class="p-3 font-bold uppercase bg-gray-100 border-r-2 border-black">RAM</td>
            {#each laptops as lap}
              <td class="p-3 border-r-2 border-black last:border-r-0 font-bold text-black">
                {lap.specs.ram} GB
              </td>
            {/each}
          </tr>

          <tr>
            <td class="p-3 font-bold uppercase bg-gray-100 border-r-2 border-black">SSD Storage</td>
            {#each laptops as lap}
              <td class="p-3 border-r-2 border-black last:border-r-0 font-bold text-black">
                {lap.specs.storage.capacity} GB {lap.specs.storage.type}
              </td>
            {/each}
          </tr>

          <tr>
            <td class="p-3 font-bold uppercase bg-gray-100 border-r-2 border-black">Layar</td>
            {#each laptops as lap}
              <td class="p-3 border-r-2 border-black last:border-r-0 font-bold text-black">
                {lap.specs.display.size}" {lap.specs.display.resolution}
                <div class="text-[10px] text-gray-500 font-normal">{lap.specs.display.panel_type} • {lap.specs.display.refresh_rate}Hz</div>
              </td>
            {/each}
          </tr>

          <tr>
            <td class="p-3 font-bold uppercase bg-gray-100 border-r-2 border-black">Baterai & Weight</td>
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
