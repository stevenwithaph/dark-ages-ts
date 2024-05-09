import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';

export class ChantPacket implements Packet {}

class ChantSerializer extends BasePacketSerializer<ChantPacket> {
  constructor() {
    super(ClientOpCode.Chant, ChantPacket);
  }
  serialize(writer: BinaryWriter, packet: ChantPacket): void {
    throw new Error('Method not implemented.');
  }
  deserialize(reader: BinaryReader, packet: ChantPacket): void {
    throw new Error('Method not implemented.');
  }
}

ClientPacketFactory.register(ChantSerializer);
