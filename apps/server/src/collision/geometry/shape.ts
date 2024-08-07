export abstract class Shape {
  public get width(): number {
    return this._width;
  }

  public get height(): number {
    return this._height;
  }

  public abstract get tag(): number;

  protected _width: number;
  protected _height: number;
}
