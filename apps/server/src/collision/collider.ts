import { ColliderNode } from '../scene/physics/collider-node';
import { Shape } from './geometry/shape';
import { CellNode } from './world';

export class Collider {
  get minX() {
    return this.x;
  }

  get maxX() {
    return this.x + this.shape.width;
  }

  get minY() {
    return this.y;
  }

  get maxY() {
    return this.y + this.shape.height;
  }

  get shape() {
    return this._shape;
  }

  get bbox() {
    return {
      minX: this.minX,
      maxX: this.maxX,
      minY: this.minY,
      maxY: this.maxY,
    };
  }

  data: {
    cells: CellNode[][];
    queryId: number;
    bounds: { minX: number; maxX: number; minY: number; maxY: number };
  };
  layer: number = 0;
  mask: number = 0;

  _shape: Shape;

  public x: number = 0;
  public y: number = 0;

  constructor(
    shape: Shape,
    public owner: ColliderNode
  ) {
    this._shape = shape;

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
  }
}
