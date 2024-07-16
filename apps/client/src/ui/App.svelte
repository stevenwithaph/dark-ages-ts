<script lang="ts">
  import { onMount } from 'svelte';
  import Login from './routes/auth/Login.svelte';
  import { EventBus } from '../event-bus';
  
  let currentRoute = 'auth';

  function changeRoute(route:string) {
    currentRoute = route;
  }

  onMount(() => {
    EventBus.on('app:route', changeRoute)

    return () => {
      EventBus.off('app:route', changeRoute);
    }
  })
</script>

{#if currentRoute === 'auth'}
  <Login />
{/if}