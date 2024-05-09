import EventEmitter from 'eventemitter3';

interface ResourceEvents {
  change: (percent: number) => void;
}

export class Resource extends EventEmitter<ResourceEvents> {
  public set current(value: number) {
    this._current = Math.min(Math.max(value, 0), this._max);
  }

  public get current() {
    return this._current;
  }

  public set max(value: number) {
    this._max = value;
  }

  public get max() {
    return this._max;
  }

  public get percent() {
    return Math.max((this._current / this._max) * 100, 0);
  }

  constructor(
    protected _current: number,
    protected _max: number
  ) {
    super();
  }

  public change(amount: number) {
    this._current += amount;

    this.emit('change', this.percent);
  }
}
