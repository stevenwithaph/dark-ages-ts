import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';

export class ClientWalkPacket implements Packet {
  constructor(
    public direction: number,
    public steps: number
  ) {}
  get opCode(): number {
    return ClientOpCode.ClientWalk;
  }
  serialize(writer: BinaryWriter): void {
    writer.writeUint8(this.direction);
    writer.writeUint8(this.steps);
  }
  deserialize(reader: BinaryReader): void {
    this.direction = reader.readUint8();
    this.steps = reader.readUint8();
  }
}
