<script lang="ts">
  export let notice: string;

  export let onOkay: Function;
</script>

<div class='bg-primary-700/50 p-4 backdrop-blur rounded w-[640px] flex flex-col h-full max-h-96'>
  <p class='bg-primary-900 p-2 rounded flex-1'>{notice}</p>
  <div class='flex flex-row justify-between'>
    <button on:click|preventDefault={() => onOkay()} type='submit'>Okay</button>
  </div>
</div>