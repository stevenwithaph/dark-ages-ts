import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';

export class CreatureTurnPacket implements Packet {
  constructor(
    public entityId: number,
    public direction: number
  ) {}
  get opCode(): number {
    return ServerOpCode.CreatureTurn;
  }
  serialize(writer: BinaryWriter): void {
    writer.writeUint32(this.entityId);
    writer.writeUint8(this.direction);
  }
  deserialize(reader: BinaryReader): void {
    this.entityId = reader.readUint32();
    this.direction = reader.readUint8();
  }
}
