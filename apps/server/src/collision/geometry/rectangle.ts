import { Shape } from './shape';
import { ShapeTag } from './shape-tag';

export class Rectangle extends Shape {
  public get tag(): number {
    return ShapeTag.Rectangle;
  }

  public get halfWidth() {
    return this._halfWidth;
  }

  public get halfHeight() {
    return this._halfHeight;
  }

  _halfWidth: number;
  _halfHeight: number;

  constructor(width: number, height: number) {
    super();

    this._halfWidth = width / 2;
    this._halfHeight = height / 2;

    this._width = width;
    this._height = height;
  }
}
