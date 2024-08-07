import { Node } from './node';
import { Notifications } from './notifications';
import { World } from '../collision/world';
import { ColliderNode } from './physics/collider-node';

/**
 * Heavily inspired by godot's scene tree.
 * Any additions or issues should refer to godot's implementations
 */

export class SceneTree extends Node {
  private _world: World;

  get world() {
    return this._world;
  }

  constructor(width: number, height: number) {
    super();

    this.tree = this;

    this._world = new World(width, height);
  }
}
