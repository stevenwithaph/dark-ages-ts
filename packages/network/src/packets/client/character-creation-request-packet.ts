import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';

export class CharacterCreationRequestPacket implements Packet {}

class CharacterCreationRequestSerializer extends BasePacketSerializer<CharacterCreationRequestPacket> {
  constructor() {
    super(ClientOpCode.CreateCharRequest, CharacterCreationRequestPacket);
  }
  serialize(
    writer: BinaryWriter,
    packet: CharacterCreationRequestPacket
  ): void {
    throw new Error('Method not implemented.');
  }
  deserialize(
    reader: BinaryReader,
    packet: CharacterCreationRequestPacket
  ): void {
    throw new Error('Method not implemented.');
  }
}

ClientPacketFactory.register(CharacterCreationRequestSerializer);
