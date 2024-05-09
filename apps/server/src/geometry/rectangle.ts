import { BBox } from './bbox';
import { Circle } from './circle';
import { Point } from './point';
import { Shape } from './shape';
import { ShapeTag } from './shape-tag';

import { boxBox, boxCircle, boxPoint } from 'intersects';

export class Rectangle extends Shape {
  private _width!: number;
  private _height!: number;

  private _bbox!: BBox;

  public get width() {
    return this._width;
  }

  public get height() {
    return this._height;
  }

  public get bbox() {
    return this._bbox;
  }

  constructor(x: number, y: number, width: number, height: number) {
    super(x, y, ShapeTag.Rectangle);

    this._width = width;
    this._height = height;
  }

  protected calculateBBox(): void {
    this._bbox = {
      minX: this.x,
      minY: this.y,
      maxX: this.x + this.width,
      maxY: this.y + this.height,
    };
  }

  public intersects(shape: Shape): boolean {
    switch (shape.tag) {
      case ShapeTag.Rectangle:
        const box = shape as Rectangle;
        return boxBox(
          this.x,
          this.y,
          this.width,
          this.height,
          box.x,
          box.y,
          box.width,
          box.height
        );
      case ShapeTag.Point:
        const point = shape as Point;
        return boxPoint(
          this.x,
          this.y,
          this.width,
          this.height,
          point.x,
          point.y
        );
      case ShapeTag.Circle:
        const circle = shape as Circle;
        return boxCircle(
          this.x,
          this.y,
          this.width,
          this.height,
          circle.centerX,
          circle.centerY,
          circle.radius
        );
      default:
        return false;
    }
  }

  public contains(x: number, y: number): boolean {
    return boxPoint(this.x, this.y, this.width, this.height, x, y);
  }
}
