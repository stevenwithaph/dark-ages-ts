import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';

export class UseSkillPacket implements Packet {}

class UseSkillSerializer extends BasePacketSerializer<UseSkillPacket> {
  constructor() {
    super(ClientOpCode.UseSkill, UseSkillPacket);
  }
  serialize(writer: BinaryWriter, packet: UseSkillPacket): void {
    throw new Error('Method not implemented.');
  }
  deserialize(reader: BinaryReader, packet: UseSkillPacket): void {
    throw new Error('Method not implemented.');
  }
}

ClientPacketFactory.register(UseSkillSerializer);
