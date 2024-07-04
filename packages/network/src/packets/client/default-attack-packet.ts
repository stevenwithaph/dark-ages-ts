import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';

export class DefaultAttackPacket implements Packet {
  constructor() {}
  get opCode(): number {
    return ClientOpCode.DefaultAttack;
  }
  serialize(writer: BinaryWriter): void {
    //  Intentionally left blank
  }
  deserialize(reader: BinaryReader): void {
    //  Intentionally left blank
  }
}
