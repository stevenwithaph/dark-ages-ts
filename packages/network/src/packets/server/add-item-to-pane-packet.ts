import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class AddItemToPanePacket implements Packet {}

class AddItemToPaneSerializer extends BasePacketSerializer<AddItemToPanePacket> {
  constructor() {
    super(ServerOpCode.AddItemToPane, AddItemToPanePacket);
  }

  serialize(writer: BinaryWriter, packet: AddItemToPanePacket) {
    throw new Error('Method not implemented.');
  }

  deserialize(reader: BinaryReader, packet: AddItemToPanePacket) {
    throw new Error('Method not implemented.');
  }
}

ServerPacketFactory.register(AddItemToPaneSerializer);
