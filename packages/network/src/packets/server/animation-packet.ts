import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';

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
  get opCode(): number {
    return ServerOpCode.Animation;
  }
  serialize(writer: BinaryWriter): void {
    if (this.targetX && this.targetY && this.targetAnimationId) {
      writer.writeUint32(0);
      writer.writeUint16(this.targetAnimationId);
      writer.writeUint16(this.animationDuration);
      writer.writeUint8(this.targetX);
      writer.writeUint8(this.targetY);
    } else if (this.sourceId && this.targetId && this.sourceAnimationId && this.targetAnimationId) {
      writer.writeUint32(this.targetId);
      writer.writeUint32(this.sourceId);
      writer.writeUint16(this.targetAnimationId);
      writer.writeUint16(this.sourceAnimationId);
      writer.writeUint16(this.animationDuration);
    }
  }
  deserialize(reader: BinaryReader): void {
    throw new Error('Method not implemented.');
  }
}
