import { ServerPackets, ClientPackets, AttributeFlags } from '@medenia/network';

import { Room } from '../network/room';
import { Client } from '../network/client';
import { PacketHandler } from '../network/packet-handler';
import { MapEntity } from '../scene/game-objects/map-entity';
import { Player } from '../scene/game-objects/player';
import { SceneTree } from '../scene/scene-tree';

import { UniqueId } from '../utils/unique-id';
import { TransferArea } from '../scene/game-objects/transfer-area';
import { Point } from '../collision/geometry/point';
import { MapResource } from './map-resource';

export class MapRoom extends Room {
  protected resource: MapResource;

  protected players: Map<string, Player> = new Map();
  protected entities: Map<number, MapEntity> = new Map();

  protected scene: SceneTree;

  protected id: UniqueId;

  constructor(resource: MapResource) {
    super();

    this.resource = resource;

    this.scene = new SceneTree(resource.info.width, resource.info.height);
    this.id = new UniqueId();

    this.createTransfers();
  }

  createTransfers() {
    for (const transfer of this.resource.info.transfers) {
      let width = (transfer.endX ?? transfer.startX) - transfer.startX;
      let height = (transfer.endY ?? transfer.startY) - transfer.startY;

      const area = new TransferArea(
        transfer.startX + width / 2,
        transfer.startY + height / 2,
        width + 1,
        height + 1,
        transfer.zone,
        transfer.zoneX,
        transfer.zoneY,
        transfer.direction
      );
      area.nodeName = transfer.zone;
      this.scene.addChild(area);
    }
  }

  addPlayer(player: Player, x: number, y: number, direction: number) {
    this.addClient(player.peer.client);
    player.map = this;
    player.networkId = this.id.next();
    player.setPosition(x, y);
    player.setDirection(direction);

    this.players.set(player.peer.client.id, player);

    player.peer.client.sendPacket(
      new ServerPackets.MapInfoPacket(this.resource.info.id, this.resource.info.width, this.resource.info.height, 0, 0, this.resource.info.name)
    );

    player.peer.client.sendPacket(new ServerPackets.LocationPacket(x, y));
    player.peer.client.sendPacket(new ServerPackets.UserIdPacket(player.networkId, player.direction, 1));

    player.peer.client.sendPacket(new ServerPackets.SoundPacket(true, this.resource.info.music));

    this.scene.addChild(player);
  }

  removePlayer(player: Player) {
    this.removeClient(player.peer.client);
  }

  removeClient(client: Client) {
    super.removeClient(client);

    const player = this.players.get(client.id);
    if (!player) return;

    this.players.delete(client.id);
    this.id.free(player.identity.networkId);

    this.scene.removeChild(player);
  }

  @PacketHandler(ClientPackets.RequestMapDataPacket)
  onRequestMapData(client: Client) {
    for (let i = 0; i < this.resource.info.height; i++) {
      const start = this.resource.info.width * i * 3;
      const data = this.resource.data.subarray(start, start + this.resource.info.width * 3);

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
    aisling?.moveInDirection(packet.direction);
  }

  @PacketHandler(ClientPackets.ClientTurnPacket)
  onClientTurn(client: Client, packet: ClientPackets.ClientTurnPacket) {
    const aisling = this.players.get(client.id);
    aisling?.setDirection(packet.direction);
  }

  @PacketHandler(ClientPackets.ChatMessagePacket)
  onClientMessage(client: Client, packet: ClientPackets.ChatMessagePacket) {
    const aisling = this.players.get(client.id);
    aisling?.say(packet.message);
  }
}
