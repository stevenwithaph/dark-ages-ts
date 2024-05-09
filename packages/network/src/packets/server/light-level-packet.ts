import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class LightLevelPacket implements Packet {}

class LightLevelSerializer extends BasePacketSerializer<LightLevelPacket> {
  constructor() {
    super(ServerOpCode.LightLevel, LightLevelPacket);
  }

  serialize(writer: BinaryWriter, packet: LightLevelPacket) {
    throw new Error('Method not implemented.');
  }

  deserialize(reader: BinaryReader, packet: LightLevelPacket) {
    throw new Error('Method not implemented.');
  }
}

ServerPacketFactory.register(LightLevelSerializer);
