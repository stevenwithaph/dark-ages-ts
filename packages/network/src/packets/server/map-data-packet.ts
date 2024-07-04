import { BinaryReader, Fields, Serializable } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';

export class MapDataPacket implements Packet {
  constructor(
    public row: number,
    public data: Uint16Array
  ) {}
  get opCode(): number {
    return ServerOpCode.MapData;
  }
  serialize(writer: BinaryWriter): void {
    writer.writeUint16(this.row);
    Fields.Uint16ArrayConverter.serialize(this.data, writer);
  }
  deserialize(reader: BinaryReader): void {
    this.row = reader.readUint16();
    this.data = Fields.Uint16ArrayConverter.deserialize(reader);
  }
}
