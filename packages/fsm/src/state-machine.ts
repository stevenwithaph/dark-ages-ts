import { Constructor } from 'type-fest';
import { State } from './state';

export class StateMachine<T> {
  public get context() {
    return this._context;
  }

  protected _context: T;

  private _states: Map<Constructor<State<T>>, State<T>> = new Map();

  private _currentState?: State<T>;

  constructor(context: T, initial: Constructor<State<T>>) {
    this._context = context;

    this.addState(initial);
    this.replace(initial);
  }

  addState(state: Constructor<State<T>>) {
    const newState = new state(this);
    this._states.set(state, newState);
  }

  replace(state: Constructor<State<T>>) {
    const nextState = this._states.get(state);

    if (!nextState) throw new Error('Invalid state');
    if (this._currentState) {
      console.log('leaving state', this._currentState.constructor.name);
      this._currentState.exit();
    }

    this._currentState = nextState;

    console.log('entering state', this._currentState.constructor.name);

    this._currentState.enter();
    this._currentState.reason();
  }

  update() {
    this._currentState?.reason();
    this._currentState?.update();
  }
}
