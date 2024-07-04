import { ChatMessageType, ServerPackets } from '@medenia/network';
import { Identity, IdentityEvents } from '../network/identity';
import { Peer } from '../network/peer';
import { CollisionObject } from '../physics/collision-object';
import { Point } from '../../collision/geometry/point';

export abstract class MapEntity extends CollisionObject {
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

  constructor(name: string) {
    super(new Point(0, 0));

    this._name = name;

    this._identity = new Identity();
    this._identity.on(IdentityEvents.ObserverAdded, this.onObserverAdded, this);
    this._identity.on(IdentityEvents.ObserverRemoved, this.onObserverRemoved, this);
  }

  move(direction: number) {
    this._direction = direction;
    this.identity.broadcast(new ServerPackets.CreatureWalkPacket(this.identity.networkId, this.x, this.y, this.direction), false);

    let offsetX = 0;
    let offsetY = 0;
    if (direction === 0) {
      offsetY--;
    } else if (direction === 1) {
      offsetX++;
    } else if (direction === 2) {
      offsetY++;
    } else if (direction === 3) {
      offsetX--;
    }
    this.setPosition(this.x + offsetX, this.y + offsetY);
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
