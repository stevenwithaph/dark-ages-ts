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

  constructor(width: number, height: number) {
    super();

    this.tree = this;

    this._grid = new SpatialHashGrid(width, height);
  }
}
