import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class MenuPacket implements Packet {}

class MenuSerializer extends BasePacketSerializer<MenuPacket> {
  constructor() {
    super(ServerOpCode.Menu, MenuPacket);
  }

  serialize(writer: BinaryWriter, packet: MenuPacket) {
    throw new Error('Method not implemented.');
  }

  deserialize(reader: BinaryReader, packet: MenuPacket) {
    throw new Error('Method not implemented.');
  }
}

ServerPacketFactory.register(MenuSerializer);
