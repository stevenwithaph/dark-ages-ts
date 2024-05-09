import 'reflect-metadata';
import './style.css';

import { Game, Scale } from 'phaser';
import Stats from 'stats.js';

import App from './ui/App.svelte';

import { SpriteAtlasFilePlugin } from './plugins/sprite-atlas-file-plugin';
import { BgmPlugin } from './plugins/bgm-plugin';
import { DyePipeline } from './pipelines/dye-pipeline';
import { PreloadScene } from './scenes/preload-scene';
import { AuthScene } from './scenes/auth-scene';
import { MapScene } from './scenes/map-scene';
import { TilesetFilePlugin } from './plugins/tileset-file-plugin';

const stats = new Stats();
document.body.appendChild(stats.dom);

const game = new Game({
  canvas: document.getElementById('canvas') as HTMLCanvasElement,
  type: Phaser.WEBGL,
  pixelArt: true,
  scale: {
    autoCenter: Scale.CENTER_BOTH,
    mode: Scale.RESIZE,
  },
  loader: {
    path: import.meta.env.VITE_ASSET_PATH,
  },
  scene: [PreloadScene, AuthScene, MapScene],
  disableContextMenu: true,
  plugins: {
    global: [
      { key: 'AtlasFilePlugin', plugin: SpriteAtlasFilePlugin, start: true },
      { key: 'TilesetFilePlugin', plugin: TilesetFilePlugin, start: true },
      { key: 'BgmPlugin', plugin: BgmPlugin, start: true, mapping: 'bgm' },
    ],
  },
  pipeline: {
    //@ts-ignore
    Dye: DyePipeline,
  },
});

game.events.on(Phaser.Core.Events.PRE_STEP, () => {
  stats.begin();
});

game.events.on(Phaser.Core.Events.POST_RENDER, () => {
  stats.end();
});

new App({
  target: document.getElementById('ui')!,
});
