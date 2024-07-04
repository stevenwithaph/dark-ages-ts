import { BBox } from './bbox';
import { ShapeTag } from './shape-tag';

export abstract class Shape {
  private _x: number = 0;
  private _y: number = 0;

  private _tag: ShapeTag;

  private _bbox: BBox;

  public get x() {
    return this._x;
  }

  public get y() {
    return this._y;
  }

  public get tag() {
    return this._tag;
  }

  public get bbox() {
    return this._bbox;
  }

  constructor(x: number, y: number, tag: ShapeTag) {
    this._tag = tag;
    this.setPosition(x, y);
  }

  public abstract intersects(shape: Shape): boolean;
  public abstract contains(x: number, y: number): boolean;

  protected abstract calculateBBox(): void;

  public setPosition(x: number, y: number) {
    this._x = x;
    this._y = y;

    this.calculateBBox();
  }

  protected setBBox(minX: number, minY: number, maxX: number, maxY: number) {
    this._bbox = {
      minX,
      minY,
      maxX,
      maxY,
    };
  }
}
