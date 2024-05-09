import { Constructor } from 'type-fest';
import { Packet } from '@medenia/network';
import { Client } from './client';

export class ClientHandler {
  protected clients: Map<string, Client> = new Map();

  protected handlerMap: Map<Function, Function> = new Map();

  constructor() {
    this.registerHandlers();
  }

  private registerHandlers(): void {
    const handlers = Reflect.getMetadata('handlers', this);
    if (handlers !== undefined) {
      for (let i = 0; i < handlers.length; i++) {
        this.registerHandler(handlers[i].packet, handlers[i].func);
      }
    }
  }

  registerHandler(packet: Constructor<Packet>, func: any): void {
    this.handlerMap.set(packet, func);
  }

  addClient(client: Client) {
    this.clients.set(client.id, client);
    client.on('packet', this.onPacket, this);
    client.once('disconnect', this.onClientDisconnect, this);
  }

  private onPacket(packet: Packet, client: Client) {
    const handler = this.handlerMap.get(packet.constructor);
    handler?.call(this, client, packet);
  }

  protected onClientDisconnect(client: Client) {
    this.removeClient(client);
  }

  removeClient(client: Client) {
    this.clients.delete(client.id);
    client.off('packet', this.onPacket);
  }
}
