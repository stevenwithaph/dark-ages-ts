import { CellData, CellNode } from '../../collision/spatial-hash-grid';
import { BBox } from '../../collision/geometry/bbox';
import { Shape } from '../../collision/geometry/shape';
import { Node2D } from '../node2d';
import { Notifications } from '../notifications';

export enum CollisionObjectEvents {
  CollisionEnter = 'CollisionEnter',
  CollisionExit = 'CollisionExit',
}

export class CollisionObject extends Node2D implements CellData<CollisionObject> {
  private _shape: Shape;
  protected _collisions: Set<CollisionObject> = new Set();

  layer: number = 0;
  mask: number = 0;

  data: { cells: CellNode<CollisionObject>[][]; queryId: number; bounds: BBox };

  get shape() {
    return this._shape;
  }

  constructor(shape: Shape) {
    super();

    this.data = {
      cells: [],
      queryId: 0,
      bounds: {
        minX: 0,
        minY: 0,
        maxX: 0,
        maxY: 0,
      },
    };

    this._shape = shape;
  }

  notify(notification: Notifications): void {
    super.notify(notification);

    switch (notification) {
      case Notifications.TransformChanged:
        this.updateShapePosition();

        this.tree?.grid.update(this);
        break;
      case Notifications.PostTransformChanged:
        this.checkCollision();
        break;
      case Notifications.EnterTree:
        this.updateShapePosition();

        this.tree?.grid.insert(this);
        break;
      case Notifications.PostEnterTree:
        this.checkCollision();
        break;
      case Notifications.ExitTree:
        this.tree?.grid.remove(this);

        for (const collision of this._collisions) {
          collision.collisionExit(this);
          this.collisionExit(collision);
        }
        break;
    }
  }

  private updateShapePosition() {
    let x = this.parent === undefined || 'x' in this.parent ? (this.parent?.x as number) : 0;
    let y = this.parent === undefined || 'y' in this.parent ? (this.parent?.y as number) : 0;

    this._shape.setPosition(this.x + x, this.y + y);
  }

  public checkCollision() {
    if (!this.tree) return;

    const entities = this.tree.grid.query(this.shape, this.mask);

    for (const entity of entities) {
      if (!this._collisions.has(entity)) {
        this.collisionEnter(entity);
        entity.collisionEnter(this);
      }
    }

    for (const entity of this._collisions) {
      if (!entities.has(entity)) {
        this.collisionExit(entity);
        entity.collisionExit(this);
      }
    }
  }

  collisionEnter(collider: CollisionObject) {
    if (this._collisions.has(collider)) return;

    this._collisions.add(collider);
    this.emit(CollisionObjectEvents.CollisionEnter, collider);
  }

  collisionExit(collider: CollisionObject) {
    if (!this._collisions.has(collider)) return;

    this._collisions.delete(collider);
    this.emit(CollisionObjectEvents.CollisionExit, collider);
  }
}
