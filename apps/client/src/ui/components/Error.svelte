<script lang="ts">
  import { fade } from 'svelte/transition';
  import { ErrorStore } from '../stores/error.svelte';

  function handleOkay() {
    ErrorStore.close();
  }
</script>

{#if ErrorStore.visible}
  <div transition:fade={{duration:250}} class='absolute top-0 w-dvw h-dvh flex items-center justify-center bg-black/80 pointer-events-auto'>
    <div class='max-w-96 bbackdrop-blur p-4 bg-primary-700/50 rounded'>
      <div class='bg-primary-900 p-2'>
        <p class='select-none'>{ErrorStore.message}</p>
      </div>
      <div class='flex flex-row justify-between'>
        <button on:click|preventDefault={handleOkay}>Okay</button>
      </div>
    </div>
  </div>
{/if}