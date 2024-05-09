import {
  Packet,
  PacketPayload,
  ServerPacketFactory,
  ServerPackets,
} from '@medenia/network';
import { Client } from '../network/client';
import { GameObject } from './game-object';
import { Shape } from '../geometry/shape';
import { SpatialHashGrid } from './map/spatial-hash-grid';

export abstract class NetworkedGameObject extends GameObject {
  protected observers: Set<Client> = new Set();

  constructor(
    shape: Shape,
    public networkId: number,
    grid: SpatialHashGrid
  ) {
    super(shape, grid);
  }

  public addObserver(client: Client) {
    this.observers.add(client);

    client.sendPacket(this.createDisplay());
  }

  public removeObserver(client: Client) {
    this.observers.delete(client);

    client.sendPacket(new ServerPackets.RemoveObjectPacket(this.networkId));
  }

  public abstract createDisplay(): Packet;

  protected broadcast(packet: Packet, self: boolean = true) {
    /*const payload = ServerPacketFactory.serialize(packet);
    if (!payload) return;

    this.broadcastPayload(payload, self);*/

    for (const observer of this.observers) {
      if (!self && observer.networkId === this.networkId) continue;
      observer.sendPacket(packet);
    }
  }

  protected broadcastPayload(payload: PacketPayload, self: boolean = false) {
    for (const observer of this.observers) {
      if (!self && observer.networkId === this.networkId) continue;
      observer.send(payload);
    }
  }

  public playSound(soundId: number) {
    this.broadcast(new ServerPackets.SoundPacket(false, soundId));
  }
}
