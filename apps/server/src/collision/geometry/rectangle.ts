import { Circle } from './circle';
import { Point } from './point';
import { Shape } from './shape';
import { ShapeTag } from './shape-tag';

import { boxBox, boxCircle, boxPoint } from 'intersects';

export class Rectangle extends Shape {
  private _width: number;
  private _height: number;

  public get width() {
    return this._width;
  }

  public get height() {
    return this._height;
  }

  constructor(x: number, y: number, width: number, height: number) {
    super(x, y, ShapeTag.Rectangle);

    this._width = width;
    this._height = height;
  }

  protected calculateBBox(): void {
    this.setBBox(this.x, this.y, this.x + this.width, this.y + this.height);
  }

  public intersects(shape: Shape): boolean {
    switch (shape.tag) {
      case ShapeTag.Rectangle:
        const box = shape as Rectangle;
        return boxBox(this.x, this.y, this.width, this.height, box.x, box.y, box.width, box.height);
      case ShapeTag.Point:
        const point = shape as Point;
        return boxPoint(this.x, this.y, this.width, this.height, point.x, point.y);
      case ShapeTag.Circle:
        const circle = shape as Circle;
        return boxCircle(this.x, this.y, this.width, this.height, circle.x, circle.y, circle.radius);
      default:
        return false;
    }
  }

  public contains(x: number, y: number): boolean {
    return boxPoint(this.x, this.y, this.width, this.height, x, y);
  }
}
