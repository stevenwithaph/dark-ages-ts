import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class RemoveSkillFromPanePacket implements Packet {}

class RemoveSkillFromPaneSerializer extends BasePacketSerializer<RemoveSkillFromPanePacket> {
  constructor() {
    super(ServerOpCode.RemoveSkillFromPane, RemoveSkillFromPanePacket);
  }

  serialize(writer: BinaryWriter, packet: RemoveSkillFromPanePacket) {
    throw new Error('Method not implemented.');
  }

  deserialize(reader: BinaryReader, packet: RemoveSkillFromPanePacket) {
    throw new Error('Method not implemented.');
  }
}

ServerPacketFactory.register(RemoveSkillFromPaneSerializer);
