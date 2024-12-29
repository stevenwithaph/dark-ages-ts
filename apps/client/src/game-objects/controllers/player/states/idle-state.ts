import { AnimationState } from './animation-state';
import { MoveToDestinationState } from './move-to-destination-state';
import { PlayerControllerState } from './player-controller-state';

export class IdleState extends PlayerControllerState {
  reason(): void {
    if (this.controller.destination) {
      return this.machine.replace(MoveToDestinationState);
    }

    if (this.entity?.display.animator.isRunning && this.entity.display.animator.isInterruptable) {
      return this.machine.replace(AnimationState);
    }
  }
}
