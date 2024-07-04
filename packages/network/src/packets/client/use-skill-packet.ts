import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';

export class UseSkillPacket implements Packet {
  get opCode(): number {
    return ClientOpCode.UseSkill;
  }
  serialize(writer: BinaryWriter): void {
    throw new Error('Method not implemented.');
  }
  deserialize(reader: BinaryReader): void {
    throw new Error('Method not implemented.');
  }
}
