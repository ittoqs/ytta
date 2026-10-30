<script lang="ts">
  import type { UserPreferences } from '../lib/spkEngine';

  export let preferences: UserPreferences;
  export let onPrevStep: () => void;
  export let onSubmit: () => void;

  if (!preferences.custom_specs) {
    preferences.custom_specs = {
      min_ram: 8,
      min_storage: 256,
      min_cpu_cores: 4,
      min_gpu_vram: 0
    };
  }
</script>

<div class="space-y-8">
  <!-- Step Title Banner -->
  <div class="neo-box p-6 bg-[#FFCC00]">
    <span class="neo-badge bg-black text-white">Langkah 3 dari 3 (Opsional)</span>
    <h2 class="text-2xl lg:text-3xl font-black uppercase mt-2">Penyesuaian Hardware Manual</h2>
    <p class="text-xs lg:text-sm font-bold text-gray-800">
      Atur spesifikasi minimum hardware jika Anda memiliki kebutuhan khusus pada komponen tertentu.
    </p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- RAM -->
    <div class="neo-box p-6 bg-white space-y-3">
      <div class="flex items-center justify-between">
        <label for="ram-range" class="font-black uppercase text-sm">🧠 Minimum RAM</label>
        <span class="neo-badge bg-blue-100">{preferences.custom_specs.min_ram || 8} GB</span>
      </div>
      <input
        id="ram-range"
        type="range"
        min="4"
        max="32"
        step="4"
        bind:value={preferences.custom_specs.min_ram}
        class="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0066FF]"
      />
      <div class="flex justify-between text-[10px] font-mono text-gray-500 font-bold">
        <span>4GB</span>
        <span>8GB</span>
        <span>16GB</span>
        <span>32GB</span>
      </div>
    </div>

    <!-- Storage -->
    <div class="neo-box p-6 bg-white space-y-3">
      <div class="flex items-center justify-between">
        <label for="storage-range" class="font-black uppercase text-sm">💾 Minimum Storage SSD</label>
        <span class="neo-badge bg-emerald-100">{preferences.custom_specs.min_storage || 256} GB</span>
      </div>
      <input
        id="storage-range"
        type="range"
        min="256"
        max="1024"
        step="256"
        bind:value={preferences.custom_specs.min_storage}
        class="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#00CC66]"
      />
      <div class="flex justify-between text-[10px] font-mono text-gray-500 font-bold">
        <span>256GB</span>
        <span>512GB</span>
        <span>1024GB (1TB)</span>
      </div>
    </div>

    <!-- CPU Cores -->
    <div class="neo-box p-6 bg-white space-y-3">
      <div class="flex items-center justify-between">
        <label for="cpu-range" class="font-black uppercase text-sm">⚙️ Minimum CPU Cores</label>
        <span class="neo-badge bg-amber-100">{preferences.custom_specs.min_cpu_cores || 4} Cores</span>
      </div>
      <input
        id="cpu-range"
        type="range"
        min="4"
        max="16"
        step="2"
        bind:value={preferences.custom_specs.min_cpu_cores}
        class="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
      />
      <div class="flex justify-between text-[10px] font-mono text-gray-500 font-bold">
        <span>4 Cores</span>
        <span>8 Cores</span>
        <span>12 Cores</span>
        <span>16 Cores</span>
      </div>
    </div>

    <!-- GPU VRAM -->
    <div class="neo-box p-6 bg-white space-y-3">
      <div class="flex items-center justify-between">
        <label for="gpu-range" class="font-black uppercase text-sm">🎨 Minimum GPU VRAM</label>
        <span class="neo-badge bg-purple-100">{preferences.custom_specs.min_gpu_vram || 0} GB</span>
      </div>
      <input
        id="gpu-range"
        type="range"
        min="0"
        max="8"
        step="2"
        bind:value={preferences.custom_specs.min_gpu_vram}
        class="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
      />
      <div class="flex justify-between text-[10px] font-mono text-gray-500 font-bold">
        <span>Integrated (0GB)</span>
        <span>4GB</span>
        <span>6GB</span>
        <span>8GB</span>
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
      on:click={onSubmit}
      class="neo-btn neo-btn-accent px-10 py-4 text-lg bg-[#0066FF] hover:bg-[#0052cc] text-white flex items-center gap-2"
    >
      <span>✨ Dapatkan Rekomendasi Laptop</span>
    </button>
  </div>
</div>
