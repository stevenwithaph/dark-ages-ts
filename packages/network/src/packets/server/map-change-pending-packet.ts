import { BinaryReader, Fields } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class MapChangePendingPacket implements Packet {
  constructor() {}
}

class MapChangePendingSerializer extends BasePacketSerializer<MapChangePendingPacket> {
  constructor() {
    super(ServerOpCode.MapChangePending, MapChangePendingPacket);
  }

  serialize(writer: BinaryWriter, packet: MapChangePendingPacket) {
    //  Intentionally left blank
  }

  deserialize(reader: BinaryReader, packet: MapChangePendingPacket) {
    //  Intentionally left blank
  }
}

ServerPacketFactory.register(MapChangePendingSerializer);
