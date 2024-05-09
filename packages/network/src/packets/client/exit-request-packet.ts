import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';

export class ExitRequestPacket implements Packet {}

class ExitRequestSerializer extends BasePacketSerializer<ExitRequestPacket> {
  constructor() {
    super(ClientOpCode.BoardRequest, ExitRequestPacket);
  }
  serialize(writer: BinaryWriter, packet: ExitRequestPacket): void {
    throw new Error('Method not implemented.');
  }
  deserialize(reader: BinaryReader, packet: ExitRequestPacket): void {
    throw new Error('Method not implemented.');
  }
}

ClientPacketFactory.register(ExitRequestSerializer);
