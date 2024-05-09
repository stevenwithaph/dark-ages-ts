import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';

export class PublicMessagePacket implements Packet {}

class PublicMessageSerializer extends BasePacketSerializer<PublicMessagePacket> {
  constructor() {
    super(ClientOpCode.PublicMessage, PublicMessagePacket);
  }
  serialize(writer: BinaryWriter, packet: PublicMessagePacket): void {
    throw new Error('Method not implemented.');
  }
  deserialize(reader: BinaryReader, packet: PublicMessagePacket): void {
    throw new Error('Method not implemented.');
  }
}

ClientPacketFactory.register(PublicMessageSerializer);
