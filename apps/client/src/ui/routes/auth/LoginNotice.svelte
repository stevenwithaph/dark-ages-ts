<script lang="ts">
  import { RouterStore } from '../../stores/router.svelte';
  import { NoticeStore } from '../../stores/notice.svelte';
  import Panel from '../../components/Panel.svelte';

  function handleOkay() {
    RouterStore.push('auth/login');
  }
</script>

<Panel class='w-[640px] flex flex-col h-full max-h-96'>
  <p class='rounded flex-1 whitespace-pre'>{NoticeStore.message}</p>
  <div class='flex flex-row justify-between absolute bottom-[-15px]'>
    <button class='button brightness-50' on:click|preventDefault={handleOkay} type='submit'>Okay</button>
  </div>
</Panel>