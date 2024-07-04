import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';

export class VersionPacket implements Packet {
  constructor(public version: number) {}
  get opCode(): number {
    return ClientOpCode.Version;
  }
  serialize(writer: BinaryWriter): void {
    writer.writeUint16(this.version);
  }
  deserialize(reader: BinaryReader): void {
    this.version = reader.readUint16();
  }
}
