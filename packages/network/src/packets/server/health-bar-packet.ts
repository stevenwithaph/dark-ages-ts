import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';

export class HealthBarPacket implements Packet {
  constructor(
    public actorId: number,
    public percent: number
  ) {}
  get opCode(): number {
    return ServerOpCode.HealthBar;
  }
  serialize(writer: BinaryWriter): void {
    writer.writeUint32(this.actorId);
    writer.offset += 1;
    writer.writeInt8(this.percent);
  }
  deserialize(reader: BinaryReader): void {
    this.actorId = reader.readUint32();
    reader.offset += 1;
    this.percent = reader.readInt8();
  }
}
