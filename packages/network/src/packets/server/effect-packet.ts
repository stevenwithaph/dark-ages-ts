import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';

export class EffectPacket implements Packet {
  constructor(
    public colour: number,
    public icon: number
  ) {}
  get opCode(): number {
    return ServerOpCode.Effect;
  }
  serialize(writer: BinaryWriter): void {
    writer.writeUint8(this.colour);
    writer.writeUint8(this.icon);
  }
  deserialize(reader: BinaryReader): void {
    this.colour = reader.readUint8();
    this.icon = reader.readUint8();
  }
}
