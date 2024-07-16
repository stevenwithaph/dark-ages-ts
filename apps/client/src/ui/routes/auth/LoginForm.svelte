<script lang="ts">
  import { EventBus } from '../../../event-bus';

  let username:string = '';
  let password:string = '';

  $: disabled = username === '' || password === '';

  function onLogin() {
    EventBus.emit('login-character', username, password);
  }

  function onCreate() {
    EventBus.emit('create-character');
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
    <button on:click|preventDefault={onLogin} type='submit' disabled={disabled}>Login</button>
    <button on:click|preventDefault={onCreate} type='button'>Create</button>
  </div>
</form>