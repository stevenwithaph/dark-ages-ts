export interface SpriteAtlasAnimation {
  startUp: number;
  startDown: number;
  frames: number;
  prefix: string;
  loop: boolean;
}

export const AnimationEvents = {
  COMPLETE: 'complete',
  FRAME: 'frame',
};

export class SpriteAtlasAnimator extends Phaser.Events.EventEmitter {
  private currentFrameTime: number = 0;
  private frameMs: number = 0;
  private frame: number = 0;
  private animation: SpriteAtlasAnimation;
  private isRunning: boolean = false;

  public get prefix() {
    return this.animation.prefix;
  }

  constructor(animation: SpriteAtlasAnimation) {
    super();

    this.animation = animation;
  }

  public play(animation: SpriteAtlasAnimation, duration: number) {
    this.isRunning = true;
    this.animation = animation;

    this.frame = 0;
    this.currentFrameTime = 0;
    this.frameMs = duration / this.animation.frames;

    this.emit(AnimationEvents.FRAME);

    if (this.animation.frames === 1) {
      this.isRunning = false;
      this.emit(AnimationEvents.COMPLETE);
    }
  }

  public update(delta: number) {
    if (!this.isRunning) {
      return;
    }

    this.currentFrameTime += delta;

    if (this.currentFrameTime >= this.frameMs) {
      if (this.frame + 1 === this.animation.frames) {
        this.emit(AnimationEvents.COMPLETE);
        if (this.animation.loop) {
          this.frame = 0;
        } else {
          this.isRunning = false;
        }
      } else {
        this.frame++;
      }

      this.currentFrameTime = this.currentFrameTime % this.frameMs;

      this.emit(AnimationEvents.FRAME);
    }
  }

  public directionFrame(direction: number) {
    if (direction === 0 || direction === 3) {
      return this.animation.startUp + this.frame;
    } else {
      return this.animation.startDown + this.frame;
    }
  }
}
