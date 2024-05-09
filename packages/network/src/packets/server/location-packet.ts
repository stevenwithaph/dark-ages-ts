import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class LocationPacket implements Packet {
  constructor(
    public x: number,
    public y: number
  ) {}
}

class LocationSerializer extends BasePacketSerializer<LocationPacket> {
  constructor() {
    super(ServerOpCode.Location, LocationPacket);
  }

  serialize(writer: BinaryWriter, packet: LocationPacket) {
    writer.writeUint16(packet.x);
    writer.writeUint16(packet.y);
  }

  deserialize(reader: BinaryReader, packet: LocationPacket) {
    packet.x = reader.readUint16();
    packet.y = reader.readUint16();
  }
}

ServerPacketFactory.register(LocationSerializer);
