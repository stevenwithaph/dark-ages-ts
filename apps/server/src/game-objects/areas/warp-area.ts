import { EntityTypes } from '../entity-types';
import { SpatialEntity } from '../map/spatial-entity';
import { Area } from './area';

export class WarpArea extends Area {
  public get layer(): EntityTypes {
    return EntityTypes.AREA;
  }
  public get mask(): EntityTypes {
    return EntityTypes.AISLNG_AREA;
  }

  public onEntityEntered(entity: SpatialEntity): void {
    throw new Error('Method not implemented.');
  }
  public onEntityExited(entity: SpatialEntity): void {
    throw new Error('Method not implemented.');
  }
}
