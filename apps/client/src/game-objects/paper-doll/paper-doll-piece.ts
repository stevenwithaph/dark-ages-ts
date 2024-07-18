import { AltasSprite } from '../sprite-atlas/atlas-sprite';
import { PaperDollContainer } from './paper-doll-container';

export enum PaperDollPrefix {
  Shield = 's',
  Body = 'm',
  Pants = 'n',
  Armor = 'u',
  Weapon = 'w',
  Boots = 'l',
  Helmet = 'h',
  Accessory = 'c',
}

export enum PaperDollPieceNames {
  Shield = 'shield',
  Body = 'body',
  Pants = 'pants',
  Armor = 'armor',
  Weapon = 'weapon',
  Boots = 'boots',
  Helmet = 'helmet',
  Accessory1 = 'acc1',
  Accessory2 = 'acc2',
  Accessory3 = 'acc3',
}

export class PaperDollPiece extends AltasSprite {
  constructor(
    scene: Phaser.Scene,
    private paperDollContainer: PaperDollContainer,
    private prefix: PaperDollPrefix,
    itemId: number = 0
  ) {
    super(scene);
    this.setItemId(itemId);
  }

  protected load() {
    this.scene.load.spriteAtlas(this.textureName, `./aislings/${this.textureName}`);
  }

  protected getTextureName() {
    return `${this.paperDollContainer.gender}${this.prefix}${this.itemId}`;
  }

  protected getFrameName() {
    return `${this.textureName}${this.paperDollContainer.animator.prefix}_${this.paperDollContainer.directionFrame()}`;
  }

  setDye(dye: number) {
    this.setPipeline('Dye', { dyeIndex: dye });
  }
}
