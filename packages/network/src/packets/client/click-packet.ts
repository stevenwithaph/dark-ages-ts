import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';

export class ClickPacket implements Packet {}

class ClickSerializer extends BasePacketSerializer<ClickPacket> {
  constructor() {
    super(ClientOpCode.Click, ClickPacket);
  }
  serialize(writer: BinaryWriter, packet: ClickPacket): void {
    throw new Error('Method not implemented.');
  }
  deserialize(reader: BinaryReader, packet: ClickPacket): void {
    throw new Error('Method not implemented.');
  }
}

ClientPacketFactory.register(ClickSerializer);
