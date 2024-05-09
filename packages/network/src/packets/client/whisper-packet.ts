import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';

export class WhipserPacket implements Packet {}

class WhipserSerializer extends BasePacketSerializer<WhipserPacket> {
  constructor() {
    super(ClientOpCode.Whipser, WhipserPacket);
  }
  serialize(writer: BinaryWriter, packet: WhipserPacket): void {
    throw new Error('Method not implemented.');
  }
  deserialize(reader: BinaryReader, packet: WhipserPacket): void {
    throw new Error('Method not implemented.');
  }
}

ClientPacketFactory.register(WhipserSerializer);
