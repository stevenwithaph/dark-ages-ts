<script lang="ts">
  import { ChatMessageType, ClientPackets, ServerPackets } from '@medenia/network';
  import { clientManager } from '../../network/client-manager';
  import { tick } from 'svelte';

  let text: HTMLInputElement;
  let container: HTMLElement;

  let messages = $state<string[]>([]);
  let hasFocus = $state(false);

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
    hasFocus = true;
    document.addEventListener('click', handleClick);
  }

  function handleBlur() {
    hasFocus = false;
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


<div class='group has-[:focus]:bg-primary-900/60 absolute left-0 bottom-0 w-96 p-2 rounded space-y-2'>
  <div 
    bind:this={container} 
    class:pointer-events-auto={hasFocus}
    class='group-has-[:focus]:bg-primary-900 h-48 px-1 rounded flex-1 overflow-y-hidden'
  >
    {#each messages as message}
      <p class='select-none'>{message}</p>
    {/each}
  </div>
  <input bind:this={text} onfocus={handleFocus} onblur={handleBlur} class='group-has-[:focus]:bg-primary-900 bg-transparent p-1 rounded w-full' maxlength="48"/>
</div>