<script lang="ts">
  import { ClientPackets, LoginMessageType, ServerPackets } from '@medenia/network';
  import { clientManager } from '../../../network/client-manager';
  import { RouterStore } from '../../stores/router.svelte';
  import { ErrorStore } from '../../stores/error.svelte';
  import { EventBus } from '../../event-bus';

  let username:string = '';
  let password:string = '';

  $: disabled = username === '' || password === '';

  async function handleLogin() {
    const { type, message } = await clientManager.main.sendWithAck(new ClientPackets.LoginPacket(username, password), ServerPackets.LoginMessagePacket);

    switch(type) {
      case LoginMessageType.Confirm:
        clientManager.main.keySalts = username;
        const redirect = await clientManager.main.await(ServerPackets.RedirectPacket);
        await clientManager.main.redirect(redirect.ip, redirect.port, redirect.redirect);
        EventBus.emit('logged-in');
        break;
      case LoginMessageType.IncorrectPassword:
        password = '';
        ErrorStore.show(message);
        break;
      case LoginMessageType.InvalidUsername:
        username = '';
        ErrorStore.show(message);
        break;
    }
  }

  function handleCreate() {
    RouterStore.push('auth/create');
  }
</script>
  
<form class='bg-primary-700/50 p-4 backdrop-blur rounded' autocomplete='off'>
  <div>
    <label for='username' class='block'>Username</label>
    <input class='bg-primary-900 p-1 rounded' bind:value={username} id='username'  autocomplete='off'  />
  </div>
  <div>
    <label for='password' class='block'>Password</label>
    <input class='bg-primary-900 p-1 rounded' bind:value={password} id='password' type='password' />
  </div>
  <div class='flex flex-row justify-between'>
    <button on:click|preventDefault={handleLogin} type='submit' disabled={disabled}>Login</button>
    <button on:click|preventDefault={handleCreate} type='button'>Create</button>
  </div>
</form>