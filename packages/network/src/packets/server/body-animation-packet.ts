import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class BodyAnimationPacket implements Packet {
  constructor(
    public actorId: number,
    public animationId: number,
    public speed: number
  ) {}
}

class BodyAnimationSerializer extends BasePacketSerializer<BodyAnimationPacket> {
  constructor() {
    super(ServerOpCode.BodyAnimation, BodyAnimationPacket);
  }

  serialize(writer: BinaryWriter, packet: BodyAnimationPacket) {
    writer.writeUint32(packet.actorId);
    writer.writeUint8(packet.animationId);
    writer.writeUint16(packet.speed);
  }

  deserialize(reader: BinaryReader, packet: BodyAnimationPacket) {
    throw new Error('Method not implemented.');
  }
}

ServerPacketFactory.register(BodyAnimationSerializer);
