import { Node } from './node';
import { Notifications } from './notifications';

export enum Node2DEvents {
  TransformChanged = 'TransformChanged',
}

export class Node2D extends Node {
  private _position: number[] = [0, 0];

  get x() {
    return this._position[0];
  }

  get y() {
    return this._position[1];
  }

  set x(value: number) {
    this.setPosition(value, this.y);
  }

  set y(value: number) {
    this.setPosition(this.x, value);
  }

  setPosition(x: number, y?: number) {
    this.notify(Notifications.PreTransformChanged);

    this._position[0] = x;
    this._position[1] = y ?? x;

    this.notify(Notifications.TransformChanged);
    this.notify(Notifications.PostTransformChanged);
  }
}
