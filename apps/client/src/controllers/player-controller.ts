import { GameObjects, Input, Scene } from 'phaser';
import { MapEntity, MapEntityEvents } from '../game-objects/map-entity';
import { Client } from '../network/client';
import { xyToDirection } from '../direction';
import { ClientPackets } from '@medenia/network';

//
export class PlayerController extends GameObjects.GameObject {
  get entity() {
    return this.#entity;
  }

  private currentPath: { x: number; y: number }[] = [];
  private currentPathIndex: number = -1;

  #entity?: MapEntity;

  public actorId: number = 0;

  constructor(
    public scene: Scene,
    private client: Client
  ) {
    super(scene, 'player-controller');

    this.scene.input.on(Input.Events.POINTER_DOWN, this.onMapClick, this);
  }

  async onMapClick(pointer: Input.Pointer) {
    if (!this.#entity) return;

    const tile = this.#entity.map.worldToTileXY(pointer.worldX, pointer.worldY)!;
    const path = await this.#entity.map.findPath(this.#entity.tileX, this.#entity.tileY, tile.x, tile.y);

    if (path.length === 0) return;

    if (this.currentPath.length === 0) {
      this.currentPath = path;
      this.currentPathIndex = 0;
      this.moveToNextPath();
    } else {
      this.currentPath = path;
      this.currentPathIndex = 0;
    }
  }

  possses(entity: MapEntity) {
    this.currentPath = [];
    this.currentPathIndex = -1;

    this.#entity = entity;
  }

  unposses() {
    this.#entity = undefined;
  }

  private moveToNextPath() {
    if (!this.#entity) return;

    if (this.currentPathIndex === this.currentPath.length) {
      this.clearPath();
      return;
    }

    const nextPosition = this.currentPath[this.currentPathIndex];

    const direction = xyToDirection(nextPosition.x - this.#entity.tileX, nextPosition.y - this.#entity.tileY);

    this.client.send(new ClientPackets.ClientWalkPacket(direction, 0));

    this.#entity.moveInDirection(direction);

    this.#entity.once(MapEntityEvents.MOVE_COMPLETE, this.moveToNextPath, this);

    this.currentPathIndex++;
  }

  private clearPath() {
    this.currentPath = [];
    this.currentPathIndex = -1;
  }
}
