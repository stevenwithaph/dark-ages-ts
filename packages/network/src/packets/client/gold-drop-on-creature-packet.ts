import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';

export class GoldDroppedOnCreaturePacket implements Packet {}

class GoldDroppedOnCreatureSerializer extends BasePacketSerializer<GoldDroppedOnCreaturePacket> {
  constructor() {
    super(ClientOpCode.GoldDroppedOnCreature, GoldDroppedOnCreaturePacket);
  }
  serialize(writer: BinaryWriter, packet: GoldDroppedOnCreaturePacket): void {
    throw new Error('Method not implemented.');
  }
  deserialize(reader: BinaryReader, packet: GoldDroppedOnCreaturePacket): void {
    throw new Error('Method not implemented.');
  }
}

ClientPacketFactory.register(GoldDroppedOnCreatureSerializer);
