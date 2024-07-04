import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';

export class CooldownPacket implements Packet {
  constructor(
    public isSkill: boolean,
    public slot: number,
    public seconds: number
  ) {}
  get opCode(): number {
    return ServerOpCode.Cooldown;
  }
  serialize(writer: BinaryWriter): void {
    writer.writeBoolean(this.isSkill);
    writer.writeUint8(this.slot);
    writer.writeUint32(this.seconds);
  }
  deserialize(reader: BinaryReader): void {
    throw new Error('Method not implemented.');
  }
}
