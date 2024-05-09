export interface DisplayEntity {
  setDirection(direction: number): void;
  playAnimation(animation: number, duration: number): void;
  playWalkAnimation(duration: number): void;
  playIdleAnimation(): void;
}
