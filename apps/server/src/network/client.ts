import EventEmitter from 'eventemitter3';
import { ClientCrypto, ServerCrypto } from '@medenia/encryption';

import {
  ClientPacketFactory,
  Packet,
  PacketEncoder,
  PacketPayload,
  ServerPacketFactory,
} from '@medenia/network';
import { Socket } from './servers/socket';

type ClientEvents = {
  packet: (packet: Packet, client: Client) => void;
  error: (error: Error, client: Client) => void;
  disconnect: (client: Client) => void;
};

export class Client extends EventEmitter<ClientEvents> {
  private readonly crypto: ClientCrypto;

  public networkId: number = 0;

  public get key() {
    return this.crypto.key;
  }

  public set key(value: string) {
    this.crypto.key = value;
  }

  public get seed() {
    return this.crypto.seed;
  }

  public set seed(value: number) {
    this.crypto.seed = value;
  }

  public get keySalts() {
    return this.crypto.keySalts;
  }

  public set keySalts(value: string) {
    this.crypto.keySalts = value;
  }

  constructor(
    public id: string,
    private socket: Socket
  ) {
    super();
    this.crypto = new ServerCrypto(0);

    socket.on('data', this.onData, this);
    socket.on('disconnect', this.onDisconnect, this);
  }

  protected onData(buffer: Uint8Array) {
    const packets = PacketEncoder.decode(
      buffer,
      ClientPacketFactory,
      this.crypto
    );

    for (const packet of packets) {
      this.emit('packet', packet, this);
    }
  }

  protected onError(error: Error) {
    console.log(error);
  }

  protected onDisconnect() {
    this.emit('disconnect', this);
  }

  sendPacket(packet: Packet) {
    const payload = ServerPacketFactory.serialize(packet);
    if (!payload) return;
    this.send(payload);
  }

  send(payload: PacketPayload) {
    const buffer = PacketEncoder.encode(payload, this.crypto);
    this.socket.send(buffer);
  }
}
