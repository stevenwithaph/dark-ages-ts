import { Shape } from '../geometry/shape';
import { v4 } from 'uuid';
import { Area } from './areas/area';
import { SpatialEntity } from './map/spatial-entity';
import { SpatialHashGrid } from './map/spatial-hash-grid';

export abstract class GameObject extends SpatialEntity {
  public id: string = v4();

  protected _areas: Area[] = [];

  constructor(shape: Shape, grid: SpatialHashGrid) {
    super(shape, grid);
  }

  public addArea(area: Area) {
    this._areas.push(area);
  }

  public setPosition(tileX: number, tileY: number): void {
    super.setPosition(tileX, tileY);

    for (const area of this._areas) {
      area.setPosition(tileX, tileY);
    }
  }

  public removeArea(area: Area) {
    if (this._areas.length > 1) {
      const index = this._areas.indexOf(area);
      const swapper = this._areas[index];
      const swappee = this._areas[this._areas.length - 1];

      this._areas[index] = swappee;
      this._areas[this._areas.length - 1] = swapper;
    }

    this._areas.pop();
  }

  public move(direction: number): void {
    let offsetX = 0;
    let offsetY = 0;
    if (direction === 0) {
      offsetY--;
    } else if (direction === 1) {
      offsetX++;
    } else if (direction === 2) {
      offsetY++;
    } else if (direction === 3) {
      offsetX--;
    }

    this.setPosition(this.x + offsetX, this.y + offsetY);
  }

  public destroy(): void {
    super.destroy();

    for (const area of this._areas) {
      area.destroy();
    }
  }
}
