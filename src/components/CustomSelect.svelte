<script lang="ts">
  export let label: string;
  export let id: string = 'custom-select';
  export let value: string;
  export let options: { value: string; label: string }[];
  export let onChange: (val: string) => void;

  let isModalOpen = false;

  function selectOption(val: string) {
    value = val;
    onChange(val);
    isModalOpen = false;
  }

  $: currentOption = options.find(o => o.value === value) || options[0];

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && isModalOpen) {
      isModalOpen = false;
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="space-y-1">
  {#if label}
    <label for={id} class="block font-black uppercase text-sm">{label}</label>
  {/if}

  <button
    {id}
    type="button"
    on:click={() => isModalOpen = true}
    class="w-full neo-box-sm p-3 text-xs font-bold bg-white hover:bg-yellow-50 focus:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-black flex items-center justify-between transition-colors cursor-pointer text-left border-2 border-black text-black"
    aria-haspopup="dialog"
    aria-expanded={isModalOpen}
  >
    <span class="truncate">{currentOption ? currentOption.label : 'Pilih...'}</span>
    <span class="ml-2 font-black text-sm">▼</span>
  </button>
</div>

<!-- Custom Modal for choosing from list -->
{#if isModalOpen}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity"
    role="dialog"
    aria-modal="true"
    aria-labelledby="{id}-modal-title"
    tabindex="-1"
    on:click|self={() => isModalOpen = false}
    on:keydown={handleKeydown}
  >
    <div class="neo-box bg-white max-w-lg w-full p-6 relative max-h-[85vh] flex flex-col animate-in fade-in zoom-in duration-150">
      <div class="flex items-center justify-between pb-3 mb-4 border-b-2 border-black">
        <h3 id="{id}-modal-title" class="text-base font-black uppercase text-black flex items-center gap-2">
          <span>📋</span>
          <span>{label || 'Pilih Opsi'}</span>
        </h3>
        <button
          type="button"
          on:click={() => isModalOpen = false}
          class="neo-btn neo-btn-yellow w-8 h-8 text-sm font-black focus:outline-none focus:ring-2 focus:ring-black"
          aria-label="Tutup"
        >
          ✕
        </button>
      </div>

      <div class="overflow-y-auto space-y-2 py-1 pr-1 flex-1">
        {#each options as opt}
          <button
            type="button"
            on:click={() => selectOption(opt.value)}
            class="w-full text-left p-3.5 border-2 border-black font-bold text-xs transition-all flex items-center justify-between {value === opt.value ? 'bg-[#FFCC00] text-black shadow-[3px_3px_0_#000] font-black' : 'bg-gray-50 hover:bg-sky-50 text-black'}"
          >
            <span>{opt.label}</span>
            {#if value === opt.value}
              <span class="bg-black text-white px-2 py-0.5 text-[10px] font-black uppercase">✓ Terpilih</span>
            {/if}
          </button>
        {/each}
      </div>

      <div class="mt-4 pt-3 border-t-2 border-black flex justify-end">
        <button
          type="button"
          on:click={() => isModalOpen = false}
          class="neo-btn neo-btn-outline px-5 py-2 text-xs font-bold"
        >
          Tutup
        </button>
      </div>
    </div>
  </div>
{/if}
