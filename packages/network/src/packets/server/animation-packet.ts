import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

//  TODO: seperate this into two different animations
//  one targeted, one at a point
export class AnimationPacket implements Packet {
  constructor(
    public animationDuration: number,
    public sourceAnimationId?: number,
    public targetAnimationId?: number,
    public sourceId?: number,
    public targetId?: number,
    public targetX?: number,
    public targetY?: number
  ) {}
}

class AnimationSerializer extends BasePacketSerializer<AnimationPacket> {
  constructor() {
    super(ServerOpCode.Animation, AnimationPacket);
  }

  serialize(writer: BinaryWriter, packet: AnimationPacket) {
    if (packet.targetX && packet.targetY && packet.targetAnimationId) {
      writer.writeUint32(0);
      writer.writeUint16(packet.targetAnimationId);
      writer.writeUint16(packet.animationDuration);
      writer.writeUint8(packet.targetX);
      writer.writeUint8(packet.targetY);
    } else if (
      packet.sourceId &&
      packet.targetId &&
      packet.sourceAnimationId &&
      packet.targetAnimationId
    ) {
      writer.writeUint32(packet.targetId);
      writer.writeUint32(packet.sourceId);
      writer.writeUint16(packet.targetAnimationId);
      writer.writeUint16(packet.sourceAnimationId);
      writer.writeUint16(packet.animationDuration);
    }
  }

  deserialize(reader: BinaryReader, packet: AnimationPacket) {
    throw new Error('Method not implemented.');
  }
}

ServerPacketFactory.register(AnimationSerializer);
