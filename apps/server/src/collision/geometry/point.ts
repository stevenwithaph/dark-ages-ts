import { Shape } from './shape';
import { ShapeTag } from './shape-tag';

export class Point extends Shape {
  public get tag(): number {
    return ShapeTag.Point;
  }

  constructor() {
    super();

    this._height = 1;
    this._width = 1;
  }
}

export const DefaultPoint = new Point();
