import EventEmitter from 'eventemitter3';

import { ClientCrypto, ServerCrypto } from '@medenia/encryption';
import { ClientPacketFactory, Packet, PacketEncoder, PacketPayload, ServerPacketFactory } from '@medenia/network';

import { Socket } from './servers/socket';
import { Socket as RealTcpSocket } from 'net';
import { Constructor } from 'type-fest';
import { TcpSocket } from './servers/tcp/tcp-socket';

const ACK_TIMEOUT = 5000;

export class Client extends EventEmitter {
  public readonly crypto: ClientCrypto;

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
    this.crypto = new ClientCrypto(0);

    socket.on('data', this.onData, this);
    socket.on('disconnect', this.onDisconnect, this);
  }

  protected onData(buffer: Uint8Array) {
    const packets = PacketEncoder.decode(buffer, ServerPacketFactory, this.crypto);

    for (const packet of packets) {
      this.emit('packet', packet, this);
      console.log(packet.constructor.name);
      this.emit(packet.constructor.name, packet, this);
    }
  }

  protected onError(error: Error) {}

  protected onDisconnect() {
    this.emit('disconnect', this);
  }

  async await<T extends Packet>(packet: Constructor<T>) {
    return new Promise<T>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject('timeout');
        this.off(packet.name, listener);
      }, ACK_TIMEOUT);

      const listener = (packet: T) => {
        resolve(packet);
        clearTimeout(timeout);
      };
      this.once(packet.name, listener);
    });
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

  disconnect() {
    this.socket.disconnect();
  }

  connect(ip: string, port: number) {
    const socket = new RealTcpSocket();
    this.socket = new TcpSocket(socket);
  }
}
