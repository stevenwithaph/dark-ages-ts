import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class UnequipPacket implements Packet {}

class UnequipSerializer extends BasePacketSerializer<UnequipPacket> {
  constructor() {
    super(ServerOpCode.Unequip, UnequipPacket);
  }

  serialize(writer: BinaryWriter, packet: UnequipPacket) {
    throw new Error('Method not implemented.');
  }

  deserialize(reader: BinaryReader, packet: UnequipPacket) {
    throw new Error('Method not implemented.');
  }
}

ServerPacketFactory.register(UnequipSerializer);
