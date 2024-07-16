<script lang="ts">
  import { onMount } from 'svelte';
  import { EventBus } from '../../../event-bus';
  import LoginNotice from './LoginNotice.svelte';
  import LoginForm from './LoginForm.svelte';

  enum State {
    Connecting,
    Notice,
    Login,
    Create
  }

  let state: State = State.Connecting;

  let notice: string;

  function showNotice(message: string) {
    console.log('notice');
    notice = message;
    state = State.Create;
  }

  function onOkay() {
    state = State.Login;
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
    <LoginForm />
  {/if}
</div>