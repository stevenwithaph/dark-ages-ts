import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';

export class SynchronizeTicksPacket implements Packet {
  constructor(
    public serverTicks: number,
    public clientTicks: number
  ) {}
  get opCode(): number {
    return ClientOpCode.SynchronizeTicks;
  }
  serialize(writer: BinaryWriter): void {
    writer.writeUint32(this.serverTicks);
    writer.writeUint32(this.clientTicks);
  }
  deserialize(reader: BinaryReader): void {
    this.serverTicks = reader.readUint32();
    this.clientTicks = reader.readUint32();
  }
}
