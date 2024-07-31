import { ServerPackets, ClientPackets, AttributeFlags } from '@medenia/network';

import { Room } from '../network/room';
import { Client } from '../network/client';
import { PacketHandler } from '../network/packet-handler';
import { MapEntity } from '../scene/game-objects/map-entity';
import { Player } from '../scene/game-objects/player';
import { SceneTree } from '../scene/scene-tree';

import { UniqueId } from '../utils/unique-id';
import { playerCache } from '../services/player-cache';
import { mapLoader } from './map-loader';

export class MapRoom extends Room {
  protected mapData: Uint16Array = new Uint16Array();
  protected width: number = 0;
  protected height: number = 0;

  protected players: Map<string, Player> = new Map();
  protected entities: Map<number, MapEntity> = new Map();

  protected scene: SceneTree;

  protected id: UniqueId;

  constructor() {
    super();

    this.scene = new SceneTree();
    this.id = new UniqueId();
  }

  async loadMap(id: number) {
    this.width = 100;
    this.height = 100;
    this.mapData = await mapLoader.get(id);
  }

  addClient(client: Client): void {
    super.addClient(client);

    const player = playerCache.get(client.id);

    if (player) {
      this.addPlayer(player, 25, 47, 0);
    } else {
      this.removeClient(client);
    }
  }

  addPlayer(player: Player, x: number, y: number, direction: number) {
    player.networkId = this.id.next();
    player.setPosition(x, y);
    player.turn(direction);

    this.players.set(player.peer.client.id, player);

    player.peer.client.sendPacket(new ServerPackets.MapInfoPacket(0, this.width, this.height, 0, 0, 'map name'));

    player.peer.client.sendPacket(new ServerPackets.LocationPacket(x, y));
    player.peer.client.sendPacket(new ServerPackets.UserIdPacket(player.networkId, 0, 1));

    player.peer.client.sendPacket(new ServerPackets.SoundPacket(true, 3));

    player.inventory.insert(1, {});
    player.spells.insert(1, {});
    player.skills.insert(1, {});
    player.equipment.insert(1, {});

    const attributes = new ServerPackets.AttributesPacket(AttributeFlags.Full);
    attributes.primary = {
      str: 1,
      dex: 1,
      wiz: 1,
      con: 1,
      int: 1,
      level: 5,
      ability: 0,
      maxHp: 100,
      maxMp: 100,
      maxWeight: 100,
      currentWeight: 0,
      hasPoints: true,
      points: 12,
    };
    attributes.current = {
      currentHp: 100,
      currentMp: 100,
    };
    attributes.currency = {
      totalExP: 500,
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

    this.scene.addChild(player);
  }

  removeClient(client: Client) {
    super.removeClient(client);

    const player = this.players.get(client.id);
    if (!player) return;

    this.players.delete(client.id);
    this.scene.removeChild(player);
    this.id.free(player.identity.networkId);
  }

  @PacketHandler(ClientPackets.RequestMapDataPacket)
  onRequestMapData(client: Client) {
    for (let i = 0; i < this.height; i++) {
      const start = this.width * i * 3;
      const data = this.mapData.subarray(start, start + this.width * 3);

      client.sendPacket(new ServerPackets.MapDataPacket(i, data));
    }
  }

  @PacketHandler(ClientPackets.DefaultAttackPacket)
  onDefaultAttack(client: Client) {
    const aisling = this.players.get(client.id);
    aisling?.animate(1, 15);
  }

  @PacketHandler(ClientPackets.ClientWalkPacket)
  onClientWalk(client: Client, packet: ClientPackets.ClientWalkPacket) {
    const aisling = this.players.get(client.id);
    aisling?.move(packet.direction);
  }

  @PacketHandler(ClientPackets.ClientTurnPacket)
  onClientTurn(client: Client, packet: ClientPackets.ClientTurnPacket) {
    const aisling = this.players.get(client.id);
    aisling?.turn(packet.direction);
  }

  @PacketHandler(ClientPackets.ChatMessagePacket)
  onClientMessage(client: Client, packet: ClientPackets.ChatMessagePacket) {
    const aisling = this.players.get(client.id);
    aisling?.say(packet.message);
  }
}
