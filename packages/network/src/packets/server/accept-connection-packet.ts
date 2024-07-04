import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';

export class AcceptConnectionPacket implements Packet {
  constructor(public message: string) {}
  get opCode(): number {
    return ServerOpCode.AcceptConnection;
  }
  serialize(writer: BinaryWriter): void {
    writer.writeString(this.message);
  }
  deserialize(reader: BinaryReader): void {
    this.message = reader.readString();
  }
}
