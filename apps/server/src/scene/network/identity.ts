import { Packet } from '@medenia/network';
import { Peer } from './peer';
import EventEmitter from 'eventemitter3';

export enum IdentityEvents {
  ObserverAdded = 'ObserverAdded',
  ObserverRemoved = 'ObserverRemoved',
}

export class Identity extends EventEmitter<IdentityEvents> {
  private _observers: Set<Peer>;
  private _networkId: number = 0;

  get networkId() {
    return this._networkId;
  }

  set networkId(value: number) {
    this._networkId = value;
  }

  constructor() {
    super();

    this._observers = new Set();
  }

  broadcast(packet: Packet, self: boolean = true) {
    for (const observer of this._observers) {
      if (!self && observer.id === this._networkId) continue;
      observer.send(packet);
    }
  }

  addObserver(peer: Peer) {
    this.emit(IdentityEvents.ObserverAdded, peer);

    this._observers.add(peer);
  }

  removeObserver(peer: Peer) {
    this.emit(IdentityEvents.ObserverRemoved, peer);

    this._observers.delete(peer);
  }
}
