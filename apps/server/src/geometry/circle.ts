import { BBox } from './bbox';
import { Point } from './point';
import { Rectangle } from './rectangle';
import { Shape } from './shape';
import { ShapeTag } from './shape-tag';

import { circleBox, circleCircle, circlePoint } from 'intersects';

export class Circle extends Shape {
  private _radius: number = 0;

  private _bbox!: BBox;

  public get centerX() {
    return this.x;
  }

  public get centerY() {
    return this.y;
  }

  public get radius() {
    return this._radius;
  }

  public get bbox() {
    return this._bbox;
  }

  constructor(x: number, y: number, radius: number) {
    super(x, y, ShapeTag.Circle);

    this._radius = radius;

    this.calculateBBox();
  }

  protected calculateBBox(): void {
    this._bbox = {
      minX: this.x - this.radius,
      minY: this.y - this.radius,
      maxX: this.x + this.radius,
      maxY: this.y + this.radius,
    };
  }

  public intersects(shape: Shape): boolean {
    switch (shape.tag) {
      case ShapeTag.Rectangle:
        const box = shape as Rectangle;
        return circleBox(
          this.centerX,
          this.centerY,
          this.radius,
          box.x,
          box.y,
          box.width,
          box.height
        );
      case ShapeTag.Point:
        const point = shape as Point;
        return circlePoint(
          this.centerX,
          this.centerY,
          this.radius,
          point.x,
          point.y
        );
      case ShapeTag.Circle:
        const circle = shape as Circle;
        return circleCircle(
          this.centerX,
          this.centerY,
          this.radius,
          circle.centerX,
          circle.centerY,
          circle.radius
        );
      default:
        return false;
    }
  }

  public contains(x: number, y: number): boolean {
    return circlePoint(this.centerX, this.centerY, this.radius, x, y);
  }
}
