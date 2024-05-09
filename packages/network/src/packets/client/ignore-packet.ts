import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';

export class IgnorePacket implements Packet {}

class IgnoreSerializer extends BasePacketSerializer<IgnorePacket> {
  constructor() {
    super(ClientOpCode.Ignore, IgnorePacket);
  }
  serialize(writer: BinaryWriter, packet: IgnorePacket): void {
    throw new Error('Method not implemented.');
  }
  deserialize(reader: BinaryReader, packet: IgnorePacket): void {
    throw new Error('Method not implemented.');
  }
}

ClientPacketFactory.register(IgnoreSerializer);
