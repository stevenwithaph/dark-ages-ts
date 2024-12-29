<script lang="ts">

  interface Props {
    class?: string;
    children: any;
  }

  const props:Props = $props();
</script>


<div class={`panel relative text-black ${props.class}`}>
  {#if props.children}
    {@render props.children()}
  {/if}
</div>