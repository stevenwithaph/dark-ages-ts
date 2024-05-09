import EventEmitter from 'eventemitter3';
import { BBox } from '../../geometry/bbox';
import { Shape } from '../../geometry/shape';
import { CellNode, SpatialHashGrid } from './spatial-hash-grid';
import { EntityTypes } from '../entity-types';

export abstract class SpatialEntity extends EventEmitter {
  public abstract get layer(): EntityTypes;

  public abstract get mask(): EntityTypes;

  public get x() {
    return this.shape.x;
  }

  public get y() {
    return this.shape.y;
  }

  protected collisions: Set<SpatialEntity> = new Set();

  cells: CellNode[][] = [];
  queryId: number = 0;
  bounds: BBox = {
    minX: 0,
    minY: 0,
    maxX: 0,
    maxY: 0,
  };

  constructor(
    public shape: Shape,
    private grid: SpatialHashGrid
  ) {
    super();

    this.grid.insert(this);
  }

  public setPosition(x: number, y: number) {
    this.shape.setPosition(x, y);

    this.checkCollision();
  }

  public checkCollision() {
    const entities = this.grid.query(this.shape, this.mask);
    const removed: SpatialEntity[] = [];
    for (const entity of entities) {
      if (!this.collisions.has(entity)) {
        this.onEntityEntered(entity);
        entity.onEntityEntered(this);
      }
    }

    for (const entity of this.collisions) {
      if (!entities.has(entity)) {
        removed.push(entity);
      }
    }

    for (const remove of removed) {
      this.onEntityExited(remove);
      remove.onEntityExited(this);
    }
  }

  public onEntityEntered(entity: SpatialEntity) {
    this.collisions.add(entity);
  }

  public onEntityExited(entity: SpatialEntity) {
    this.collisions.delete(entity);
  }

  public destroy() {
    this.grid.remove(this);

    for (const colliders of this.collisions) {
      colliders.onEntityExited(this);
    }
  }
}
