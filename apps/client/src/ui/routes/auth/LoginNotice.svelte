<script lang="ts">
  import { RouterStore } from '../../stores/router.svelte';

  function handleOkay() {
    RouterStore.push('auth/login');
  }
</script>

<div class='bg-primary-700/50 p-4 backdrop-blur rounded w-[640px] flex flex-col h-full max-h-96'>
  <p class='bg-primary-900 p-2 rounded flex-1 whitespace-pre'>{'test'}</p>
  <div class='flex flex-row justify-between'>
    <button on:click|preventDefault={handleOkay} type='submit'>Okay</button>
  </div>
</div>