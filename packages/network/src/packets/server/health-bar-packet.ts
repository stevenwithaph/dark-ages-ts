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
    writer.writeUint8(this.percent);
  }
  deserialize(reader: BinaryReader): void {
    throw new Error('Method not implemented.');
  }
}
