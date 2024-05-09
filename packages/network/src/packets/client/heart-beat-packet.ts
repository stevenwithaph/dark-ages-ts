import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';

export class HeartBeatPacket implements Packet {}

class HeartBeatSerializer extends BasePacketSerializer<HeartBeatPacket> {
  constructor() {
    super(ClientOpCode.HeartBeat, HeartBeatPacket);
  }
  serialize(writer: BinaryWriter, packet: HeartBeatPacket): void {
    throw new Error('Method not implemented.');
  }
  deserialize(reader: BinaryReader, packet: HeartBeatPacket): void {
    throw new Error('Method not implemented.');
  }
}

ClientPacketFactory.register(HeartBeatSerializer);
