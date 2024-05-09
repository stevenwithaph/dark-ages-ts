import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';

export class UnequipPacket implements Packet {}

class UnequipSerializer extends BasePacketSerializer<UnequipPacket> {
  constructor() {
    super(ClientOpCode.Unequip, UnequipPacket);
  }
  serialize(writer: BinaryWriter, packet: UnequipPacket): void {
    throw new Error('Method not implemented.');
  }
  deserialize(reader: BinaryReader, packet: UnequipPacket): void {
    throw new Error('Method not implemented.');
  }
}

ClientPacketFactory.register(UnequipSerializer);
