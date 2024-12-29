import { IdleState } from './idle-state';
import { MovementState } from './movement-state';

export class MoveToDestinationState extends MovementState {
  enter(): void {}

  reason(): void {
    if (!this.controller.destination && this.entity?.display.animator.isInterruptable) {
      this.machine.replace(IdleState);
    }
  }

  exit(): void {}
}
