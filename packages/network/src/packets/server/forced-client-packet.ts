import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';

export class ForceClientPacket implements Packet {
  constructor(public bytes: Uint8Array) {}
  get opCode(): number {
    return ServerOpCode.ForceClient;
  }
  serialize(writer: BinaryWriter): void {
    writer.writeBytes16(this.bytes);
  }
  deserialize(reader: BinaryReader): void {
    this.bytes = reader.readBytes16();
  }
}
