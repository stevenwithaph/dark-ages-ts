<script lang="ts">
  import { ChatMessageType, ClientPackets, ServerPackets } from '@medenia/network';
  import { clientManager } from '../../network/client-manager';
  import { tick } from 'svelte';

  let text: HTMLInputElement;
  let container: HTMLElement;

  let messages = $state<string[]>([]);

  function handleKeyPress(e: KeyboardEvent) {
    switch(e.key) {
      case 'Enter':
        handleEnter();
        break;
      case 'Escape':
        handleEscape();
        break;
    }
  }

  function handleEnter() {
    if(document.activeElement === text) {
        clientManager.main.send(new ClientPackets.ChatMessagePacket(ChatMessageType.Normal, text.value === '' ? ' ' : text.value));
        text.value = '';
        text.blur();
      } else {
        text.focus();
      }
  }

  //TODO: move this to something common
  function handleFocus() {
    document.addEventListener('click', handleClick);
  }

  function handleBlur() {
    document.removeEventListener('click', handleClick);
  }

  function handleClick(e: MouseEvent) {
    if(e.target !== text) {
      text.blur();
    }
  }

  function handleEscape() {
    if(document.activeElement === text) {
      text.blur();
    }
  }

  async function handleMessage(packet: ServerPackets.ChatMessagePacket) {
    messages.push(packet.message);
    await tick();
    container.scrollTo({
      top: container.scrollHeight
    });
  }

  $effect(() => {
    document.addEventListener('keydown', handleKeyPress);
    clientManager.main.on(ServerPackets.ChatMessagePacket.name, handleMessage);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      clientManager.main.off(ServerPackets.ChatMessagePacket.name, handleMessage);
    }
  })
</script>


<div class='absolute left-0 bottom-0 w-96 bg-primary-700/50 p-2 backdrop-blur rounded space-y-2'>
  <div bind:this={container} class='h-64 px-1 bg-primary-900 rounded flex-1 pointer-events-auto overflow-y-scroll'>
    {#each messages as message}
      <p class='select-none'>{message}</p>
    {/each}
  </div>
  <input bind:this={text} onfocus={handleFocus} onblur={handleBlur} class='bg-primary-900 p-1 rounded w-full' maxlength="48"/>
</div>