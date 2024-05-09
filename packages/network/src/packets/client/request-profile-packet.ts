import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';

export class RequestProfilePacket implements Packet {}

class RequestProfileSerializer extends BasePacketSerializer<RequestProfilePacket> {
  constructor() {
    super(ClientOpCode.RequestProfile, RequestProfilePacket);
  }
  serialize(writer: BinaryWriter, packet: RequestProfilePacket): void {
    //  Intentionally left blank
  }
  deserialize(reader: BinaryReader, packet: RequestProfilePacket): void {
    //  Intentionally left blank
  }
}

ClientPacketFactory.register(RequestProfileSerializer);
