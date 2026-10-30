<script lang="ts">
  export let favoritesCount = 0;
  export let compareCount = 0;
  export let activeTab = 'home'; // 'home' | 'wizard' | 'favorites' | 'compare'
  export let onSelectTab: (tab: string) => void;
</script>

<header class="sticky top-0 z-50 bg-[#0066FF] border-b-4 border-black px-4 lg:px-8 py-3 text-white shadow-[0_4px_0_#0a0a0a]">
  <div class="max-w-7xl mx-auto flex items-center justify-between">
    <!-- Brand Logo -->
    <button
      on:click={() => onSelectTab('home')}
      class="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
    >
      <div class="bg-[#FFCC00] text-black border-2 border-black p-2 font-black text-xl shadow-[2px_2px_0_#0a0a0a] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform">
        💻
      </div>
      <div>
        <span class="text-xl lg:text-2xl font-black tracking-tight uppercase text-white drop-shadow-[2px_2px_0_#000]">
          Smart Laptop Advisor
        </span>
        <p class="text-xs text-blue-100 font-semibold hidden sm:block">SPK Laptop Berbasis Weighted Scoring</p>
      </div>
    </button>

    <!-- Navigation Buttons -->
    <nav class="flex items-center gap-2 sm:gap-4">
      <button
        on:click={() => onSelectTab('home')}
        class="neo-btn neo-btn-outline px-3 py-1.5 text-xs sm:text-sm font-bold {activeTab === 'home' ? 'bg-[#FFCC00]' : ''}"
      >
        Beranda
      </button>

      <button
        on:click={() => onSelectTab('wizard')}
        class="neo-btn neo-btn-accent px-3 py-1.5 text-xs sm:text-sm font-bold flex items-center gap-1.5"
      >
        <span>🧙</span>
        <span>Cari Laptop</span>
      </button>

      <button
        on:click={() => onSelectTab('compare')}
        class="neo-btn neo-btn-outline px-3 py-1.5 text-xs sm:text-sm font-bold relative {activeTab === 'compare' ? 'bg-[#FFCC00]' : ''}"
      >
        <span>⚖️ Bandingkan</span>
        {#if compareCount > 0}
          <span class="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black rounded-full px-1.5 py-0.5 border border-black">
            {compareCount}
          </span>
        {/if}
      </button>

      <button
        on:click={() => onSelectTab('favorites')}
        class="neo-btn neo-btn-outline px-3 py-1.5 text-xs sm:text-sm font-bold relative {activeTab === 'favorites' ? 'bg-[#FFCC00]' : ''}"
      >
        <span>❤️ Favorit</span>
        {#if favoritesCount > 0}
          <span class="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black rounded-full px-1.5 py-0.5 border border-black">
            {favoritesCount}
          </span>
        {/if}
      </button>
    </nav>
  </div>
</header>
