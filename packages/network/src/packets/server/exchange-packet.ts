import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class ExchangePacket implements Packet {}

class ExchangeSerializer extends BasePacketSerializer<ExchangePacket> {
  constructor() {
    super(ServerOpCode.Exchange, ExchangePacket);
  }

  serialize(writer: BinaryWriter, packet: ExchangePacket) {
    throw new Error('Method not implemented.');
  }

  deserialize(reader: BinaryReader, packet: ExchangePacket) {
    throw new Error('Method not implemented.');
  }
}

ServerPacketFactory.register(ExchangeSerializer);
