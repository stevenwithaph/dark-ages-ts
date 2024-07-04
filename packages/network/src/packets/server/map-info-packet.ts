import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';

export class MapInfoPacket implements Packet {
  constructor(
    public areaId: number,
    public width: number,
    public height: number,
    public flags: number,
    public crc: number,
    public name: string
  ) {}
  get opCode(): number {
    return ServerOpCode.MapInfo;
  }
  serialize(writer: BinaryWriter): void {
    writer.writeUint16(this.areaId);
    writer.writeUint8(this.width);
    writer.writeUint8(this.height);
    writer.writeUint8(this.flags);
    writer.offset += 2;

    writer.writeUint16(this.crc);
    writer.writeString8(this.name);
  }
  deserialize(reader: BinaryReader): void {
    this.areaId = reader.readUint16();
    this.width = reader.readUint8();
    this.height = reader.readUint8();
    this.flags = reader.readUint8();

    reader.offset += 2;

    this.crc = reader.readUint16();
    this.name = reader.readString8();
  }
}
