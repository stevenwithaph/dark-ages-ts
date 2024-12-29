<script lang="ts">
  interface Props {
    class: string;
  }

  const props:Props = $props();
</script>


<div class={`button ${props.class}`}>

</div>