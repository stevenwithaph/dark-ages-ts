import { BBox } from './bbox';
import { ShapeTag } from './shape-tag';

export abstract class Shape {
  protected _x: number = 0;
  protected _y: number = 0;

  protected _originX: number = 0.5;
  protected _originY: number = 0.5;

  public get x() {
    return this._x;
  }

  public get y() {
    return this._y;
  }

  public get originX() {
    return this._originX;
  }

  public get originY() {
    return this._originY;
  }

  public get tag(): ShapeTag {
    return this._tag;
  }

  public abstract get bbox(): BBox;

  constructor(
    x: number,
    y: number,
    private _tag: ShapeTag
  ) {
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

  public setOrigin(x: number, y: number) {
    this._originX = x;
    this._originY = y;
  }
}
