<script lang="ts">
  import { getContext, setContext } from 'svelte';
  import { RouterStore } from '../../stores/router.svelte';

  const depth = getContext<number>('router-depth') ?? 0;

  interface Props {
    path: string;
    children?: any;
  }

  const { path, children }: Props = $props();

  let matches = $state(false);

  $effect(() => {
    matches = RouterStore.route.length > depth && path === RouterStore.route[depth];

    setContext('router-depth', depth+1);
  })

</script>

{#if matches}
  {#if children}
    {@render children()}
  {/if}
{/if}