import { ServerPackets } from '@medenia/network';

import { MapRoom } from './map-room';
import { Client } from '../network/client';
import { mapLoader } from './map-loader';
import { Player } from '../scene/game-objects/player';

class MapManager {
  private maps: Map<string, MapRoom> = new Map();

  async get(name: string) {
    let map = this.maps.get(name);

    if (!map) {
      const resource = await mapLoader.get(name);
      map = new MapRoom(resource);
      this.maps.set(name, map);
    }

    return map!;
  }

  async transfer(name: string, player: Player, x: number, y: number, direction: number) {
    player.map?.removePlayer(player);

    //  TODO: we only need to send this packet if the map id is different.
    player.peer.send(new ServerPackets.MapChangePendingPacket());

    const map = await this.get(name);
    map.addPlayer(player, x, y, direction);

    player.peer.send(new ServerPackets.MapChangeCompletePacket());
  }
}

export const mapManager = new MapManager();
