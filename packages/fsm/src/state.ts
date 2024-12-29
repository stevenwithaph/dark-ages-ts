import { StateMachine } from './state-machine';

export abstract class State<T> {
  public get machine() {
    return this._machine;
  }

  private _machine: StateMachine<T>;

  constructor(machine: StateMachine<T>) {
    this._machine = machine;
  }

  enter() {}

  exit() {}

  update() {}

  reason() {}
}
