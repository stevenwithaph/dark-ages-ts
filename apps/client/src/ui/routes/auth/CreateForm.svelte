<script lang="ts">
  import { ClientPackets, LoginMessageType, ServerPackets } from '@medenia/network';
  import { clientManager } from '../../../network/client-manager';
  import Aisling from '../../components/Aisling.svelte';
  import { PaperDollGender } from '../../../game-objects/paper-doll/paper-doll-container';
  import { RouterStore } from '../../stores/router.svelte';
  import { ErrorStore } from '../../stores/error.svelte';

  let username:string = '';
  let password:string = '';
  let confirm:string = '';

  let hairStyle: number = 1;
  let hairColour: number = 1;
  let gender: PaperDollGender = PaperDollGender.Male;

  let submitting: boolean = false;

  $: disabled = username === '' || password === '' || confirm === '' || password !== confirm || submitting;

  async function handleCreate() {
    submitting = true;
    const message = await clientManager.main.sendWithAck(new ClientPackets.CharacterCreationRequestPacket(username, password), ServerPackets.LoginMessagePacket);
    
    switch(message.type) {
      case LoginMessageType.Confirm:
        confirmCharacter();
        break;
      case LoginMessageType.ClearName:
        username = '';
        ErrorStore.show(message.message);
        submitting = false;
        break;
      case LoginMessageType.ClearPassword:
        password = '';
        confirm = '';
        ErrorStore.show(message.message);
        submitting = false;
        break;
    }
  }

  async function confirmCharacter() {
    const message = await clientManager.main.sendWithAck(new ClientPackets.CharacterCreationFinalizePacket(hairStyle, hairColour, gender === 'm' ? 1 : 2), ServerPackets.LoginMessagePacket);
    
    switch(message.type) {
      case LoginMessageType.Confirm:
        ErrorStore.show('Character has been created!')
        RouterStore.push('auth/login');
        break;
    }
  }

  function handleBack() {
    RouterStore.push('auth/login');
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
        <input bind:value={password} id='password' type='password' class='bg-transparent' autocomplete='off'  />
      </div>
      <div>
        <label for='confirm' class='block'>Confirm</label>
        <input bind:value={confirm} id='confirm' type='password' class='bg-transparent' autocomplete='off'  />
      </div>
    </div>

    <div>
      <div class='flex flex-row'>
        <select class='bg-transparent' bind:value={gender}>
          <option class='bg-primary-700' value={PaperDollGender.Male}>Male</option>
          <option class='bg-primary-700' value={PaperDollGender.Female}>Female</option>
        </select>

        <select class='bg-transparent' bind:value={hairStyle}>
          {#each Array(17) as _, index (index)}
            <option class='bg-primary-700' value={index+1}>Hair Style {index+1}</option>
          {/each}
        </select>

        <select class='bg-transparent' bind:value={hairColour}>
          {#each Array(14) as _, index (index)}
            <option class='bg-primary-700' value={index+1}>Hair Colour {index+1}</option>
          {/each}
        </select>
      </div>

      <div class='w-fit m-auto'>
        <Aisling helmetId={hairStyle} helmetDye={hairColour} gender={gender} />
      </div>

      <div class='flex justify-end gap-x-4 flex-row'>
        <button on:click|preventDefault={handleCreate} type='submit' disabled={disabled}>Create</button>
        <button on:click|preventDefault={handleBack} type='button' disabled={submitting}>Back</button>
      </div>
    </div>
  </div>
</form>