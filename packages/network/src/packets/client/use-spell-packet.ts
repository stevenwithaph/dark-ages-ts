import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';

export class UseSpellPacket implements Packet {}

class UseSpellSerializer extends BasePacketSerializer<UseSpellPacket> {
  constructor() {
    super(ClientOpCode.UseSpell, UseSpellPacket);
  }
  serialize(writer: BinaryWriter, packet: UseSpellPacket): void {
    throw new Error('Method not implemented.');
  }
  deserialize(reader: BinaryReader, packet: UseSpellPacket): void {
    throw new Error('Method not implemented.');
  }
}

ClientPacketFactory.register(UseSpellSerializer);
