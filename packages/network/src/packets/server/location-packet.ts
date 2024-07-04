import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';

export class LocationPacket implements Packet {
  constructor(
    public x: number,
    public y: number
  ) {}
  get opCode(): number {
    return ServerOpCode.Location;
  }
  serialize(writer: BinaryWriter): void {
    writer.writeUint16(this.x);
    writer.writeUint16(this.y);
  }
  deserialize(reader: BinaryReader): void {
    this.x = reader.readUint16();
    this.y = reader.readUint16();
  }
}
