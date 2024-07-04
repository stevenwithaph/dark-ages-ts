import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';

export class LoginPacket implements Packet {
  constructor(
    public username: string,
    public password: string
  ) {}
  get opCode(): number {
    return ClientOpCode.Login;
  }
  serialize(writer: BinaryWriter): void {
    writer.writeString8(this.username);
    writer.writeString8(this.password);
  }
  deserialize(reader: BinaryReader): void {
    this.username = reader.readString8();
    this.password = reader.readString8();
  }
}
