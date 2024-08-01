import Phaser from 'phaser';
import { PreloadScene } from './scenes/preload-scene';
import { BgmPlugin } from './plugins/bgm-plugin';
import { SpriteAtlasFilePlugin } from './plugins/sprite-atlas-file-plugin';
import { AuthScene } from './scenes/auth-scene';
import { MapScene } from './scenes/map-scene';
import { DyePipeline } from './pipelines/dye-pipeline';

const game = new Phaser.Game({
  canvas: document.getElementById('canvas') as HTMLCanvasElement,
  type: Phaser.WEBGL,
  pixelArt: true,
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
    mode: Phaser.Scale.RESIZE,
  },
  loader: {
    path: import.meta.env.VITE_ASSET_PATH,
  },
  scene: [PreloadScene, AuthScene, MapScene],
  disableContextMenu: true,
  plugins: {
    global: [
      { key: 'AtlasFilePlugin', plugin: SpriteAtlasFilePlugin, start: true },
      { key: 'BgmPlugin', plugin: BgmPlugin, start: true, mapping: 'bgm' },
    ],
  },
  pipeline: {
    //@ts-ignore
    Dye: DyePipeline,
  },
  dom: {
    pointerEvents: 'none',
  },
});

game.domContainer = document.getElementById('dom-container') as HTMLDivElement;

game.scene.add('aisling', {}, true);

export { game };
