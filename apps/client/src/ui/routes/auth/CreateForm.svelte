<script lang="ts">
  import { onMount } from 'svelte';
  import { EventBus } from '../../../event-bus';

  let character: HTMLImageElement;

  let username:string = '';
  let password:string = '';
  let confirm:string = '';

  let hairStyle: string = '1';
  let hairColour: string = '1';
  let gender: string = '1';

  $: disabled = username === '' || password === '' || confirm === '' || password !== confirm;

  $: EventBus.emit('character-gender', Number(gender));
  $: EventBus.emit('character-hair-style', Number(hairStyle));
  $: EventBus.emit('character-hair-colour', Number(hairColour));

  onMount(() => {
    EventBus.emit('character-canvas', character);
  })

  function onCreate() {

  }

  function onCancel() {

  }
</script>

<form class='bg-primary-700/50 p-4 backdrop-blur rounded'>
  <div class='flex'>
    <div>
      <div>
        <label for='username' class='block'>Username</label>
        <input bind:value={username} id='username' class='bg-transparent' autocomplete='off'  />
      </div>
      <div>
        <label for='password' class='block'>Password</label>
        <input bind:value={password} id='password' class='bg-transparent' autocomplete='off'  />
      </div>
      <div>
        <label for='confirm' class='block'>Confirm</label>
        <input bind:value={confirm} id='confirm' class='bg-transparent' autocomplete='off'  />
      </div>
    </div>

    <div>
      <div class='flex flex-row'>
        <select class='bg-transparent' bind:value={gender}>
          <option class='bg-primary-700' value='1'>Male</option>
          <option class='bg-primary-700' value='2'>Female</option>
        </select>

        <select class='bg-transparent' bind:value={hairStyle}>
          {#each Array(17) as _, index (index)}
            <option class='bg-primary-700' value={`${index+1}`}>Hair Style {index+1}</option>
          {/each}
        </select>

        <select class='bg-transparent' bind:value={hairColour}>
          {#each Array(14) as _, index (index)}
            <option class='bg-primary-700' value={`${index+1}`}>Hair Colour {index+1}</option>
          {/each}
        </select>
      </div>

      <img class='pixelated m-auto' bind:this={character} alt='character' width="114" height="170" />

      <div class='flex justify-end gap-x-4 flex-row'>
        <button on:click|preventDefault={onCreate} type='submit' disabled={disabled}>Create</button>
        <button on:click|preventDefault={onCancel} type='button'>Cancel</button>
      </div>
    </div>
  </div>
</form>