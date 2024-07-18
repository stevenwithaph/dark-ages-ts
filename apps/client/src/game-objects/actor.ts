import { DisplayEntity } from './display-entity';
import { AltasSprite } from './sprite-atlas/atlas-sprite';
import { AnimationEvents, SpriteAtlasAnimation, SpriteAtlasAnimator } from './sprite-atlas/sprite-atlas-animator';

const idle: SpriteAtlasAnimation = {
  startUp: 0,
  startDown: 2,
  frames: 2,
  prefix: '',
  loop: true,
};

export class Actor extends AltasSprite implements DisplayEntity {
  private animator: SpriteAtlasAnimator;

  constructor(scene: Phaser.Scene, spriteId: number) {
    super(scene);
    this.animator = new SpriteAtlasAnimator(idle);
    this.animator.play(idle, 1000);

    this.animator.on(AnimationEvents.FRAME, () => this.refreshFrame());

    this.setItemId(0x4000 ^ spriteId);

    this.addToUpdateList();
  }

  protected preUpdate(_: number, delta: number): void {
    this.animator.update(delta);
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
    return `${this.textureName}_${this.animator.directionFrame(0)}`;
  }
}
