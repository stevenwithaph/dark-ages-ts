import { PlayerControllerState } from './player-controller-state';
import { IdleState } from './idle-state';

export class AnimationState extends PlayerControllerState {
  reason(): void {
    if (!this.entity?.display.animator.isInterruptable) {
      this.machine.replace(IdleState);
    }
  }
}
