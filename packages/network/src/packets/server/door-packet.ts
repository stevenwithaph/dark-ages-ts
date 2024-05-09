import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class DoorPacket implements Packet {}

class DoorSerializer extends BasePacketSerializer<DoorPacket> {
  constructor() {
    super(ServerOpCode.Door, DoorPacket);
  }

  serialize(writer: BinaryWriter, packet: DoorPacket) {
    throw new Error('Method not implemented.');
  }

  deserialize(reader: BinaryReader, packet: DoorPacket) {
    throw new Error('Method not implemented.');
  }
}

ServerPacketFactory.register(DoorSerializer);
