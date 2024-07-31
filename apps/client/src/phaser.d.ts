declare module Phaser {
  namespace Loader {
    interface LoaderPlugin {
      spriteAtlas: (key: string, url: string) => void;
    }
  }
  export interface Scene {
    bgm: import('./plugins/bgm-plugin').BgmPlugin;
  }
}
