import { CreatureType, ServerPackets } from '@medenia/network';
import { Actor } from './actor';
import { EntityTypes } from './entity-types';

export class Monster extends Actor {
  public get layer(): EntityTypes {
    return EntityTypes.MONSTER;
  }
  public get mask(): EntityTypes {
    return EntityTypes.AREA;
  }
  public createDisplay() {
    return new ServerPackets.DisplayVisibleEntitiesPacket([
      {
        x: this.shape.x,
        y: this.shape.y,
        id: this.networkId,
        spriteId: 0x4016,
        direction: this.direction,
        creatureType: CreatureType.Hostile,
        name: '',
      },
    ]);
  }
}
