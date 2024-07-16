import { Node } from './node';
import { Notifications } from './notifications';
import { SpatialHashGrid } from '../collision/spatial-hash-grid';
import { CollisionObject } from './physics/collision-object';

/**
 * Heavily inspired by godot's scene tree.
 * Any additions or issues should refer to godot's implementations
 */

export class SceneTree extends Node {
  private _grid: SpatialHashGrid<CollisionObject>;

  get grid() {
    return this._grid;
  }

  constructor() {
    super();

    this._grid = new SpatialHashGrid(100, 100);
  }

  addChild(node: Node): void {
    super.addChild(node);

    node.tree = this;
    node.notify(Notifications.EnterTree);
  }

  removeChild(node: Node): void {
    super.removeChild(node);

    node.notify(Notifications.ExitTree);
    node.tree = undefined;
  }
}
