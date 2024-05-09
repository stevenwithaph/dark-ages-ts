import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';

export class UseItemPacket implements Packet {}

class UseItemSerializer extends BasePacketSerializer<UseItemPacket> {
  constructor() {
    super(ClientOpCode.UseItem, UseItemPacket);
  }
  serialize(writer: BinaryWriter, packet: UseItemPacket): void {
    throw new Error('Method not implemented.');
  }
  deserialize(reader: BinaryReader, packet: UseItemPacket): void {
    throw new Error('Method not implemented.');
  }
}

ClientPacketFactory.register(UseItemSerializer);
