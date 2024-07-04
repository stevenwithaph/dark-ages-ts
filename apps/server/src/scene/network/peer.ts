import { Packet } from '@medenia/network';
import { Client } from '../../network/client';

export class Peer {
  private _id: number = 0;
  private _client: Client;

  get id() {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get client() {
    return this._client;
  }

  constructor(client: Client) {
    this._client = client;
  }

  send(packet: Packet) {
    this._client.sendPacket(packet);
  }
}
