import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';

export class EmotePacket implements Packet {}

class EmoteSerializer extends BasePacketSerializer<EmotePacket> {
  constructor() {
    super(ClientOpCode.Emote, EmotePacket);
  }
  serialize(writer: BinaryWriter, packet: EmotePacket): void {
    throw new Error('Method not implemented.');
  }
  deserialize(reader: BinaryReader, packet: EmotePacket): void {
    throw new Error('Method not implemented.');
  }
}

ClientPacketFactory.register(EmoteSerializer);
