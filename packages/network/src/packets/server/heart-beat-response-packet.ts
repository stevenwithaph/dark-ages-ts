import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class HeartBeatResponsePacket implements Packet {}

class HeartBeatResponseSerializer extends BasePacketSerializer<HeartBeatResponsePacket> {
  constructor() {
    super(ServerOpCode.HeartBeatResponse, HeartBeatResponsePacket);
  }

  serialize(writer: BinaryWriter, packet: HeartBeatResponsePacket) {
    throw new Error('Method not implemented.');
  }

  deserialize(reader: BinaryReader, packet: HeartBeatResponsePacket) {
    throw new Error('Method not implemented.');
  }
}

ServerPacketFactory.register(HeartBeatResponseSerializer);
