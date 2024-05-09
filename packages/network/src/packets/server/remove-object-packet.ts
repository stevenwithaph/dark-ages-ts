import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class RemoveObjectPacket implements Packet {
  constructor(public entityId: number) {}
}

class RemoveObjectSerializer extends BasePacketSerializer<RemoveObjectPacket> {
  constructor() {
    super(ServerOpCode.RemoveObject, RemoveObjectPacket);
  }

  serialize(writer: BinaryWriter, packet: RemoveObjectPacket) {
    writer.writeUint32(packet.entityId);
  }

  deserialize(reader: BinaryReader, packet: RemoveObjectPacket) {
    packet.entityId = reader.readUint32();
  }
}

ServerPacketFactory.register(RemoveObjectSerializer);
