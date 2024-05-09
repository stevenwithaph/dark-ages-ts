import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class CooldownPacket implements Packet {
  constructor(
    public isSkill: boolean,
    public slot: number,
    public seconds: number
  ) {}
}

class CooldownSerializer extends BasePacketSerializer<CooldownPacket> {
  constructor() {
    super(ServerOpCode.Cooldown, CooldownPacket);
  }

  serialize(writer: BinaryWriter, packet: CooldownPacket) {
    writer.writeBoolean(packet.isSkill);
    writer.writeUint8(packet.slot);
    writer.writeUint32(packet.seconds);
  }

  deserialize(reader: BinaryReader, packet: CooldownPacket) {
    throw new Error('Method not implemented.');
  }
}

ServerPacketFactory.register(CooldownSerializer);
