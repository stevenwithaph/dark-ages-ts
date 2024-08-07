import { ServerPackets } from '@medenia/network';

import { AislingEntity } from '../../db/entities/aisling.entity';
import { Client } from '../../network/client';
import { Peer } from '../network/peer';
import { ColliderNodeEvents } from '../physics/collider-node';
import { Aisling } from './aisling';
import { MapEntity } from './map-entity';
import { EntityTypes } from '../entity-types';
import { ObservableList } from '../../utils/observable-list';
import { InterestArea } from './interest-area';
import { MapRoom } from '../../maps/map-room';

interface Item {}

export class Player extends Aisling {
  private _interestArea: InterestArea;
  private _peer: Peer;

  private _inventory: ObservableList<Item>;
  private _spells: ObservableList<Item>;
  private _skills: ObservableList<Item>;
  private _equipment: ObservableList<Item>;

  public map?: MapRoom;

  set networkId(value: number) {
    this.identity.networkId = value;
    this._peer.id = value;
  }

  get networkId() {
    return this.identity.networkId;
  }

  get interestArea() {
    return this._interestArea;
  }

  get peer() {
    return this._peer;
  }

  get inventory() {
    return this._inventory;
  }

  get spells() {
    return this._spells;
  }

  get skills() {
    return this._skills;
  }

  get equipment() {
    return this._equipment;
  }

  constructor(x: number, y: number, client: Client, aisling: AislingEntity) {
    super(x, y, aisling);

    this.nodeName = client.id;

    this.layer = EntityTypes.AISLING;
    this.mask = EntityTypes.AREA | EntityTypes.AISLING_AREA;

    this._inventory = new ObservableList();
    this._spells = new ObservableList();
    this._skills = new ObservableList();
    this._equipment = new ObservableList();

    this._inventory.addListener('added', this.onInventoryItemAdded, this);
    this._inventory.addListener('removed', this.onInventoryItemRemoved, this);

    this._spells.addListener('added', this.onSpellAdded, this);
    this._spells.addListener('removed', this.onSpellRemoved, this);

    this._skills.addListener('added', this.onSkillAdded, this);
    this._skills.addListener('removed', this.onSkillRemoved, this);

    this._equipment.addListener('added', this.onEquipmentAdded, this);
    this._equipment.addListener('removed', this.onEquipmentRemoved, this);

    this.createPeer(client);
    this.createInterestArea();
  }

  createInterestArea() {
    this._interestArea = new InterestArea();

    this._interestArea.on(ColliderNodeEvents.CollisionEnter, this.onInterestEnter, this);
    this._interestArea.on(ColliderNodeEvents.CollisionExit, this.onInterestExit, this);

    this.addChild(this._interestArea);
  }

  createPeer(client: Client) {
    this._peer = new Peer(client);
    this._peer.id = this.identity.networkId;

    this.addChild(this._peer);
  }

  onInterestEnter(entity: MapEntity) {
    entity.identity.addObserver(this.peer);
  }

  onInterestExit(entity: MapEntity) {
    entity.identity.removeObserver(this.peer);
  }

  onInventoryItemAdded(index: number, item: Item) {
    this.peer.send(new ServerPackets.AddItemToPanePacket(index, 0x8004, 'test', 0, false, 100, 100));
  }

  onInventoryItemRemoved(index: number, item: Item) {
    this.peer.send(new ServerPackets.RemoveItemFromPanePacket(index));
  }

  onSpellAdded(index: number, item: Item) {
    this.peer.send(new ServerPackets.AddSpellToPanePacket('test', index, 1, 1, 'prompt', 1));
  }

  onSpellRemoved(index: number, item: Item) {
    this.peer.send(new ServerPackets.RemoveSpellFromPanePacket(index));
  }

  onSkillAdded(index: number, item: Item) {
    this.peer.send(new ServerPackets.AddSkillToPanePacket('test', index, 1));
  }

  onSkillRemoved(index: number, item: Item) {
    this.peer.send(new ServerPackets.RemoveSkillFromPanePacket(index));
  }

  onEquipmentAdded(index: number, item: Item) {
    this.peer.send(new ServerPackets.EquipmentPacket(index, 0x8004, 1, 'shirt', 100, 100));
  }

  onEquipmentRemoved(index: number, item: Item) {
    this.peer.send(new ServerPackets.UnequipPacket(index));
  }
}
