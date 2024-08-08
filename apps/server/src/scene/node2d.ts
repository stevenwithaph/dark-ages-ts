import { Node } from './node';
import { Notifications } from './notifications';

export enum Node2DEvents {
  TransformChanged = 'TransformChanged',
}

export class Node2D extends Node {
  private _local: number[] = [0, 0];
  private _global: number[] = [0, 0];

  get x() {
    return this._global[0];
  }

  get y() {
    return this._global[1];
  }

  get localX() {
    return this._local[0];
  }

  get localY() {
    return this._local[1];
  }

  set localX(value: number) {
    this.setPosition(value, this.localY);
  }

  set localY(value: number) {
    this.setPosition(this.localX, value);
  }

  constructor(x: number, y: number) {
    super();

    this._local[0] = x;
    this._local[1] = y;

    this.updateGlobalTransform();
  }

  protected _notify(notification: Notifications): void {
    super._notify(notification);

    switch (notification) {
      case Notifications.TransformChanged:
        this.updateGlobalTransform();
        break;
    }
  }

  setPosition(x: number, y?: number) {
    this.notify(Notifications.PreTransformChanged);

    this._local[0] = x;
    this._local[1] = y ?? x;

    this.notify(Notifications.TransformChanged);
    this.notify(Notifications.PostTransformChanged);
  }

  private updateGlobalTransform() {
    let parentX = this.parent !== undefined && 'x' in this.parent ? (this.parent?.x as number) : 0;
    let parentY = this.parent !== undefined && 'y' in this.parent ? (this.parent?.y as number) : 0;

    this._global[0] = parentX + this._local[0];
    this._global[1] = parentY + this._local[1];
  }
}
