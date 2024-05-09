import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class EffectPacket implements Packet {
  constructor(
    public colour: number,
    public icon: number
  ) {}
}

class EffectSerializer extends BasePacketSerializer<EffectPacket> {
  constructor() {
    super(ServerOpCode.Effect, EffectPacket);
  }

  serialize(writer: BinaryWriter, packet: EffectPacket) {
    writer.writeUint8(packet.colour);
    writer.writeUint8(packet.icon);
  }

  deserialize(reader: BinaryReader, packet: EffectPacket) {
    packet.colour = reader.readUint8();
    packet.icon = reader.readUint8();
  }
}

ServerPacketFactory.register(EffectSerializer);
