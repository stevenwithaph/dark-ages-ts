import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';

export class CreatureWalkPacket implements Packet {
  constructor(
    public actorId: number,
    public fromX: number,
    public fromY: number,
    public direction: number
  ) {}
  get opCode(): number {
    return ServerOpCode.CreatureWalk;
  }
  serialize(writer: BinaryWriter): void {
    writer.writeUint32(this.actorId);
    writer.writeUint16(this.fromX);
    writer.writeUint16(this.fromY);
    writer.writeUint8(this.direction);
  }
  deserialize(reader: BinaryReader): void {
    this.actorId = reader.readUint32();
    this.fromX = reader.readUint16();
    this.fromY = reader.readUint16();
    this.direction = reader.readUint8();
  }
}
