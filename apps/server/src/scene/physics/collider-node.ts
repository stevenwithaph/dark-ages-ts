import { Collider } from '../../collision/collider';
import { Shape } from '../../collision/geometry/shape';
import { Node2D } from '../node2d';
import { Notifications } from '../notifications';

export enum ColliderNodeEvents {
  CollisionEnter = 'CollisionEnter',
  CollisionExit = 'CollisionExit',
}

export class ColliderNode extends Node2D {
  private collider: Collider;

  get layer() {
    return this.collider.layer;
  }

  get mask() {
    return this.collider.mask;
  }

  set layer(value: number) {
    this.collider.layer = value;
  }

  set mask(value: number) {
    this.collider.mask = value;
  }

  protected _collisions: Set<Collider> = new Set();

  constructor(x: number, y: number, shape: Shape) {
    super(x, y);

    this.collider = new Collider(shape, this);
    this.collider.owner = this;

    this.collider.x = this.x;
    this.collider.y = this.y;
  }

  _notify(notification: Notifications): void {
    super._notify(notification);

    switch (notification) {
      case Notifications.TransformChanged:
        this.collider.x = this.x;
        this.collider.y = this.y;
        this.tree?.world.update(this.collider);
        break;
      case Notifications.PostTransformChanged:
        this.checkCollision();
        break;
      case Notifications.EnterTree:
        this.collider.x = this.x;
        this.collider.y = this.y;
        this.tree?.world.insert(this.collider);
        break;
      case Notifications.PostEnterTree:
        this.checkCollision();
        break;
      case Notifications.ExitTree:
        this.tree?.world.remove(this.collider);

        for (const collision of this._collisions) {
          collision.owner.removeCollision(this.collider);
          this.removeCollision(collision);
        }
        break;
    }
  }

  public checkCollision() {
    if (!this.tree) return;

    const colliders = this.tree.world.intersects(this.collider);

    for (const collider of colliders) {
      if (!this._collisions.has(collider)) {
        this.addCollision(collider);
        collider.owner.addCollision(this.collider);
      }
    }

    for (const collider of this._collisions) {
      if (!colliders.has(collider)) {
        this.removeCollision(collider);
        collider.owner.removeCollision(this.collider);
      }
    }
  }

  addCollision(collider: Collider) {
    if (this._collisions.has(collider)) return;

    this._collisions.add(collider);
    this.emit(ColliderNodeEvents.CollisionEnter, collider.owner);
  }

  removeCollision(collider: Collider) {
    if (!this._collisions.has(collider)) return;

    this._collisions.delete(collider);
    this.emit(ColliderNodeEvents.CollisionExit, collider.owner);
  }
}
