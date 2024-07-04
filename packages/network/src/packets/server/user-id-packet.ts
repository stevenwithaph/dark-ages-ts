import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';

export class UserIdPacket implements Packet {
  constructor(
    public userId: number,
    public direction: number,
    public classId: number
  ) {}
  get opCode(): number {
    return ServerOpCode.UserId;
  }
  serialize(writer: BinaryWriter): void {
    writer.writeUint32(this.userId);
    writer.writeUint8(this.direction);

    //  if these are removed, occasionally the client will not recongize their aisling
    writer.writeUint8(0);
    writer.writeUint8(this.classId);
    writer.writeUint8(0);
    writer.writeUint8(0);
    writer.writeUint8(0);
  }
  deserialize(reader: BinaryReader): void {
    this.userId = reader.readUint32();
    this.direction = reader.readUint8();
  }
}
