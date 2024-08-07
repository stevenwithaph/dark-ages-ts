import { CreatureType, ServerPackets } from '@medenia/network';
import { Peer } from '../network/peer';
import { MapEntity } from './map-entity';
import { EntityTypes } from '../entity-types';

export class Monster extends MapEntity {
  constructor(x: number, y: number) {
    super(x, y, 'monster');

    this.layer = EntityTypes.MONSTER;
    this.mask = EntityTypes.AREA;
  }

  protected onObserverAdded(peer: Peer): void {
    super.onObserverAdded(peer);

    //  TODO: We can send over all visible entities in a single movement
    peer.send(
      new ServerPackets.DisplayVisibleEntitiesPacket([
        { id: this.identity.networkId, x: this.x, y: this.y, direction: this.direction, spriteId: 0x4002, creatureType: CreatureType.Hostile, name: 'tester' },
      ])
    );
  }
}
