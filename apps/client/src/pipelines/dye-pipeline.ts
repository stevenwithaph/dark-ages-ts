import * as Phaser from 'phaser';

export interface DyePipelineData {
  dyeIndex: number;
  alpha: number;
}

export class DyePipeline extends Phaser.Renderer.WebGL.Pipelines
  .SinglePipeline {
  // the unique id of this pipeline
  public static readonly KEY = 'Dye';

  constructor(game: Phaser.Game) {
    super({
      game: game,
      name: 'Dye',
      fragShader: `
        precision mediump float;

        uniform sampler2D uMainSampler;
        uniform sampler2D uPaletteSampler;

        uniform float uPaletteIndex;
        varying vec2 outTexCoord;

        void main(void) 
        {
          vec4 texture = texture2D(uMainSampler, outTexCoord);
          
          float r = texture.r;
          float g = texture.g;
          float b = texture.b;
          float a = texture.a;

          float rowOffset = 1.0 / 256.0; // Divide by the number of rows
          vec2 dyeTexCoord = vec2(b, uPaletteIndex * rowOffset);

          vec4 paletteColour = texture2D(uPaletteSampler, vec2(r, g));
          vec4 dyeColour = texture2D(uPaletteSampler, dyeTexCoord);

          vec3 finalColour = (dyeColour.rgb + paletteColour.rgb);

          gl_FragColor = vec4(finalColour, a);
        }
      `,
    });
  }

  onActive(): void {
    const palettes = this.game.textures.get('palettes');
    palettes.setFilter(Phaser.Textures.FilterMode.NEAREST);

    const palettesTexture = palettes.source[0].glTexture;
    if (!palettesTexture) return;

    this.bindTexture(palettesTexture, 1);

    this.set1i('uPaletteSampler', 1);
  }

  onBind(gameObject: Phaser.GameObjects.GameObject) {
    super.onBind();
    //  ...
    const data = (
      gameObject as unknown as Phaser.GameObjects.Components.Pipeline
    ).pipelineData as DyePipelineData;

    this.set1f('uPaletteIndex', data.dyeIndex);
  }

  onBatch(gameObject: Phaser.GameObjects.GameObject) {
    if (gameObject) {
      this.flush();
    }
  }
}
