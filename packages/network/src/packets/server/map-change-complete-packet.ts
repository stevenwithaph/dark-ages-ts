import { BinaryReader, Fields } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class MapChangeCompletePacket implements Packet {
  constructor() {}
}

class MapChangeCompleteSerializer extends BasePacketSerializer<MapChangeCompletePacket> {
  constructor() {
    super(ServerOpCode.MapChangeComplete, MapChangeCompletePacket);
  }

  serialize(writer: BinaryWriter, packet: MapChangeCompletePacket) {
    //  Intentionally left blank
  }

  deserialize(reader: BinaryReader, packet: MapChangeCompletePacket) {
    //  Intentionally left blank
  }
}

ServerPacketFactory.register(MapChangeCompleteSerializer);
