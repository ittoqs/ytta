<script lang="ts">
  import { PROFESSION_PRESETS, type UserPreferences } from '../lib/spkEngine';

  export let preferences: UserPreferences;
  export let onNextStep: () => void;
  export let onDirectResults: () => void;

  const professions = Object.keys(PROFESSION_PRESETS).map(key => ({
    id: key,
    ...PROFESSION_PRESETS[key]
  }));

  function selectProf(id: string) {
    preferences.profession = id;
  }
</script>

<div class="space-y-6 sm:space-y-8">
  <!-- Step Title Banner -->
  <div class="neo-box p-5 sm:p-6 bg-[#FFCC00] border-3 border-black text-black">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <span class="neo-badge bg-black text-white">Langkah 1 dari 3</span>
        <h2 class="text-xl sm:text-2xl lg:text-3xl font-black uppercase mt-2">Pilih Profesi / Kebutuhan Utama</h2>
        <p class="text-xs sm:text-sm font-bold text-gray-900 mt-1">
          Setiap profesi memiliki profil kriteria pembobotan hardware yang berbeda secara otomatis.
        </p>
      </div>

      <button
        type="button"
        on:click={onDirectResults}
        class="neo-btn px-3 sm:px-4 py-2 text-xs sm:text-sm font-black bg-white text-black hover:bg-yellow-100 border-2 border-black"
      >
        ⚡ Langsung Lihat Rekomendasi
      </button>
    </div>
  </div>

  <!-- Profession Cards Grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
    {#each professions as prof}
      <button
        type="button"
        on:click={() => selectProf(prof.id)}
        class="neo-box p-5 sm:p-6 text-left cursor-pointer relative transition-all flex flex-col justify-between border-3 border-black {preferences.profession === prof.id ? 'bg-[#FFCC00] ring-4 ring-black translate-x-1 translate-y-1 shadow-[4px_4px_0_#000]' : 'bg-white hover:bg-yellow-50 text-black'}"
      >
        <div>
          <div class="flex items-center justify-between mb-2 sm:mb-3">
            <h3 class="text-base sm:text-lg font-black uppercase text-black">{prof.name}</h3>
            {#if preferences.profession === prof.id}
              <span class="bg-black text-white text-xs font-black px-2 py-0.5 border border-black uppercase">
                ✓ Terpilih
              </span>
            {/if}
          </div>
          <p class="text-xs text-gray-800 font-semibold mb-4 leading-relaxed">{prof.description}</p>
        </div>

        <!-- Highlight Weights -->
        <div class="pt-3 border-t-2 border-dashed border-black/40">
          <div class="text-[10px] uppercase font-black text-black/70 mb-1">Prioritas Spesifikasi Utama:</div>
          <div class="flex flex-wrap gap-1">
            {#each Object.entries(prof.weights).filter(([_, w]) => w >= 15) as [key, val]}
              <span class="neo-badge bg-white text-[10px] text-black font-black border border-black">
                {key.toUpperCase()}: {val}%
              </span>
            {/each}
          </div>
        </div>
      </button>
    {/each}
  </div>

  <!-- Action Bar -->
  <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t-4 border-black">
    <div class="text-xs sm:text-sm font-bold text-gray-700">
      Profesi Terpilih: <span class="text-black font-black uppercase underline decoration-2">{preferences.profession || 'Belum dipilih'}</span>
    </div>

    <button
      type="button"
      on:click={onNextStep}
      disabled={!preferences.profession}
      class="neo-btn px-6 sm:px-8 py-3 text-sm sm:text-base font-black bg-[#00CC66] text-black hover:bg-[#00b359] border-3 border-black disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
    >
      <span>Lanjut ke Preferensi Opsional</span>
      <span>→</span>
    </button>
  </div>
</div>
