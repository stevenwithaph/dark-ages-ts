import { State } from '@medenia/fsm';
import { PlayerController } from '../player-controller';

export abstract class PlayerControllerState extends State<PlayerController> {
  get entity() {
    return this.machine.context.entity;
  }

  get controller() {
    return this.machine.context;
  }
}
