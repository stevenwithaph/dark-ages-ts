import * as fs from 'fs/promises';
import { ServerPackets, ClientPackets } from '@medenia/network';

import { Room } from './room';
import { Client } from '../client';
import { PacketHandler } from '../packet-handler';
import { Aisling } from '../../game-objects/aisling';
import { MapService } from '../../services/map-service';

import { Actor } from '../../game-objects/actor';
import { SpatialHashGrid } from '../../game-objects/map/spatial-hash-grid';
import { InterestArea } from '../../game-objects/areas/interest-area';

let rollingId = 1;

export class MapRoom extends Room {
  protected mapData: Uint16Array = new Uint16Array();
  protected width: number = 0;
  protected height: number = 0;

  protected aislings: Map<string, Aisling> = new Map();
  protected entities: Map<number, Actor> = new Map();

  protected spatialHashGrid: SpatialHashGrid;

  constructor(public maps: MapService) {
    super();

    this.spatialHashGrid = new SpatialHashGrid(100, 100, 100);
  }

  async loadMap(id: number) {
    this.mapData = new Uint16Array(
      (await fs.readFile(`./data/map-data/lod${id}.map`)).buffer
    );
    this.width = 100;
    this.height = 100;
  }

  addPlayer(client: Client, x: number, y: number, direction: number) {
    this.addClient(client);
    const playerId = rollingId++;

    client.networkId = playerId;

    client.sendPacket(
      new ServerPackets.MapInfoPacket(
        1,
        this.width,
        this.height,
        0,
        0,
        'map name'
      )
    );

    client.sendPacket(new ServerPackets.LocationPacket(x, y));
    client.sendPacket(new ServerPackets.UserIdPacket(client.networkId, 0, 1));

    client.sendPacket(new ServerPackets.SoundPacket(true, 3));

    const aisling = new Aisling(client, this.spatialHashGrid);
    aisling.addArea(new InterestArea(x, y, client, this.spatialHashGrid));

    aisling.setPosition(x, y);

    this.aislings.set(client.id, aisling);
  }

  removeClient(client: Client) {
    super.removeClient(client);

    const aisling = this.aislings.get(client.id);

    if (aisling) {
      this.aislings.delete(client.id);
      aisling.destroy();
    }
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
    const aisling = this.aislings.get(client.id);
    if (!aisling) return;

    aisling.playAnimation(1, 30);
  }

  @PacketHandler(ClientPackets.ClientWalkPacket)
  onClientWalk(client: Client, packet: ClientPackets.ClientWalkPacket) {
    const aisling = this.aislings.get(client.id);
    if (!aisling) return;

    aisling.move(packet.direction);
  }

  @PacketHandler(ClientPackets.ClientTurnPacket)
  onClientTurn(client: Client, packet: ClientPackets.ClientTurnPacket) {
    const aisling = this.aislings.get(client.id);
    if (!aisling) return;

    aisling.turn(packet.direction);
  }
}
