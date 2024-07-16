import { prisma } from '../db';
import { Client } from '../network/client';
import { mapManager } from '../maps/map-manager';
import { Player } from '../scene/game-objects/player';

class PlayerCache {
  #players: Map<string, Player> = new Map();

  async connect(client: Client, username: string) {
    const aisling = await prisma.aisling.findFirst({
      where: {
        username: username.toLowerCase(),
      },
    });

    if (!aisling) {
      client.disconnect();
      return;
    }

    //  TODO: create player with aisling display info?
    this.add(client.id, new Player(client));
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
