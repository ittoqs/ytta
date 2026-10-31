<script lang="ts">
  import type { UserPreferences } from '../lib/spkEngine';
  import CustomSelect from './CustomSelect.svelte';

  export let preferences: UserPreferences;
  export let onPrevStep: () => void;
  export let onNextStep: () => void;

  const budgetOptions = [
    { value: 'All', label: 'Semua Anggaran (Bebas)' },
    { value: '3-5M', label: '3 - 5 Juta IDR (Entry Level)' },
    { value: '5-8M', label: '5 - 8 Juta IDR (Mid-Range)' },
    { value: '8-12M', label: '8 - 12 Juta IDR (High-Mid)' },
    { value: '12M+', label: '12 Juta+ IDR (Flagship / Gaming / Workstation)' }
  ];
</script>

<div class="space-y-6 sm:space-y-8">
  <!-- Step Title Banner -->
  <div class="neo-box p-5 sm:p-6 bg-[#00CC66] border-3 border-black text-black">
    <span class="neo-badge bg-black text-white">Langkah 2 dari 3</span>
    <h2 class="text-xl sm:text-2xl lg:text-3xl font-black uppercase mt-2">Form Preferensi & Anggaran Opsional</h2>
    <p class="text-xs sm:text-sm font-bold text-gray-900 mt-1">
      Preferensi anggaran, mobilitas, dan intensitas penggunaan sehari-hari.
    </p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
    <!-- Intensity -->
    <div class="neo-box p-5 sm:p-6 bg-white space-y-3 border-3 border-black text-black">
      <div class="block font-black uppercase text-sm">🔥 Tingkat Penggunaan Laptop</div>
      <div class="grid grid-cols-3 gap-2">
        {#each ['Jarang', 'Sedang', 'Berat'] as intensity}
          <button
            type="button"
            on:click={() => preferences.usage_intensity = intensity as any}
            class="neo-btn py-2 text-xs font-black border-2 border-black transition-colors {preferences.usage_intensity === intensity ? 'bg-[#FFCC00] text-black shadow-[3px_3px_0_#000] ring-2 ring-black' : 'bg-white text-black hover:bg-yellow-100'}"
          >
            {intensity}
          </button>
        {/each}
      </div>
      <p class="text-[11px] text-gray-700 font-bold">
        {preferences.usage_intensity === 'Berat' ? 'Fokus ke daya tahan pendingin & performa stabil.' : 'Standar penggunaan umum harian.'}
      </p>
    </div>

    <!-- Budget with CustomSelect Modal -->
    <div class="neo-box p-5 sm:p-6 bg-white space-y-3 border-3 border-black text-black">
      <CustomSelect
        id="budget-select"
        label="💰 Rentang Anggaran (Budget)"
        value={preferences.budget_range || 'All'}
        options={budgetOptions}
        onChange={(val) => preferences.budget_range = val as any}
      />
      <p class="text-[11px] text-gray-700 font-bold">
        Pilih batas anggaran fleksibel sesuai estimasi dana yang disiapkan.
      </p>
    </div>

    <!-- Portability -->
    <div class="neo-box p-5 sm:p-6 bg-white space-y-3 border-3 border-black text-black">
      <div class="block font-black uppercase text-sm">🎒 Mobilitas & Bobot Ringan</div>
      <div class="flex items-center gap-4">
        <label class="flex items-center gap-3 cursor-pointer font-bold text-xs">
          <input
            type="checkbox"
            bind:checked={preferences.portability_needed}
            class="w-5 h-5 accent-[#0055DD] border-2 border-black rounded-none cursor-pointer"
          />
          <span class="text-black">Laptop sangat tipis & ringan (&lt; 1.5kg)</span>
        </label>
      </div>
      <p class="text-[11px] text-gray-700 font-bold">
        Memprioritaskan laptop yang mudah dibawa bepergian dan berbobot enteng.
      </p>
    </div>

    <!-- Gaming -->
    <div class="neo-box p-5 sm:p-6 bg-white space-y-3 border-3 border-black text-black">
      <div class="block font-black uppercase text-sm">🎮 Kebutuhan Gaming & Render Berat</div>
      <div class="flex items-center gap-4">
        <label class="flex items-center gap-3 cursor-pointer font-bold text-xs">
          <input
            type="checkbox"
            bind:checked={preferences.gaming_needed}
            class="w-5 h-5 accent-[#0055DD] border-2 border-black rounded-none cursor-pointer"
          />
          <span class="text-black">Kartu Grafis (GPU) Dedicated (RTX / GTX)</span>
        </label>
      </div>
      <p class="text-[11px] text-gray-700 font-bold">
        Memerlukan pemrosesan grafis tinggi untuk gaming modern atau rendering 3D.
      </p>
    </div>

    <!-- Main Priority -->
    <div class="neo-box md:col-span-2 p-5 sm:p-6 bg-white space-y-3 border-3 border-black text-black">
      <div class="block font-black uppercase text-sm">⭐ Prioritas Utama</div>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        {#each ['Performa', 'Baterai', 'Portabilitas', 'Harga'] as item}
          <button
            type="button"
            on:click={() => preferences.priority = item as any}
            class="neo-btn py-2 text-xs font-black border-2 border-black transition-colors {preferences.priority === item ? 'bg-[#FFCC00] text-black shadow-[3px_3px_0_#000] ring-2 ring-black' : 'bg-white text-black hover:bg-yellow-100'}"
          >
            {item}
          </button>
        {/each}
      </div>
    </div>
  </div>

  <!-- Action Bar -->
  <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t-4 border-black">
    <button
      type="button"
      on:click={onPrevStep}
      class="neo-btn px-6 py-2.5 text-xs sm:text-sm font-black bg-white text-black hover:bg-yellow-100 border-2 border-black w-full sm:w-auto"
    >
      ← Kembali
    </button>

    <button
      type="button"
      on:click={onNextStep}
      class="neo-btn px-6 sm:px-8 py-3 text-sm sm:text-base font-black bg-[#00CC66] text-black hover:bg-[#00b359] border-3 border-black w-full sm:w-auto flex items-center justify-center gap-2"
    >
      <span>Lanjut ke Penyesuaian Hardware</span>
      <span>→</span>
    </button>
  </div>
</div>
