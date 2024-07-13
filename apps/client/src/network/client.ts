import { Events } from 'phaser';
import { Constructor } from 'type-fest';

import { ClientCrypto } from '@medenia/encryption';
import { ClientPacketFactory, ClientPackets, Packet, PacketEncoder, PacketPayload, Redirect, ServerPacketFactory } from '@medenia/network';

const ACK_TIMEOUT = 10000;

export class Client extends Events.EventEmitter {
  private ws?: WebSocket;

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

  private crypto: ClientCrypto;

  constructor() {
    super();
    this.crypto = new ClientCrypto(0);
  }

  connect(address: string, port: number) {
    return new Promise<void>((resolve) => {
      console.log(import.meta.env);
      console.log(`${import.meta.env.PROTOCOL}://${address}:${port + 100}`);
      this.ws = new WebSocket(`${import.meta.env.VITE_PROTOCOL}://${address}:${port + 100}`);
      this.ws.onmessage = this.onMessage.bind(this);
      this.ws.onopen = this.onConnected.bind(this);
      this.ws.onclose = this.onDisconnected.bind(this);

      this.once('connected', resolve);
    });
  }

  async redirect(adress: string, port: number, redirect: Redirect) {
    return new Promise<void>(async (resolve) => {
      this.disconnect();
      await this.connect(adress, port);

      this.send(new ClientPackets.ClientRedirectedPacket(redirect));
      this.emit('redirected');
      resolve();
    });
  }

  disconnect() {
    this.ws?.close();
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

  async awaitEvent(event: string) {
    return new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject('timeout');
        this.off(event, listener);
      }, ACK_TIMEOUT);

      const listener = () => {
        resolve();
        clearTimeout(timeout);
      };

      this.once(event, listener);
    });
  }

  send(packet: Packet) {
    const payload = ClientPacketFactory.serialize(packet);
    if (!payload) return;
    this.sendPayload(payload);
  }

  sendPayload(payload: PacketPayload) {
    const buffer = PacketEncoder.encode(payload, this.crypto);
    this.ws?.send(buffer);
  }

  sendWithAck<T extends Packet>(packet: Packet, ackPacket: Constructor<T>): Promise<T> {
    this.send(packet);

    return this.await(ackPacket);
  }

  private async onMessage(ev: MessageEvent<Blob>) {
    const buffer = await ev.data.arrayBuffer();
    const data = new Uint8Array(buffer);

    const packets = PacketEncoder.decode(data, ServerPacketFactory, this.crypto);

    for (const packet of packets) {
      this.emitPacket(packet);
    }
  }

  private onConnected() {
    this.emit('connected');
  }

  private onDisconnected() {
    this.emit('disconnected');
  }

  private emitPacket(packet: Packet) {
    this.emit(packet.constructor.name, packet);
  }
}
