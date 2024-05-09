import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';

export class GoldDropPacket implements Packet {}

class GoldDropSerializer extends BasePacketSerializer<GoldDropPacket> {
  constructor() {
    super(ClientOpCode.GoldDrop, GoldDropPacket);
  }
  serialize(writer: BinaryWriter, packet: GoldDropPacket): void {
    throw new Error('Method not implemented.');
  }
  deserialize(reader: BinaryReader, packet: GoldDropPacket): void {
    throw new Error('Method not implemented.');
  }
}

ClientPacketFactory.register(GoldDropSerializer);
