import { Service } from 'typedi';
import { MapRoom } from '../network/rooms/map-room';
import { Client } from '../network/client';
import { ServerPackets } from '@medenia/network';

@Service()
export class MapService {
  private maps: Map<number, MapRoom> = new Map();

  async get(id: number) {
    let map = this.maps.get(id);

    if (!map) {
      map = new MapRoom(this);
      await map.loadMap(id);
      this.maps.set(id, map);
    }

    return map!;
  }

  async transfer(
    id: number,
    client: Client,
    x: number,
    y: number,
    direction: number
  ) {
    client.sendPacket(new ServerPackets.MapChangePendingPacket());

    const map = await this.get(id);
    map.addPlayer(client, x, y, direction);

    client.sendPacket(new ServerPackets.MapChangeCompletePacket());
  }
}
