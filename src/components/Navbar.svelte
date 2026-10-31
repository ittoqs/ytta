<script lang="ts">
  export let favoritesCount = 0;
  export let compareCount = 0;
  export let activeTab = 'home'; // 'home' | 'wizard' | 'favorites' | 'compare'
  export let onSelectTab: (tab: string) => void;
</script>

<header class="sticky top-0 z-40 bg-[#0055DD] border-b-4 border-black px-2 sm:px-6 lg:px-8 py-2.5 text-white shadow-[0_4px_0_#0a0a0a]">
  <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
    <!-- Brand Logo -->
    <button
      type="button"
      on:click={() => onSelectTab('home')}
      class="flex items-center gap-2 text-left focus:outline-none group cursor-pointer w-full sm:w-auto justify-center sm:justify-start"
    >
      <div class="bg-[#FFCC00] text-black border-2 border-black p-1 sm:p-2 font-black text-base sm:text-xl shadow-[2px_2px_0_#0a0a0a] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform flex items-center justify-center">
        💻
      </div>
      <div>
        <span class="text-base sm:text-xl lg:text-2xl font-black tracking-tight uppercase text-white drop-shadow-[2px_2px_0_#000] block leading-tight">
          Smart Laptop Advisor
        </span>
        <p class="text-[10px] sm:text-xs text-yellow-200 font-bold hidden sm:block">SPK Rekomendasi Laptop Berbasis Weighted Scoring</p>
      </div>
    </button>

    <!-- Navigation Buttons (Compact & responsive on mobile) -->
    <nav class="grid grid-cols-4 sm:flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
      <button
        type="button"
        on:click={() => onSelectTab('home')}
        class="neo-btn px-2 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs md:text-sm font-black border-2 border-black transition-colors {activeTab === 'home' ? 'bg-[#FFCC00] text-black ring-2 ring-black shadow-[2px_2px_0_#000]' : 'bg-white text-black hover:bg-yellow-100'}"
      >
        Beranda
      </button>

      <button
        type="button"
        on:click={() => onSelectTab('wizard')}
        class="neo-btn px-1.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs md:text-sm font-black border-2 border-black flex items-center justify-center gap-1 transition-colors {activeTab === 'wizard' ? 'bg-[#FFCC00] text-black ring-2 ring-black shadow-[2px_2px_0_#000]' : 'bg-[#00CC66] text-black hover:bg-[#00b359]'}"
      >
        <span>🔍</span>
        <span class="truncate">Cari</span>
      </button>

      <button
        type="button"
        on:click={() => onSelectTab('compare')}
        class="neo-btn px-1 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs md:text-sm font-black border-2 border-black relative transition-colors {activeTab === 'compare' ? 'bg-[#FFCC00] text-black ring-2 ring-black shadow-[2px_2px_0_#000]' : 'bg-white text-black hover:bg-yellow-100'}"
      >
        <span class="truncate">⚖️ Banding</span>
        {#if compareCount > 0}
          <span class="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[9px] sm:text-[10px] font-black rounded-full px-1 sm:px-1.5 py-0.5 border border-black shadow-[1px_1px_0_#000]">
            {compareCount}
          </span>
        {/if}
      </button>

      <button
        type="button"
        on:click={() => onSelectTab('favorites')}
        class="neo-btn px-1.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs md:text-sm font-black border-2 border-black relative transition-colors {activeTab === 'favorites' ? 'bg-[#FFCC00] text-black ring-2 ring-black shadow-[2px_2px_0_#000]' : 'bg-white text-black hover:bg-yellow-100'}"
      >
        <span class="truncate">❤️ Favorit</span>
        {#if favoritesCount > 0}
          <span class="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[9px] sm:text-[10px] font-black rounded-full px-1 sm:px-1.5 py-0.5 border border-black shadow-[1px_1px_0_#000]">
            {favoritesCount}
          </span>
        {/if}
      </button>
    </nav>
  </div>
</header>
