<script lang="ts">
  export let isOpen = false;
  export let title = 'Informasi';
  export let message = '';
  export let type: 'info' | 'warning' | 'success' = 'warning';
  export let onClose: () => void;

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && isOpen) {
      onClose();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    tabindex="-1"
    on:click|self={onClose}
    on:keydown={handleKeydown}
  >
    <div class="neo-box bg-white max-w-md w-full p-6 relative animate-in fade-in zoom-in duration-150">
      <!-- Header bar with icon & title -->
      <div class="flex items-center justify-between pb-3 mb-4 border-b-2 border-black">
        <div class="flex items-center gap-2">
          {#if type === 'warning'}
            <span class="text-2xl">⚠️</span>
          {:else if type === 'success'}
            <span class="text-2xl">✅</span>
          {:else}
            <span class="text-2xl">ℹ️</span>
          {/if}
          <h3 id="modal-title" class="text-lg font-black uppercase text-black">{title}</h3>
        </div>
        <button
          type="button"
          on:click={onClose}
          class="neo-btn neo-btn-yellow w-8 h-8 text-sm font-black focus:outline-none focus:ring-2 focus:ring-black"
          aria-label="Tutup modal"
        >
          ✕
        </button>
      </div>

      <!-- Content Message -->
      <div class="py-2 text-sm font-bold text-gray-800 leading-relaxed">
        {message}
      </div>

      <!-- Action Button -->
      <div class="mt-6 pt-3 border-t-2 border-black flex justify-end">
        <button
          type="button"
          on:click={onClose}
          class="neo-btn neo-btn-accent px-6 py-2 text-xs font-black uppercase focus:outline-none focus:ring-2 focus:ring-black"
        >
          Mengerti
        </button>
      </div>
    </div>
  </div>
{/if}
