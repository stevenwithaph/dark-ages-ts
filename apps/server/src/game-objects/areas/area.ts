import { Shape } from '../../geometry/shape';
import { GameObject } from '../game-object';
import { SpatialHashGrid } from '../map/spatial-hash-grid';

export abstract class Area extends GameObject {
  constructor(shape: Shape, grid: SpatialHashGrid) {
    super(shape, grid);
  }
}
