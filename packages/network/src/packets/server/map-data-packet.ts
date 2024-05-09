import { BinaryReader, Fields } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class MapDataPacket implements Packet {
  constructor(
    public row: number,
    public data: Uint16Array
  ) {}
}

class MapDataSerializer extends BasePacketSerializer<MapDataPacket> {
  constructor() {
    super(ServerOpCode.MapData, MapDataPacket);
  }

  serialize(writer: BinaryWriter, packet: MapDataPacket) {
    writer.writeUint16(packet.row);

    Fields.Uint16ArrayConverter.serialize(packet.data, writer);
  }

  deserialize(reader: BinaryReader, packet: MapDataPacket) {
    packet.row = reader.readUint16();
    packet.data = Fields.Uint16ArrayConverter.deserialize(reader);
  }
}

ServerPacketFactory.register(MapDataSerializer);
