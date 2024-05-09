import { Client } from '../../network/client';
import { NetworkedGameObject } from '../networked-game-object';
import { Area } from './area';
import { EntityTypes } from '../entity-types';
import { SpatialHashGrid } from '../map/spatial-hash-grid';
import { Circle } from '../../geometry/circle';

export class InterestArea extends Area {
  public get layer(): EntityTypes {
    return EntityTypes.AREA;
  }
  public get mask(): EntityTypes {
    return EntityTypes.AISLING | EntityTypes.MONSTER;
  }
  constructor(
    x: number,
    y: number,
    private client: Client,
    grid: SpatialHashGrid
  ) {
    super(new Circle(x, y, 30), grid);
  }

  public onEntityEntered(entity: NetworkedGameObject) {
    super.onEntityEntered(entity);
    entity.addObserver(this.client);
  }

  public onEntityExited(entity: NetworkedGameObject) {
    super.onEntityExited(entity);
    entity.removeObserver(this.client);
  }
}
