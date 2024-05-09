import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';

export class DefaultAttackPacket implements Packet {
  constructor() {}
}

class DefaultAttackSerializer extends BasePacketSerializer<DefaultAttackPacket> {
  constructor() {
    super(ClientOpCode.DefaultAttack, DefaultAttackPacket);
  }

  serialize(writer: BinaryWriter, packet: DefaultAttackPacket) {
    //  Intentionally left blank
  }

  deserialize(reader: BinaryReader, packet: DefaultAttackPacket) {
    //  Intentionally left blank
  }
}

ClientPacketFactory.register(DefaultAttackSerializer);
