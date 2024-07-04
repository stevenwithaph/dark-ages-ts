import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';

//  TODO: I don't think this packet does anything
export class ConfirmClientWalkPacket implements Packet {
  constructor(
    public direction: number,
    public x: number,
    public y: number
  ) {}
  get opCode(): number {
    return ServerOpCode.ConfirmClientWalk;
  }
  serialize(writer: BinaryWriter): void {
    writer.writeUint8(this.direction);
    writer.writeUint8(this.x);
    writer.writeUint8(this.y);
  }
  deserialize(reader: BinaryReader): void {
    this.direction = reader.readUint8();
    this.x = reader.readUint8();
    this.y = reader.readUint8();
  }
}
