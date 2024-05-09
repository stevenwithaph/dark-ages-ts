import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';

export class ClientExceptionPacket implements Packet {}

class ClientExceptionSerializer extends BasePacketSerializer<ClientExceptionPacket> {
  constructor() {
    super(ClientOpCode.ClientException, ClientExceptionPacket);
  }
  serialize(writer: BinaryWriter, packet: ClientExceptionPacket): void {
    throw new Error('Method not implemented.');
  }
  deserialize(reader: BinaryReader, packet: ClientExceptionPacket): void {
    throw new Error('Method not implemented.');
  }
}

ClientPacketFactory.register(ClientExceptionSerializer);
