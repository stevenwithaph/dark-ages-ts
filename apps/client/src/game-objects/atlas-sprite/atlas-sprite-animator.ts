export interface AtlasSpriteAnimation {
  startUp: number;
  startDown: number;
  frames: number;
  prefix: string;
  loop: boolean;
}

export const AnimationEvents = {
  START: 'start',
  COMPLETE: 'complete',
  FRAME: 'frame',
};

export class AtlasSpriteAnimator extends Phaser.Events.EventEmitter {
  public get isRunning() {
    return this._isRunning;
  }

  public get isInterruptable() {
    return this._animation === this._defaultAnimation;
  }

  private _currentFrameTime: number = 0;
  private _frameMs: number = 0;
  private _frame: number = 0;

  private _animation: AtlasSpriteAnimation;
  private _defaultAnimation: AtlasSpriteAnimation;
  private _defaultDuration: number;

  private _isRunning: boolean = false;

  public get prefix() {
    return this._animation.prefix;
  }

  constructor(defaultAnaimation: AtlasSpriteAnimation, defaultDuration: number) {
    super();

    this._defaultAnimation = defaultAnaimation;
    this._defaultDuration = defaultDuration;

    this._animation = this._defaultAnimation;
  }

  public play(animation: AtlasSpriteAnimation, duration: number) {
    if (animation === this._animation) return;

    this._isRunning = true;
    this._animation = animation;

    this._frame = 0;
    this._currentFrameTime = 0;
    this._frameMs = duration / this._animation.frames;

    this.emit(AnimationEvents.START);
    this.emit(AnimationEvents.FRAME);

    if (this._animation.frames === 1) {
      this._isRunning = false;
      this.emit(AnimationEvents.COMPLETE);
    }
  }

  public update(delta: number) {
    if (!this._isRunning) return;

    this._currentFrameTime += delta;

    if (this._currentFrameTime >= this._frameMs) {
      if (this._frame === this._animation.frames - 1) {
        this.emit(AnimationEvents.COMPLETE);
        if (this._animation.loop) {
          this._frame = 0;
        } else {
          this._isRunning = false;
          this.play(this._defaultAnimation, this._defaultDuration);
        }
      } else {
        this._frame++;
      }

      this._currentFrameTime = this._currentFrameTime % this._frameMs;

      this.emit(AnimationEvents.FRAME);
    }
  }

  public directionFrame(direction: number) {
    if (direction === 0 || direction === 3) {
      return this._animation.startUp + this._frame;
    } else {
      return this._animation.startDown + this._frame;
    }
  }
}
