import { DisplayEntity } from './display-entity';
import { AltasSprite } from './atlas-sprite/atlas-sprite';
import { AnimationEvents, AtlasSpriteAnimation, AtlasSpriteAnimator } from './atlas-sprite/atlas-sprite-animator';
import { TILE_HEIGHT, TILE_WIDTH } from './iso-map';

const idle: AtlasSpriteAnimation = {
  startUp: 0,
  startDown: 2,
  frames: 2,
  prefix: '',
  loop: true,
};

export class Actor extends AltasSprite implements DisplayEntity {
  public get animator() {
    return this._animator;
  }

  private _animator: AtlasSpriteAnimator;

  constructor(scene: Phaser.Scene, spriteId: number) {
    super(scene);
    this._animator = new AtlasSpriteAnimator(idle);
    this._animator.play(idle, 1000);

    this._animator.on(AnimationEvents.FRAME, () => this.refreshFrame());

    //  TODO: change this to size of the sprite
    this.setInteractive(new Phaser.Geom.Rectangle(TILE_WIDTH / 4, TILE_HEIGHT * 2, TILE_WIDTH / 2, TILE_HEIGHT), Phaser.Geom.Rectangle.Contains);

    this.setItemId(0x4000 ^ spriteId);

    this.addToUpdateList();
  }

  protected preUpdate(_: number, delta: number): void {
    this._animator.update(delta);
  }

  setDirection(direction: number): void {}

  playAnimation(animation: number, duration: number): void {}
  playWalkAnimation(duration: number): void {}
  playIdleAnimation(): void {}

  protected load(): void {
    this.scene.load.spriteAtlas(this.textureName, `./monsters/${this.textureName}`);
  }
  protected getTextureName(): string {
    return `mns${this.itemId}`;
  }
  protected getFrameName(): string {
    return `${this.textureName}_${this._animator.directionFrame(0)}`;
  }
}
