<script lang="ts">
  import { ClientPackets, LoginMessageType, ServerPackets } from '@medenia/network';
  import { clientManager } from '../../../network/client-manager';
  import { RouterStore } from '../../stores/router.svelte';
  import { EventBus } from '../../event-bus';


  let username:string = '';
  let password:string = '';

  $: disabled = username === '' || password === '';

  async function handleLogin() {
    const { type } = await clientManager.main.sendWithAck(new ClientPackets.LoginPacket(username, password), ServerPackets.LoginMessagePacket);

    if (type === LoginMessageType.Confirm) {
      clientManager.main.keySalts = username;
      const redirect = await clientManager.main.await(ServerPackets.RedirectPacket);

      EventBus.emit('logged-in', redirect);
    }
  }

  function handleCreate() {
    RouterStore.push('auth/create');
  }
</script>
  
<form class='bg-primary-700/50 p-4 backdrop-blur rounded'>
  <div>
    <label for='username' class='block'>Username</label>
    <input bind:value={username} id='username' class='bg-transparent' autocomplete='off'  />
  </div>
  <div>
    <label for='password' class='block'>Password</label>
    <input bind:value={password} id='password' class='bg-transparent' type='password' />
  </div>
  <div class='flex flex-row justify-between'>
    <button on:click|preventDefault={handleLogin} type='submit' disabled={disabled}>Login</button>
    <button on:click|preventDefault={handleCreate} type='button'>Create</button>
  </div>
</form>