import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class AttributesPacket implements Packet {}

class AttributesSerializer extends BasePacketSerializer<AttributesPacket> {
  constructor() {
    super(ServerOpCode.Attributes, AttributesPacket);
  }

  serialize(writer: BinaryWriter, packet: AttributesPacket) {
    throw new Error('Method not implemented.');
  }

  deserialize(reader: BinaryReader, packet: AttributesPacket) {
    throw new Error('Method not implemented.');
  }
}

ServerPacketFactory.register(AttributesSerializer);
