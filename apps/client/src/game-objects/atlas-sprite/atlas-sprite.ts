export enum AtlasSpriteEvents {
  Loaded = 'loaded',
}

export abstract class AltasSprite extends Phaser.GameObjects.Sprite {
  protected itemId: string = '000';
  protected hasTexture: boolean = false;
  protected textureName: string = '';

  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0, 'hidden');

    this.setOrigin(0.5, 1);
  }

  setItemId(itemId: number) {
    this.itemId = itemId.toString().padStart(3, '0');

    if (this.itemId === '000') {
      this.setVisible(false);
      return;
    }

    this.refreshAtlas();
  }

  protected setLoadedTexture() {
    this.hasTexture = true;
    this.setTexture(this.textureName);
    this.refreshFrame();
    this.setVisible(true);

    this.emit(AtlasSpriteEvents.Loaded);
  }

  refreshAtlas() {
    this.hasTexture = false;
    this.setVisible(false);

    if (this.itemId === '000') {
      return;
    }

    this.scene.load.off(`filecomplete-spriteAtlas-${this.textureName}`, this.setLoadedTexture, this);

    this.textureName = this.getTextureName();
    if (this.scene.textures.exists(this.textureName)) {
      this.setLoadedTexture();
    } else {
      this.setVisible(false);

      this.load();
      this.scene.load.once(`filecomplete-spriteAtlas-${this.textureName}`, this.setLoadedTexture, this);
      this.scene.load.start();
    }
  }

  refreshFrame() {
    if (!this.hasTexture) {
      return;
    }

    const animation = this.getFrameName();
    if (this.texture.has(animation)) {
      this.setFrame(animation);
      this.setVisible(true);
    } else {
      this.setVisible(false);
    }
  }

  protected abstract load(): void;

  protected abstract getTextureName(): string;

  protected abstract getFrameName(): string;
}
