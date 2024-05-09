declare module Phaser {
  namespace Loader {
    interface LoaderPlugin {
      spriteAtlas: (key: string, url: string) => void;
      tileset: (id: number, tiles: Set<number>) => void;
    }
  }
  export interface Scene {
    bgm: import('./plugins/bgm-plugin').BgmPlugin;
  }
}
