import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class WorldListPacket implements Packet {}

class WorldListSerializer extends BasePacketSerializer<WorldListPacket> {
  constructor() {
    super(ServerOpCode.WorldList, WorldListPacket);
  }

  serialize(writer: BinaryWriter, packet: WorldListPacket) {
    throw new Error('Method not implemented.');
  }

  deserialize(reader: BinaryReader, packet: WorldListPacket) {
    throw new Error('Method not implemented.');
  }
}

ServerPacketFactory.register(WorldListSerializer);
