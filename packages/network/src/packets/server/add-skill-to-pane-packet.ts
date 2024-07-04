import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';

export class AddSkillToPanePacket implements Packet {
  constructor(
    public name: string,
    public slot: number,
    public iconId: number
  ) {}
  get opCode(): number {
    return ServerOpCode.AddSkillToPane;
  }
  serialize(writer: BinaryWriter): void {
    writer.writeUint8(this.slot);
    writer.writeUint16(this.iconId);
    writer.writeString8(this.name);
  }
  deserialize(reader: BinaryReader): void {
    throw new Error('Method not implemented.');
  }
}
