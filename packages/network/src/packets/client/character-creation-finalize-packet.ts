import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';

export class CharacterCreationFinalizePacket implements Packet {}

class CharacterCreationFinalizeSerializer extends BasePacketSerializer<CharacterCreationFinalizePacket> {
  constructor() {
    super(ClientOpCode.CreateCharFinalize, CharacterCreationFinalizePacket);
  }
  serialize(
    writer: BinaryWriter,
    packet: CharacterCreationFinalizePacket
  ): void {
    throw new Error('Method not implemented.');
  }
  deserialize(
    reader: BinaryReader,
    packet: CharacterCreationFinalizePacket
  ): void {
    throw new Error('Method not implemented.');
  }
}

ClientPacketFactory.register(CharacterCreationFinalizeSerializer);
