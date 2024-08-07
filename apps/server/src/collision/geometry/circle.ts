import { Shape } from './shape';
import { ShapeTag } from './shape-tag';

export class Circle extends Shape {
  public get tag(): number {
    return ShapeTag.Circle;
  }

  public get radius(): number {
    return this._radius;
  }

  protected _radius: number;

  constructor(radius: number) {
    super();

    this._radius = radius;
    this._width = radius;
    this._height = radius;
  }
}
