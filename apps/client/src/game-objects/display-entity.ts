import { AtlasSpriteAnimator } from './atlas-sprite/atlas-sprite-animator';

export interface DisplayEntity {
  get animator(): AtlasSpriteAnimator;
  setDirection(direction: number): void;
  playAnimation(animation: number, duration: number): void;
  playWalkAnimation(duration: number): void;
  playIdleAnimation(): void;
}
