<script lang='ts'>
  import { CompassStore } from '../stores/compass.svelte';
</script>

<div class='absolute top-0 right-0'>
  <img src='minimap_ring_brown_detail.png'/>
  <p>{CompassStore.name}</p>
  <div class='input'>X: {CompassStore.x} Y: {CompassStore.y}</div>
</div>