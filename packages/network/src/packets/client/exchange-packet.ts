import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';

export class ExchangePacket implements Packet {}

class ExchangeSerializer extends BasePacketSerializer<ExchangePacket> {
  constructor() {
    super(ClientOpCode.Exchange, ExchangePacket);
  }
  serialize(writer: BinaryWriter, packet: ExchangePacket): void {
    throw new Error('Method not implemented.');
  }
  deserialize(reader: BinaryReader, packet: ExchangePacket): void {
    throw new Error('Method not implemented.');
  }
}

ClientPacketFactory.register(ExchangeSerializer);
