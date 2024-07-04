import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';

export class BeginChantPacket implements Packet {
  constructor(public castLines: string) {}
  get opCode(): number {
    return ClientOpCode.BeginChant;
  }

  serialize(writer: BinaryWriter): void {
    writer.writeString8(this.castLines);
  }
  deserialize(reader: BinaryReader): void {
    this.castLines = reader.readString8();
  }
}
