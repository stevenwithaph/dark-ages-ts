import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';

export class SynchronizeTicksPacket implements Packet {
  constructor(public ticks: number) {}
  get opCode(): number {
    return ServerOpCode.SynchronizeTicks;
  }
  serialize(writer: BinaryWriter): void {
    writer.writeUint32(this.ticks);
  }
  deserialize(reader: BinaryReader): void {
    throw new Error('Method not implemented.');
  }
}
