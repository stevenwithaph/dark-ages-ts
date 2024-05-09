import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';

export class WorldMapClickPacket implements Packet {}

class WorldMapClickSerializer extends BasePacketSerializer<WorldMapClickPacket> {
  constructor() {
    super(ClientOpCode.WorldMapClick, WorldMapClickPacket);
  }
  serialize(writer: BinaryWriter, packet: WorldMapClickPacket): void {
    throw new Error('Method not implemented.');
  }
  deserialize(reader: BinaryReader, packet: WorldMapClickPacket): void {
    throw new Error('Method not implemented.');
  }
}

ClientPacketFactory.register(WorldMapClickSerializer);
