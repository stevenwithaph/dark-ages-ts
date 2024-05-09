import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';

export class RequestMapDataPacket implements Packet {}

class RequestMapDataSerializer extends BasePacketSerializer<RequestMapDataPacket> {
  constructor() {
    super(ClientOpCode.RequestMapData, RequestMapDataPacket);
  }
  serialize(writer: BinaryWriter, packet: RequestMapDataPacket): void {
    //  Intentionally left blank
  }
  deserialize(reader: BinaryReader, packet: RequestMapDataPacket): void {
    //  Intentionally left blank
  }
}

ClientPacketFactory.register(RequestMapDataSerializer);
