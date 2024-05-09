import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';

export class SocialStatusPacket implements Packet {}

class SocialStatusSerializer extends BasePacketSerializer<SocialStatusPacket> {
  constructor() {
    super(ClientOpCode.SocialStatus, SocialStatusPacket);
  }
  serialize(writer: BinaryWriter, packet: SocialStatusPacket): void {
    throw new Error('Method not implemented.');
  }
  deserialize(reader: BinaryReader, packet: SocialStatusPacket): void {
    throw new Error('Method not implemented.');
  }
}

ClientPacketFactory.register(SocialStatusSerializer);
