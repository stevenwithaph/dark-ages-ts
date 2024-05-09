import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';

export class GroupRequestPacket implements Packet {}

class GroupRequestSerializer extends BasePacketSerializer<GroupRequestPacket> {
  constructor() {
    super(ClientOpCode.GroupRequest, GroupRequestPacket);
  }
  serialize(writer: BinaryWriter, packet: GroupRequestPacket): void {
    throw new Error('Method not implemented.');
  }
  deserialize(reader: BinaryReader, packet: GroupRequestPacket): void {
    throw new Error('Method not implemented.');
  }
}

ClientPacketFactory.register(GroupRequestSerializer);
