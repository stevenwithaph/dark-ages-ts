//TODO: this whole calss and the things surrounding it

import { GameObjects } from 'phaser';
import { directionToVector } from '@/direction';

import { IsoMap } from './iso-map';
import { DisplayEntity } from './display-entity';
import { ChatBubble } from './chat-bubble';
import { HealthBar } from './health-bar';

const DEFAULT_MOVE_DURATION = 415;

export const MapEntityEvents = {
  MOVE_COMPLETE: 'move_complete',
  ANIMATION_COMPLETE: 'animation_complete',
};

type GameObjectWithDisplay = GameObjects.GameObject & DisplayEntity;

export class MapEntity extends GameObjects.Container {
  public tileX: number = 0;
  public tileY: number = 0;

  public get display() {
    return this._display;
  }

  public get map() {
    return this.#map;
  }

  #map: IsoMap;

  protected tween: Phaser.Tweens.Tween;
  protected bubble?: ChatBubble;
  protected health?: HealthBar;
  protected _display: GameObjectWithDisplay;

  constructor(scene: Phaser.Scene, displayEntity: GameObjectWithDisplay, map: IsoMap, tileX: number, tileY: number) {
    super(scene, 0, 0);

    this.add(displayEntity);
    this._display = displayEntity;

    this.#map = map;

    this.setTilePosition(tileX, tileY);
  }

  walkFrom(fromX: number, fromY: number, direction: number) {
    if (this.tween) {
      this.tween.destroy();
    }

    this.setTilePosition(fromX, fromY);

    this.walkInDirection(direction);
  }

  walkInDirection(direction: number) {
    this.display.setDirection(direction);
    this.display.playWalkAnimation(DEFAULT_MOVE_DURATION);

    const vector = directionToVector(direction);

    const newPosition = this.#map.tileToWorldXY(this.tileX + vector.x, this.tileY + vector.y);

    this.tween = this.scene.tweens.add({
      targets: this,
      x: newPosition!.x,
      y: newPosition!.y,
      duration: DEFAULT_MOVE_DURATION,
      onComplete: () => {
        this.emit(MapEntityEvents.MOVE_COMPLETE);
      },
    });

    this.setDepth(newPosition.y);
    this.updateTilePosition(this.tileX + vector.x, this.tileY + vector.y);
  }

  playAnimation() {
    this.display.playAnimation(1, 300);
  }

  say(message: string) {
    if (!this.bubble) {
      this.bubble = new ChatBubble(this.scene, () => {
        this.bubble?.destroy();
        this.bubble = undefined;
      });
      this.add(this.bubble);
    }

    this.bubble.setText(message);
  }

  setHealth(percent: number) {
    if (!this.health) {
      this.health = new HealthBar(this.scene, () => {
        this.health?.destroy();
        this.health = undefined;
      });
      this.add(this.health);
    }

    this.health.setHealth(percent);
  }

  setTilePosition(tileX: number, tileY: number) {
    const newPosition = this.#map.tileToWorldXY(tileX, tileY)!;

    this.x = newPosition.x;
    this.y = newPosition.y;

    this.setDepth(this.y);

    this.updateTilePosition(tileX, tileY);
  }

  private updateTilePosition(tileX: number, tileY: number) {
    this.#map.stopAvoidingPoint(this.tileX, this.tileY);

    this.tileX = tileX;
    this.tileY = tileY;

    this.#map.avoidPoint(this.tileX, this.tileY);
  }

  destroy(fromScene?: boolean | undefined): void {
    super.destroy(fromScene);

    this.#map.stopAvoidingPoint(this.tileX, this.tileY);
  }
}
