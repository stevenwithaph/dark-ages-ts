import { ChatMessageType, ServerPackets } from '@medenia/network';
import { Identity, IdentityEvents } from '../network/identity';
import { Peer } from '../network/peer';
import { ColliderNode } from '../physics/collider-node';
import { Point } from '../../collision/geometry/point';

export abstract class MapEntity extends ColliderNode {
  private _identity: Identity;
  private _direction: number = 0;
  private _observers: Set<Peer> = new Set();

  private _name: string = '';

  public get name() {
    return this._name;
  }

  get identity() {
    return this._identity;
  }

  get direction() {
    return this._direction;
  }

  constructor(x: number, y: number, name: string) {
    super(x, y, new Point());

    this._name = name;

    this._identity = new Identity();
    this._identity.on(IdentityEvents.ObserverAdded, this.onObserverAdded, this);
    this._identity.on(IdentityEvents.ObserverRemoved, this.onObserverRemoved, this);
  }

  moveInDirection(direction: number) {
    this._direction = direction;
    this.identity.broadcast(new ServerPackets.CreatureWalkPacket(this.identity.networkId, this.x, this.y, this.direction), false);

    let offsetX = 0;
    let offsetY = 0;

    switch (direction) {
      case 0:
        offsetY--;
        break;
      case 1:
        offsetX++;
        break;
      case 2:
        offsetY++;
        break;
      case 3:
        offsetX--;
        break;
    }

    this.setPosition(this.x + offsetX, this.y + offsetY);
  }

  setDirection(direction: number) {
    this._direction = direction;
  }

  turn(direction: number) {
    this._direction = direction;

    this.identity.broadcast(new ServerPackets.CreatureTurnPacket(this.identity.networkId, direction), false);
  }

  say(message: string) {
    this.identity.broadcast(new ServerPackets.ChatMessagePacket(ChatMessageType.Normal, this.identity.networkId, `${this.name}: ${message}`));
  }

  animate(id: number, duration: number) {
    this.identity.broadcast(new ServerPackets.BodyAnimationPacket(this.identity.networkId, id, duration));
  }

  health() {
    this.identity.broadcast(new ServerPackets.HealthBarPacket(this.identity.networkId, 25));
  }

  useSkill(skillId: number) {}

  protected onObserverAdded(peer: Peer) {
    this._observers.add(peer);
  }

  protected onObserverRemoved(peer: Peer) {
    this._observers.delete(peer);
    peer.send(new ServerPackets.RemoveObjectPacket(this.identity.networkId));
  }
}
