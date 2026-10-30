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

<div class="space-y-8">
  <!-- Step Title Banner -->
  <div class="neo-box p-6 bg-[#FFCC00]">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <span class="neo-badge bg-black text-white">Langkah 1 dari 3</span>
        <h2 class="text-2xl lg:text-3xl font-black uppercase mt-2">Pilih Profesi / Kebutuhan Utama Anda</h2>
        <p class="text-xs lg:text-sm font-bold text-gray-800">
          Setiap profesi memiliki profil kriteria pembobotan hardware yang berbeda secara otomatis.
        </p>
      </div>

      <button
        on:click={onDirectResults}
        class="neo-btn neo-btn-outline px-4 py-2 text-xs font-bold"
      >
        ⚡ Langsung Lihat Rekomendasi
      </button>
    </div>
  </div>

  <!-- Profession Cards Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each professions as prof}
      <button
        on:click={() => selectProf(prof.id)}
        class="neo-box p-6 text-left cursor-pointer relative transition-all flex flex-col justify-between {preferences.profession === prof.id ? 'bg-sky-100 ring-4 ring-[#0066FF] translate-x-1 translate-y-1' : 'bg-white hover:bg-slate-50'}"
      >
        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-lg font-black uppercase">{prof.name}</h3>
            {#if preferences.profession === prof.id}
              <span class="bg-[#0066FF] text-white text-xs font-black px-2 py-0.5 border border-black">
                ✓ Terpilih
              </span>
            {/if}
          </div>
          <p class="text-xs text-gray-600 font-medium mb-4">{prof.description}</p>
        </div>

        <!-- Highlight Weights -->
        <div class="pt-3 border-t-2 border-dashed border-gray-300">
          <div class="text-[10px] uppercase font-bold text-gray-500 mb-1">Prioritas Spesifikasi Utama:</div>
          <div class="flex flex-wrap gap-1">
            {#each Object.entries(prof.weights).filter(([_, w]) => w >= 15) as [key, val]}
              <span class="neo-badge bg-white text-[10px] text-black">
                {key.toUpperCase()}: {val}%
              </span>
            {/each}
          </div>
        </div>
      </button>
    {/each}
  </div>

  <!-- Action Bar -->
  <div class="flex items-center justify-between pt-6 border-t-4 border-black">
    <div class="text-xs font-bold text-gray-600">
      Profesi Terpilih: <span class="text-black font-black uppercase">{preferences.profession || 'Belum dipilih'}</span>
    </div>

    <button
      on:click={onNextStep}
      disabled={!preferences.profession}
      class="neo-btn neo-btn-accent px-8 py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span>Lanjut ke Preferensi Opsional</span>
      <span>→</span>
    </button>
  </div>
</div>
