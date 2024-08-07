<script lang='ts'>
  import { CompassStore } from '../stores/compass.svelte';
</script>

<div class='absolute top-0 right-0'>
  <p>{CompassStore.name}</p>
  <p>X: {CompassStore.x} Y: {CompassStore.y}</p>
</div>