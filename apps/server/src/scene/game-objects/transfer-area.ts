import { Rectangle } from '../../collision/geometry/rectangle';
import { Shape } from '../../collision/geometry/shape';
import { mapManager } from '../../maps/map-manager';
import { EntityTypes } from '../entity-types';
import { CollisionObject, CollisionObjectEvents } from '../physics/collision-object';
import { Player } from './player';

export class TransferArea extends CollisionObject {
  constructor(
    width: number,
    height: number,
    private zone: string,
    private zoneX: number,
    private zoneY: number,
    private direction?: number
  ) {
    super(new Rectangle(0, 0, width, height));

    this.layer = EntityTypes.AISLING_AREA;
    this.mask = EntityTypes.AISLING;

    this.on(CollisionObjectEvents.CollisionEnter, this.onEntityEnter, this);
    this.on(CollisionObjectEvents.CollisionExit, this.onEntityExit, this);
  }

  onEntityEnter(player: Player) {
    mapManager.transfer(this.zone, player, this.zoneX, this.zoneY, this.direction ?? player.direction);
  }

  onEntityExit() {}
}
