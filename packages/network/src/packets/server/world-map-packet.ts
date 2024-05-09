import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class WorldMapPacket implements Packet {}

class WorldMapSerializer extends BasePacketSerializer<WorldMapPacket> {
  constructor() {
    super(ServerOpCode.WorldMap, WorldMapPacket);
  }

  serialize(writer: BinaryWriter, packet: WorldMapPacket) {
    throw new Error('Method not implemented.');
  }

  deserialize(reader: BinaryReader, packet: WorldMapPacket) {
    throw new Error('Method not implemented.');
  }
}

ServerPacketFactory.register(WorldMapSerializer);
