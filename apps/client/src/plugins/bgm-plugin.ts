import { Scene } from 'phaser';

export class BgmPlugin extends Phaser.Plugins.BasePlugin {
  private currentBgm: string = '';
  private audioScene: Scene;

  constructor(pluginManager: Phaser.Plugins.PluginManager) {
    super(pluginManager);

    this.game.sound.pauseOnBlur = false;
  }

  create() {
    const audioScene = this.game.scene.add('background-audio', {}, true);
    if (!audioScene) {
      throw Error('error creating background');
    }

    this.audioScene = audioScene;
    this.game.sound.setVolume(0.25);
  }

  async load(id: number) {
    return new Promise<void>((resolve) => {
      const path = `music/${id}.mp3`;
      const key = `music/${id}`;
      this.audioScene.load.audio(key, path);

      this.audioScene.load.start();

      this.audioScene.load.once(`filecomplete-audio-${key}`, () => {
        resolve();
      });
    });
  }

  async play(id: number) {
    await this.load(id);

    const audio = this.game.sound.get(this.currentBgm);

    if (audio) {
      this.audioScene.tweens.add({
        targets: audio,
        volume: 0,
        duration: 2500,
        onComplete: () => {
          this.game.sound.stopByKey(this.currentBgm);
          this.beginPlay(id);
        },
      });
    } else {
      this.beginPlay(id);
    }
  }

  beginPlay(id: number) {
    this.currentBgm = `music/${id}`;
    this.game.sound.play(`music/${id}`, {
      loop: true,
    });
  }
}
