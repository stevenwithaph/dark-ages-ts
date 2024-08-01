<script lang="ts">
  import { game } from '../../game';
  import { PaperDollContainer, PaperDollContainerEvents, PaperDollGender } from '../../game-objects/paper-doll/paper-doll-container';

  let src: string = $state('');
  let aisling: PaperDollContainer;
  let texture: Phaser.Textures.DynamicTexture;

  interface Props {
    helmetId: number;
    helmetDye: number;
    gender: PaperDollGender;
    skin: number;
  }

  const { helmetId, helmetDye, gender, skin }: Props = $props();

  $effect(() => {
    const scene = game.scene.getScene('aisling');

    //TODO: store defaults somewhere
    aisling = new PaperDollContainer(scene, gender, 1);
    aisling.pieces.armor.setItemId(1);
    aisling.pieces.pants.setItemId(1);
    aisling.pieces.pants.setDye(80);
    aisling.pieces.boots.setItemId(1);
    aisling.pieces.boots.setDye(85);
    aisling.pieces.helmet.setItemId(helmetId);
    aisling.pieces.helmet.setDye(helmetDye+78);
    aisling.pieces.body.setDye(63+skin);

    aisling.on(PaperDollContainerEvents.PieceLoaded, onPieceLoaded);

    texture = new Phaser.Textures.DynamicTexture(scene.textures, 'auth', 114, 170);
    texture.camera.setRoundPixels(true);
    texture.camera.setZoom(2);
    texture.camera.centerOn(0, -42);
    texture.draw(aisling);

    return () => {
      aisling.off(PaperDollContainerEvents.PieceLoaded, onPieceLoaded);
      aisling.destroy();
      scene.textures.removeKey('auth');
    }
  });

  $effect(() => {
    aisling.pieces.helmet.setItemId(helmetId);
  });

  $effect(() => {
    if(gender === 'w') {
      aisling.pieces.pants.setItemId(0);
    } else {
      aisling.pieces.pants.setItemId(1);
    }
    aisling.setGender(gender);
  });

  $effect(() => {
    aisling.pieces.helmet.setDye(helmetDye+78);
    drawAisling();
  });

  $effect(() => {
    aisling.pieces.body.setDye(skin+63);
    drawAisling();
  });

  function onPieceLoaded() {
    drawAisling();
  }

  function drawAisling() {
    texture.clear();
    texture.draw(aisling);
    texture.snapshot((image) => {
      src = (image as HTMLImageElement).src;
    });
  }

</script>

<div class='w-[114px] h-[170px]'>
  {#if src !== ''}
    <img class='pixelated' {src} alt='character' />
  {/if}
</div>