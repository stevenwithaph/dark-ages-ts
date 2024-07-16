import { ServerPackets } from '@medenia/network';

import { MapRoom } from './map-room';
import { Client } from '../network/client';

class MapManager {
  private maps: Map<number, MapRoom> = new Map();

  async get(id: number) {
    let map = this.maps.get(id);

    if (!map) {
      map = new MapRoom();
      await map.loadMap(id);
      this.maps.set(id, map);
    }

    return map!;
  }

  async transfer(id: number, client: Client, x: number, y: number, direction: number) {
    //  TODO: we only need to send this packet if the map id is different.
    client.sendPacket(new ServerPackets.MapChangePendingPacket());

    const map = await this.get(id);
    map.addClient(client);

    client.sendPacket(new ServerPackets.MapChangeCompletePacket());
  }
}

export const mapManager = new MapManager();
