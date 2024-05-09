import { pointBox, pointCircle } from 'intersects';
import { Rectangle } from './rectangle';
import { Shape } from './shape';
import { ShapeTag } from './shape-tag';
import { BBox } from './bbox';
import { Circle } from './circle';

export class Point extends Shape {
  private _bbox!: BBox;

  public get bbox() {
    return this._bbox;
  }

  constructor(x: number, y: number) {
    super(x, y, ShapeTag.Point);

    this.calculateBBox();
  }

  protected calculateBBox(): void {
    this._bbox = {
      minX: this.x,
      minY: this.y,
      maxX: this.x,
      maxY: this.y,
    };
  }

  public intersects(shape: Shape): boolean {
    switch (shape.tag) {
      case ShapeTag.Rectangle:
        const box = shape as Rectangle;
        return pointBox(this.x, this.y, box.x, box.y, box.width, box.height);
      case ShapeTag.Point:
        const point = shape as Point;
        return this.x === point.x && this.y === point.y;
      case ShapeTag.Circle:
        const circle = shape as Circle;
        return pointCircle(
          this.x,
          this.y,
          circle.centerX,
          circle.centerY,
          circle.radius
        );
      default:
        return false;
    }
  }

  public contains(x: number, y: number): boolean {
    return this.x === x && this.y === y;
  }
}
