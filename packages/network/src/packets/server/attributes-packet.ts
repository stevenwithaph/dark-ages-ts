import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { AttributeFlags } from '../../entities/attribute-flags';
import { PrimaryAttributes } from '../../entities/primary-attributes';
import { SecondaryAttributes } from '../../entities/secondary-attributes';
import { CurrencyAttributes } from '../../entities/currency-attributes';
import { CurrentAttributes } from '../../entities/current-attributes';

/**
 * TODO: The structure of this packet is different than the rest of the packets.
 * Come up with a better of handling it or adjust how we define the packets
 */

export class AttributesPacket implements Packet {
  primary?: PrimaryAttributes;
  secondary?: SecondaryAttributes;
  currency?: CurrencyAttributes;
  current?: CurrentAttributes;

  constructor(public flag: AttributeFlags) {}
  get opCode(): number {
    return ServerOpCode.Attributes;
  }
  serialize(writer: BinaryWriter): void {
    writer.writeUint8(this.flag);

    if ((this.flag & AttributeFlags.Primary) === AttributeFlags.Primary) {
      const primary = this.primary!;

      writer.offset += 3;
      writer.writeUint8(primary.level);
      writer.writeUint8(primary.ability);
      writer.writeUint32(primary.maxHp);
      writer.writeUint32(primary.maxMp);
      writer.writeUint8(primary.str);
      writer.writeUint8(primary.int);
      writer.writeUint8(primary.wiz);
      writer.writeUint8(primary.con);
      writer.writeUint8(primary.dex);
      writer.writeBoolean(primary.hasPoints);
      writer.writeUint8(primary.points);
      writer.writeUint16(primary.maxWeight);
      writer.writeUint16(primary.currentWeight);
      writer.offset += 4;
    }

    if ((this.flag & AttributeFlags.Current) === AttributeFlags.Current) {
      const current = this.current!;

      writer.writeUint32(current.currentHp);
      writer.writeUint32(current.currentMp);
    }

    if ((this.flag & AttributeFlags.Currency) === AttributeFlags.Currency) {
      const currency = this.currency!;

      writer.writeUint32(currency.totalExP);
      writer.writeUint32(currency.nextLevel);
      writer.writeUint32(currency.totalAbility);
      writer.writeUint32(currency.nextAbility);
      writer.writeUint32(currency.gamePoints);
      writer.writeUint32(currency.gold);
    }

    if ((this.flag & AttributeFlags.Secondary) === AttributeFlags.Secondary) {
      const secondary = this.secondary!;

      writer.offset += 1;
      writer.writeUint8(secondary.blind);
      writer.offset += 3;
      writer.writeUint8(secondary.mail);
      writer.writeUint8(secondary.offenseElement);
      writer.writeUint8(secondary.defenseElement);
      writer.offset += 3;
      writer.writeUint8(secondary.ac);
      writer.writeUint8(secondary.dmg);
      writer.writeUint8(secondary.hit);
    }
  }
  deserialize(reader: BinaryReader): void {
    throw new Error('Method not implemented.');
  }
}
