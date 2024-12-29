import { GameObjects, Input, Scene } from 'phaser';
import { ClientPackets } from '@medenia/network';
import { MapEntity, MapEntityEvents } from '@/game-objects/map-entity';
import { Client } from '@/network/client';
import { Direction, xyToDirection } from '@/direction';
import { CompassStore } from '@/ui/stores/compass.svelte';
import { StateMachine } from '@medenia/fsm';
import { IdleState } from './states/idle-state';
import { AnimationState } from './states/animation-state';
import { MoveToDestinationState } from './states/move-to-destination-state';
import { AttackTargetState } from './states/attack-target-state';
import { PathFinder } from './path-finder';

export class PlayerController extends GameObjects.GameObject {
  get entity() {
    return this._entity;
  }

  get target() {
    return this._target;
  }

  get destination() {
    return this._destination;
  }

  private _currentPath: { x: number; y: number }[] = [];
  private _currentPathIndex: number = -1;

  private _destination?: Phaser.Math.Vector2;
  private _target?: MapEntity;

  private _entity?: MapEntity;
  private _machine: StateMachine<PlayerController>;

  private _pathFinder: PathFinder;

  public actorId: number = 0;

  constructor(
    public scene: Scene,
    private client: Client
  ) {
    super(scene, 'player-controller');

    this._machine = new StateMachine(this, IdleState);
    this._machine.addState(AnimationState);
    this._machine.addState(MoveToDestinationState);
    this._machine.addState(AttackTargetState);

    this._pathFinder = new PathFinder();

    this.scene.input.on(Input.Events.POINTER_DOWN, this.onMapTileClick, this);
    this.addToUpdateList();
  }

  async onMapTileClick(pointer: Input.Pointer) {
    if (!this._entity) return;

    this._target = undefined;
    this._destination = this._entity.map.worldToTileXY(pointer.worldX, pointer.worldY);

    if (!this._destination) return;
    const path = await this._entity.map.findPath(this._entity.tileX, this._entity.tileY, this._destination.x, this._destination.y);

    if (path.length === 0) {
      this._destination = undefined;
      return;
    }
  }

  async moveToTarget(target: MapEntity) {
    if (!this._entity) return;

    this._destination = undefined;
    this._target = target;

    const endPoint = this._pathFinder.closestCardinalPoint(this._entity.tileX, this._entity.tileY, this._target.tileX, this._target.tileY);

    const path = await this._entity.map.findPath(this._entity.tileX, this._entity.tileY, endPoint.x, endPoint.y);

    if (path.length === 0) {
      this._target = undefined;
      return;
    }
  }

  moveInDirection(direction: Direction) {
    if (!this._entity) return;

    this.client.send(new ClientPackets.ClientWalkPacket(direction, 0));
    this._entity.walkInDirection(direction);
  }

  turn(direction: Direction) {
    if (!this._entity) return;

    this.client.send(new ClientPackets.ClientTurnPacket(direction));
    this._entity?.display.setDirection(direction);
  }

  defaultAttack() {
    this.client.send(new ClientPackets.DefaultAttackPacket());
  }

  possses(entity: MapEntity) {
    this.clearPath();
    this._target = undefined;

    this._pathFinder.astar = entity.map.astar;

    this._entity = entity;
  }

  unposses() {
    this._entity = undefined;
    this._pathFinder.astar = undefined;

    this.clearPath();
    this._target = undefined;
  }

  /*private moveToNextPath() {
    if (!this._entity) return;

    if (this._currentPathIndex === this._currentPath.length) {
      this.clearPath();
      return;
    }

    const nextPosition = this._currentPath[this._currentPathIndex];
    CompassStore.setPosition(nextPosition.x, nextPosition.y);

    const direction = xyToDirection(nextPosition.x - this._entity.tileX, nextPosition.y - this._entity.tileY);

    this.moveInDirection(direction);

    this._entity.once(MapEntityEvents.MOVE_COMPLETE, this.moveToNextPath, this);

    this._currentPathIndex++;
  }*/

  private clearPath() {
    /*this._currentPath = [];
    this._currentPathIndex = -1;
    this._destination = undefined;
    this._target = undefined;*/
  }

  preUpdate() {
    this._machine.update();
  }
}
