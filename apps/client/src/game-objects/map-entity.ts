import { GameObjects } from 'phaser';
import { IsoMap } from './iso-map';
import { DisplayEntity } from './display-entity';
import { directionToVector } from '../direction';
import { ChatBubble } from './chat-bubble';

const DEFAULT_MOVE_DURATION = 415;

export const MapEntityEvents = {
  MOVE_COMPLETE: 'move_complete',
  ANIMATION_COMPLETE: 'animation_complete',
};

type GameObjectWithDisplay = GameObjects.GameObject & DisplayEntity;

export class MapEntity extends GameObjects.GameObject {
  public tileX: number = 0;
  public tileY: number = 0;

  public get x() {
    return this.container.x;
  }

  public get y() {
    return this.container.y;
  }

  public set x(value: number) {
    this.container.setX(value);
  }

  public set y(value: number) {
    this.container.setY(value);
  }

  protected container: GameObjects.Container;

  public get map() {
    return this._map;
  }

  protected _map: IsoMap;

  protected tween: Phaser.Tweens.Tween;
  protected bubble?: ChatBubble;

  constructor(
    scene: Phaser.Scene,
    private displayEntity: GameObjectWithDisplay,
    map: IsoMap,
    tileX: number,
    tileY: number
  ) {
    super(scene, 'map-entity');

    this.container = scene.add.container(0, 0);
    this.container.add(this.displayEntity);

    this._map = map;

    this.setToTilePosition(tileX, tileY);
  }

  moveFrom(fromX: number, fromY: number, direction: number) {
    if (this.tween) {
      this.tween.destroy();
    }

    this.setToTilePosition(fromX, fromY);

    this.moveInDirection(direction);
  }

  moveInDirection(direction: number) {
    this.displayEntity.setDirection(direction);

    this.displayEntity.playWalkAnimation(DEFAULT_MOVE_DURATION);

    const vector = directionToVector(direction);

    const newPosition = this._map.tileToWorldXY(this.tileX + vector.x, this.tileY + vector.y);

    this.tween = this.scene.tweens.add({
      targets: this,
      x: newPosition!.x,
      y: newPosition!.y,
      duration: DEFAULT_MOVE_DURATION,
      onComplete: () => {
        this.displayEntity.playIdleAnimation();
        this.emit(MapEntityEvents.MOVE_COMPLETE);
      },
    });

    this.container.setDepth(newPosition.y);

    this.updateTilePosition(this.tileX + vector.x, this.tileY + vector.y);
  }

  say(message: string) {
    if (!this.bubble) {
      this.bubble = new ChatBubble(this.scene, () => {
        this.bubble?.destroy();
        this.bubble = undefined;
      });
      this.container.add(this.bubble);
    }

    this.bubble.setText(message);
  }

  setToTilePosition(tileX: number, tileY: number) {
    const newPosition = this._map.tileToWorldXY(tileX, tileY)!;

    this.container.x = newPosition.x;
    this.container.y = newPosition.y;

    this.container.setDepth(this.container.y);

    this.updateTilePosition(tileX, tileY);
  }

  private updateTilePosition(tileX: number, tileY: number) {
    this._map.stopAvoidingPoint(this.tileX, this.tileY);

    this.tileX = tileX;
    this.tileY = tileY;

    this._map.avoidPoint(this.tileX, this.tileY);
  }

  destroy(fromScene?: boolean | undefined): void {
    super.destroy(fromScene);

    this.container.destroy(fromScene);
  }
}
