import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class MapInfoPacket implements Packet {
  constructor(
    public areaId: number,
    public width: number,
    public height: number,
    public flags: number,
    public crc: number,
    public name: string
  ) {}
}

class MapInfoSerializer extends BasePacketSerializer<MapInfoPacket> {
  constructor() {
    super(ServerOpCode.MapInfo, MapInfoPacket);
  }

  serialize(writer: BinaryWriter, packet: MapInfoPacket) {
    writer.writeUint16(packet.areaId);
    writer.writeUint8(packet.width);
    writer.writeUint8(packet.height);
    writer.writeUint8(packet.flags);
    writer.offset += 2;

    writer.writeUint16(packet.crc);
    writer.writeString8(packet.name);
  }

  deserialize(reader: BinaryReader, packet: MapInfoPacket) {
    packet.areaId = reader.readUint16();
    packet.width = reader.readUint8();
    packet.height = reader.readUint8();
    packet.flags = reader.readUint8();

    reader.offset += 2;

    packet.crc = reader.readUint16();
    packet.name = reader.readString8();
  }
}

ServerPacketFactory.register(MapInfoSerializer);
