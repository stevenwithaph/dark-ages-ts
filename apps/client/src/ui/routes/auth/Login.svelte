<script lang="ts">
  import { onMount } from 'svelte';
  import { EventBus } from '../../../event-bus';
  import LoginNotice from './LoginNotice.svelte';
  import LoginForm from './LoginForm.svelte';
  import CreateForm from './CreateForm.svelte';

  enum State {
    Connecting,
    Notice,
    Login,
    Create
  }

  let state: State = State.Connecting;

  let notice: string;

  function showNotice(message: string) {
    notice = message;
    state = State.Notice;
  }

  function onOkay() {
    state = State.Login;
  }

  function onLogin(username: string, password: string) {
    EventBus.emit('login-character', username, password);
  }

  function onCreate() {
    state = State.Create;
  }

  onMount(() => {
    EventBus.on('login-notice', showNotice);

    return () => {
      EventBus.off('login-notice', showNotice);
    }
  });
</script>

<div class='w-full h-full flex items-center justify-center'>
  {#if state === State.Connecting}
    <p>Connecting...</p>
  {:else if state === State.Notice}
    <LoginNotice {onOkay} {notice} />
  {:else if state === State.Login}
    <LoginForm {onLogin} {onCreate} />
  {:else if state === State.Create}
    <CreateForm />
  {/if}
</div>