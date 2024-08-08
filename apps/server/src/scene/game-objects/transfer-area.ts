import { Rectangle } from '../../collision/geometry/rectangle';
import { mapManager } from '../../maps/map-manager';
import { EntityTypes } from '../entity-types';
import { ColliderNode, ColliderNodeEvents } from '../physics/collider-node';
import { Player } from './player';

export class TransferArea extends ColliderNode {
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    private zone: string,
    private zoneX: number,
    private zoneY: number,
    private direction?: number
  ) {
    super(x, y, new Rectangle(width, height));

    this.layer = EntityTypes.AISLING_AREA;
    this.mask = EntityTypes.AISLING;

    this.on(ColliderNodeEvents.CollisionEnter, this.onEntityEnter, this);

    //TODO: create subarea that will start a timer to move the player bween zones
    //TODO: could we just transfer entities instead? let enemies chase players between zones?
  }

  onEntityEnter(player: Player) {
    mapManager.transfer(this.zone, player, this.zoneX, this.zoneY, this.direction ?? player.direction);
  }
}
