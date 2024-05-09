import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class GroupRequestPacket implements Packet {}

class GroupRequestSerializer extends BasePacketSerializer<GroupRequestPacket> {
  constructor() {
    super(ServerOpCode.GroupRequest, GroupRequestPacket);
  }

  serialize(writer: BinaryWriter, packet: GroupRequestPacket) {
    throw new Error('Method not implemented.');
  }

  deserialize(reader: BinaryReader, packet: GroupRequestPacket) {
    throw new Error('Method not implemented.');
  }
}

ServerPacketFactory.register(GroupRequestSerializer);
