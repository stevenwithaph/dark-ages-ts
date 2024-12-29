import { Client } from '../network/client';
import { mapManager } from '../maps/map-manager';
import { Player } from '../scene/game-objects/player';
import { AislingEntity } from '../database/entities/aisling.entity';
import { AttributeFlags, ServerPackets } from '@medenia/network';

export module PlayerCache {
  const players: Map<string, Player> = new Map();

  export async function connect(client: Client, username: string) {
    const aisling = await AislingEntity.findOneBy({ username });

    if (!aisling) {
      client.disconnect();
      return;
    }

    const player = new Player(0, 0, client, aisling);

    player.inventory.insert(1, {});
    player.spells.insert(1, {});
    player.skills.insert(1, {});
    player.equipment.insert(1, {});

    const attributes = new ServerPackets.AttributesPacket(AttributeFlags.Full);
    attributes.primary = {
      str: 3,
      dex: 3,
      wiz: 3,
      con: 3,
      int: 3,
      level: 1,
      ability: 0,
      maxHp: 500,
      maxMp: 500,
      maxWeight: 0,
      currentWeight: 0,
      points: 0,
    };
    attributes.current = {
      hp: 500,
      mp: 500,
    };
    attributes.currency = {
      totalExP: 0,
      nextLevel: 1000,
      nextAbility: 100,
      totalAbility: 100,
      gamePoints: 200,
      gold: 205,
    };
    attributes.secondary = {
      blind: 0,
      mail: 0,
      offenseElement: 2,
      defenseElement: 2,
      ac: 12,
      dmg: 13,
      hit: 14,
    };

    player.peer.client.sendPacket(attributes);

    add(client.id, player);
    mapManager.transfer('mileth-inn', player, 6, 6, 2);

    return aisling;
  }

  export async function disconnect(client: Client) {
    // TODO: synchronize the player here probably
    remove(client.id);
  }

  function add(id: string, player: Player) {
    players.set(id, player);
  }

  function remove(id: string) {
    players.delete(id);
  }

  export function get(id: string) {
    return players.get(id);
  }
}
