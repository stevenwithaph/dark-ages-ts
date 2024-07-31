import { Client } from '../network/client';
import { mapManager } from '../maps/map-manager';
import { Player } from '../scene/game-objects/player';
import { em } from '../db';
import { AislingEntity } from '../db/entities/aisling.entity';

class PlayerCache {
  #players: Map<string, Player> = new Map();

  async connect(client: Client, username: string) {
    const aisling = await em.findOne(AislingEntity, { username });

    if (!aisling) {
      client.disconnect();
      return;
    }

    //  TODO: create player with aisling display info?
    this.add(client.id, new Player(client, aisling));
    mapManager.transfer(500, client, 27, 45, 0);

    return aisling;
  }

  async disconnect(client: Client) {
    // TODO: synchronize the player here probably
    this.remove(client.id);
  }

  private add(id: string, player: Player) {
    this.#players.set(id, player);
  }

  private remove(id: string) {
    this.#players.delete(id);
  }

  get(id: string) {
    return this.#players.get(id);
  }
}

export const playerCache = new PlayerCache();
