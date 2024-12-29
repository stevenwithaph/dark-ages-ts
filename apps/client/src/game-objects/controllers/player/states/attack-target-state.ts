import { StateMachine } from '@medenia/fsm';
import { PlayerControllerState } from './player-controller-state';
import { PlayerController } from '../player-controller';
import { IdleState } from './idle-state';

export class AttackTargetState extends PlayerControllerState {
  private _timer: Phaser.Time.TimerEvent;

  constructor(machine: StateMachine<PlayerController>) {
    super(machine);

    this._timer = this.controller.scene.time.addEvent({
      delay: 200,
      loop: true,
      startAt: 200,
      callback: this.controller.defaultAttack,
      callbackScope: this.controller,
    });

    this._timer.paused = true;
  }

  reason(): void {
    if (!this.controller.target) {
      this.machine.replace(IdleState);
    }
  }

  enter(): void {
    this._timer.startAt = 0;
    this._timer.paused = false;
  }

  exit(): void {
    this._timer.paused = true;
  }
}
