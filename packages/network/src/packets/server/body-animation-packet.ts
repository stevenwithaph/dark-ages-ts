import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';

export class BodyAnimationPacket implements Packet {
  constructor(
    public actorId: number,
    public animationId: number,
    public speed: number
  ) {}
  get opCode(): number {
    return ServerOpCode.BodyAnimation;
  }
  serialize(writer: BinaryWriter): void {
    writer.writeUint32(this.actorId);
    writer.writeUint8(this.animationId);
    writer.writeUint16(this.speed);
    writer.writeUint8(3);
  }
  deserialize(reader: BinaryReader): void {
    throw new Error('Method not implemented.');
  }
}
