import { vec2 } from 'gl-matrix';
import { Node } from './node';
import { Notifications } from './notifications';

export class Node2D extends Node {
  private _position: vec2 = vec2.fromValues(0, 0);

  get x() {
    return this._position[0];
  }

  get y() {
    return this._position[1];
  }

  set x(value: number) {
    this._position[0] = value;

    this.notify(Notifications.TransformChanged);
  }

  set y(value: number) {
    this._position[1] = value;

    this.notify(Notifications.TransformChanged);
  }

  setPosition(x: number, y?: number) {
    this._position[0] = x;
    this._position[1] = y ?? x;

    this.notify(Notifications.TransformChanged);
  }

  notify(notification: Notifications): void {
    super.notify(notification);

    switch (notification) {
      case Notifications.TransformChanged:
        this.notifyChildren(notification);
        break;
    }
  }
}
