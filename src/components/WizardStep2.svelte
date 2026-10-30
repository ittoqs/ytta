<script lang="ts">
  import type { UserPreferences } from '../lib/spkEngine';

  export let preferences: UserPreferences;
  export let onPrevStep: () => void;
  export let onNextStep: () => void;
</script>

<div class="space-y-8">
  <!-- Step Title Banner -->
  <div class="neo-box p-6 bg-[#00CC66]">
    <span class="neo-badge bg-black text-white">Langkah 2 dari 3</span>
    <h2 class="text-2xl lg:text-3xl font-black uppercase mt-2">Form Preferensi & Anggaran Opsional</h2>
    <p class="text-xs lg:text-sm font-bold text-gray-800">
      Bantu kami memperjelas preferensi anggaran, mobilitas, dan intensitas penggunaan sehari-hari kamu.
    </p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Intensity -->
    <div class="neo-box p-6 bg-white space-y-3">
      <div class="block font-black uppercase text-sm">🔥 Tingkat Penggunaan Laptop</div>
      <div class="grid grid-cols-3 gap-2">
        {#each ['Jarang', 'Sedang', 'Berat'] as intensity}
          <button
            type="button"
            on:click={() => preferences.usage_intensity = intensity as any}
            class="neo-btn neo-btn-outline py-2 text-xs font-bold {preferences.usage_intensity === intensity ? 'bg-[#FFCC00]' : ''}"
          >
            {intensity}
          </button>
        {/each}
      </div>
      <p class="text-[11px] text-gray-500 font-medium">
        {preferences.usage_intensity === 'Berat' ? 'Fokus ke daya tahan pendingin & performa stabil.' : 'Standar penggunaan umum harian.'}
      </p>
    </div>

    <!-- Budget -->
    <div class="neo-box p-6 bg-white space-y-3">
      <label for="budget-select" class="block font-black uppercase text-sm">💰 Rentang Anggaran (Budget)</label>
      <select
        id="budget-select"
        bind:value={preferences.budget_range}
        class="w-full neo-box-sm p-2 text-xs font-bold bg-gray-50 focus:outline-none"
      >
        <option value="All">Semua Anggaran (Bebas)</option>
        <option value="3-5M">3 - 5 Juta IDR (Entry Level)</option>
        <option value="5-8M">5 - 8 Juta IDR (Mid-Range)</option>
        <option value="8-12M">8 - 12 Juta IDR (High-Mid)</option>
        <option value="12M+">12 Juta+ IDR (Flagship / Gaming / Workstation)</option>
      </select>
    </div>

    <!-- Portability -->
    <div class="neo-box p-6 bg-white space-y-3">
      <div class="block font-black uppercase text-sm">🎒 Mobilitas & Bobot Ringan</div>
      <div class="flex items-center gap-4">
        <label class="flex items-center gap-2 cursor-pointer font-bold text-xs">
          <input
            type="checkbox"
            bind:checked={preferences.portability_needed}
            class="w-5 h-5 accent-[#0066FF] border-2 border-black"
          />
          <span>Ya, saya butuh laptop sangat tipis & ringan (&lt; 1.5kg)</span>
        </label>
      </div>
    </div>

    <!-- Gaming -->
    <div class="neo-box p-6 bg-white space-y-3">
      <div class="block font-black uppercase text-sm">🎮 Kebutuhan Gaming & Render Berat</div>
      <div class="flex items-center gap-4">
        <label class="flex items-center gap-2 cursor-pointer font-bold text-xs">
          <input
            type="checkbox"
            bind:checked={preferences.gaming_needed}
            class="w-5 h-5 accent-[#0066FF] border-2 border-black"
          />
          <span>Ya, butuh Kartu Grafis (GPU) Dedicated (RTX / GTX)</span>
        </label>
      </div>
    </div>

    <!-- Main Priority -->
    <div class="neo-box md:col-span-2 p-6 bg-white space-y-3">
      <div class="block font-black uppercase text-sm">⭐ Prioritas Utama Kamu</div>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {#each ['Performa', 'Baterai', 'Portabilitas', 'Harga'] as item}
          <button
            type="button"
            on:click={() => preferences.priority = item as any}
            class="neo-btn neo-btn-outline py-2 text-xs font-bold {preferences.priority === item ? 'bg-[#FFCC00]' : ''}"
          >
            {item}
          </button>
        {/each}
      </div>
    </div>
  </div>

  <!-- Action Bar -->
  <div class="flex items-center justify-between pt-6 border-t-4 border-black">
    <button
      on:click={onPrevStep}
      class="neo-btn neo-btn-outline px-6 py-3 text-sm"
    >
      ← Kembali
    </button>

    <button
      on:click={onNextStep}
      class="neo-btn neo-btn-accent px-8 py-3 text-base"
    >
      <span>Lanjut ke Penyesuaian Hardware</span>
      <span>→</span>
    </button>
  </div>
</div>
