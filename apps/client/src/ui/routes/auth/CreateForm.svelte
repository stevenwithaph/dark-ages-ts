<script lang="ts">
  import { ClientPackets, LoginMessageType, ServerPackets } from '@medenia/network';
  import { clientManager } from '../../../network/client-manager';
  import Aisling from '../../components/Aisling.svelte';
  import { PaperDollGender } from '../../../game-objects/paper-doll/paper-doll-container';
  import { RouterStore } from '../../stores/router.svelte';
  import { ErrorStore } from '../../stores/error.svelte';
  import { EventBus } from '../../event-bus';
  import Panel from '../../components/Panel.svelte';

  let username:string = '';
  let password:string = '';
  let confirm:string = '';

  let skinColours = [0,1,2,4,5];

  let hairStyle: number = 1;
  let hairColour: number = 0;
  let skin: number = 0;
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
    const message = await clientManager.main.sendWithAck(new ClientPackets.CharacterCreationFinalizePacket(hairStyle, hairColour, skin, gender === 'm' ? 1 : 2), ServerPackets.LoginMessagePacket);
    
    switch(message.type) {
      case LoginMessageType.Confirm:
        loginCharacter();
        break;
    }
  }

  async function loginCharacter() {
    //TODO: create common api for these
    const { type } = await clientManager.main.sendWithAck(new ClientPackets.LoginPacket(username, password), ServerPackets.LoginMessagePacket);

    if (type === LoginMessageType.Confirm) {
      clientManager.main.keySalts = username;
      const redirect = await clientManager.main.await(ServerPackets.RedirectPacket);
      await clientManager.main.redirect(redirect.ip, redirect.port, redirect.redirect);

      EventBus.emit('logged-in');
    }
  }

  function handleBack() {
    RouterStore.push('auth/login');
  }
</script>

<Panel>
  <form class='p-4' autocomplete='off'>
    <div class='flex space-x-2'>
      <div>
        <div>
          <label for='username' class='block'>Username</label>
          <input bind:value={username} id='username' class='input' autocomplete='off'  />
        </div>
        <div>
          <label for='password' class='block'>Password</label>
          <input bind:value={password} id='password' type='password' class='input' autocomplete='off'  />
        </div>
        <div>
          <label for='confirm' class='block'>Confirm</label>
          <input bind:value={confirm} id='confirm' type='password' class='input' autocomplete='off'  />
        </div>
      </div>

      <div>
        <div class='flex flex-row space-x-2'>
          <select class='input' bind:value={gender}>
            <option class='bg-primary-700' value={PaperDollGender.Male}>Male</option>
            <option class='bg-primary-700' value={PaperDollGender.Female}>Female</option>
          </select>

          <select class='input' bind:value={hairStyle}>
            {#each Array(17) as _, index (index)}
              <option class='bg-primary-700' value={index+1}>Hair Style {index+1}</option>
            {/each}
          </select>

          <select class='input' bind:value={hairColour}>
            {#each Array(14) as _, index (index)}
              <option class='bg-primary-700' value={index}>Hair Colour {index+1}</option>
            {/each}
          </select>
          <select class='input' bind:value={skin}>
            {#each skinColours as colour, index (colour)}
              <option class='bg-primary-700' value={colour}>Skin Colour {index+1}</option>
            {/each}
          </select>
        </div>

        <div class='w-fit m-auto'>
          <Aisling helmetId={hairStyle} helmetDye={hairColour+1} gender={gender} skin={skin} />
        </div>

        <div class='flex justify-end gap-x-4 flex-row'>
          <button on:click|preventDefault={handleCreate} type='submit' class='button' disabled={disabled}>Create</button>
          <button on:click|preventDefault={handleBack} type='button' class='button' disabled={submitting}>Back</button>
        </div>
      </div>
    </div>
  </form>
</Panel>