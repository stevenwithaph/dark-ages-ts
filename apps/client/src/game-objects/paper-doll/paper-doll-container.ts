import { Direction } from '../../direction';
import { DisplayEntity } from '../display-entity';
import { Idle, Walk } from './paper-doll-animations';
import {
  AnimationEvents,
  SpriteAtlasAnimator,
} from '../sprite-atlas/sprite-atlas-animator';
import {
  PaperDollPiece,
  PaperDollPrefix,
  PaperDollPieceNames,
} from './paper-doll-piece';

export const ANIM_COMPLETE = 'animation-complete';
export const MOVE_COMPLETE = 'move-complete';

export enum PaperDollGender {
  Male = 'm',
  Female = 'w',
}

type PaperDollPieces = {
  [key in PaperDollPieceNames]: PaperDollPiece;
};

export class PaperDollContainer
  extends Phaser.GameObjects.Container
  implements DisplayEntity
{
  pieces: PaperDollPieces;
  animator: SpriteAtlasAnimator;
  private paperDollKeys: string[];

  constructor(
    scene: Phaser.Scene,
    public gender: PaperDollGender,
    public direction: Direction
  ) {
    super(scene);

    this.animator = new SpriteAtlasAnimator(Idle);

    this.pieces = {
      [PaperDollPieceNames.Shield]: new PaperDollPiece(
        this.scene,
        this,
        PaperDollPrefix.Shield
      ),
      [PaperDollPieceNames.Body]: new PaperDollPiece(
        this.scene,
        this,
        PaperDollPrefix.Body,
        1
      ),
      [PaperDollPieceNames.Pants]: new PaperDollPiece(
        this.scene,
        this,
        PaperDollPrefix.Pants
      ),
      [PaperDollPieceNames.Boots]: new PaperDollPiece(
        this.scene,
        this,
        PaperDollPrefix.Boots
      ),
      [PaperDollPieceNames.Armor]: new PaperDollPiece(
        this.scene,
        this,
        PaperDollPrefix.Armor
      ),
      [PaperDollPieceNames.Weapon]: new PaperDollPiece(
        this.scene,
        this,
        PaperDollPrefix.Weapon
      ),
      [PaperDollPieceNames.Helmet]: new PaperDollPiece(
        this.scene,
        this,
        PaperDollPrefix.Helmet
      ),
      [PaperDollPieceNames.Accessory1]: new PaperDollPiece(
        this.scene,
        this,
        PaperDollPrefix.Accessory
      ),
      [PaperDollPieceNames.Accessory2]: new PaperDollPiece(
        this.scene,
        this,
        PaperDollPrefix.Accessory
      ),
      [PaperDollPieceNames.Accessory3]: new PaperDollPiece(
        this.scene,
        this,
        PaperDollPrefix.Accessory
      ),
    };

    this.paperDollKeys = Object.keys(this.pieces);

    this.pieces.body.setDye(63);
    this.pieces.pants.setDye(79);
    this.pieces.armor.setDye(79);
    this.pieces.boots.setDye(79);
    this.pieces.helmet.setDye(79);

    this.pieces.acc1.setDye(79);
    this.pieces.acc2.setDye(79);
    this.pieces.acc3.setDye(79);

    for (let i = 0; i < this.paperDollKeys.length; i++) {
      this.add(this.pieces[this.paperDollKeys[i] as PaperDollPieceNames]);
    }

    this.setDirection(this.direction);

    this.animator.play(Idle, 0);
    this.animator.on(AnimationEvents.FRAME, () => this.refreshFrames());

    this.setInteractive(
      new Phaser.Geom.Rectangle(-9, -51 - 14, 18, 51),
      (shape: Phaser.Geom.Rectangle, x: number, y: number) => {
        return shape.contains(x, y);
      }
    );
    this.on(
      Phaser.Input.Events.GAMEOBJECT_POINTER_UP,
      (
        _pointer: Phaser.Input.Pointer,
        _x: number,
        _y: number,
        event: Phaser.Types.Input.EventData
      ) => {
        event.stopPropagation();
      }
    );

    this.addToUpdateList();
  }

  playAnimation(animation: number, duration: number): void {}

  playWalkAnimation(duration: number): void {
    this.animator.play(Walk, duration);
  }

  playIdleAnimation(): void {
    this.animator.play(Idle, 0);
  }

  setGender(gender: PaperDollGender) {
    this.gender = gender;

    this.refreshAtlases();
  }

  setDirection(direction: Direction) {
    this.direction = direction;

    switch (direction) {
      case Direction.UP_RIGHT:
        this.sendToBack(this.pieces.shield);
        this.setScale(1, 1);
        break;
      case Direction.DOWN_RIGHT:
        this.bringToTop(this.pieces.shield);
        this.setScale(1, 1);
        break;
      case Direction.DOWN_LEFT:
        this.bringToTop(this.pieces.shield);
        this.setScale(-1, 1);
        break;
      case Direction.UP_LEFT:
        this.sendToBack(this.pieces.shield);
        this.setScale(-1, 1);
        break;
    }

    this.refreshFrames();
  }

  preUpdate(_: number, delta: number) {
    this.animator.update(delta);
  }

  refreshAtlases() {
    for (let i = 0; i < this.paperDollKeys.length; i++) {
      this.pieces[this.paperDollKeys[i] as PaperDollPieceNames].refreshAtlas();
    }
  }

  refreshFrames() {
    for (let i = 0; i < this.paperDollKeys.length; i++) {
      this.pieces[this.paperDollKeys[i] as PaperDollPieceNames].refreshFrame();
    }
  }

  public directionFrame() {
    return this.animator.directionFrame(this.direction);
  }
}
