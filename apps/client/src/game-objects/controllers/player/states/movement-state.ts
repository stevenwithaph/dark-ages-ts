import { PlayerControllerState } from './player-controller-state';

export abstract class MovementState extends PlayerControllerState {
  enter(): void {
    super.enter();
  }

  exit(): void {
    super.exit();
  }
}
