import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class PublicMessagePacket implements Packet {}

class PublicMessageSerializer extends BasePacketSerializer<PublicMessagePacket> {
  constructor() {
    super(ServerOpCode.PublicMessage, PublicMessagePacket);
  }

  serialize(writer: BinaryWriter, packet: PublicMessagePacket) {
    throw new Error('Method not implemented.');
  }

  deserialize(reader: BinaryReader, packet: PublicMessagePacket) {
    throw new Error('Method not implemented.');
  }
}

ServerPacketFactory.register(PublicMessageSerializer);
