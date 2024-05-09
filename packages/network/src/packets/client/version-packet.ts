import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';

export class VersionPacket implements Packet {
  constructor(public version: number) {}
}

class VersionPacketSerializer extends BasePacketSerializer<VersionPacket> {
  constructor() {
    super(ClientOpCode.Version, VersionPacket);
  }

  serialize(writer: BinaryWriter, packet: VersionPacket) {
    writer.writeUint16(packet.version);
  }

  deserialize(reader: BinaryReader, packet: VersionPacket) {
    packet.version = reader.readUint16();
  }
}

ClientPacketFactory.register(VersionPacketSerializer);
