import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class AddSkillToPanePacket implements Packet {
  constructor(
    public name: string,
    public slot: number,
    public iconId: number
  ) {}
}

class AddSkillToPaneSerializer extends BasePacketSerializer<AddSkillToPanePacket> {
  constructor() {
    super(ServerOpCode.AddSkillToPane, AddSkillToPanePacket);
  }

  serialize(writer: BinaryWriter, packet: AddSkillToPanePacket) {
    writer.writeUint8(packet.slot);
    writer.writeUint16(packet.iconId);
    writer.writeString8(packet.name);
  }

  deserialize(reader: BinaryReader, packet: AddSkillToPanePacket) {
    throw new Error('Method not implemented.');
  }
}

ServerPacketFactory.register(AddSkillToPaneSerializer);
