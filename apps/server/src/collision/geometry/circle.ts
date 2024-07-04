import { Point } from './point';
import { Rectangle } from './rectangle';
import { Shape } from './shape';
import { ShapeTag } from './shape-tag';

import { circleBox, circleCircle, circlePoint } from 'intersects';

export class Circle extends Shape {
  private _radius: number = 0;

  public get radius() {
    return this._radius;
  }

  constructor(x: number, y: number, radius: number) {
    super(x, y, ShapeTag.Circle);

    this._radius = radius;

    this.calculateBBox();
  }

  protected calculateBBox(): void {
    this.setBBox(this.x - this.radius, this.y - this.radius, this.x + this.radius, this.y + this.radius);
  }

  public intersects(shape: Shape): boolean {
    switch (shape.tag) {
      case ShapeTag.Rectangle:
        const box = shape as Rectangle;
        return circleBox(this.x, this.y, this.radius, box.x, box.y, box.width, box.height);
      case ShapeTag.Point:
        const point = shape as Point;
        return circlePoint(this.x, this.y, this.radius, point.x, point.y);
      case ShapeTag.Circle:
        const circle = shape as Circle;
        return circleCircle(this.x, this.y, this.radius, circle.x, circle.y, circle.radius);
      default:
        return false;
    }
  }

  public contains(x: number, y: number): boolean {
    return circlePoint(this.x, this.y, this.radius, x, y);
  }
}
