import { LoginMessageType } from '../../entities';
import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';

export class LoginMessagePacket implements Packet {
  constructor(
    public type: LoginMessageType,
    public message: string
  ) {}
  get opCode(): number {
    return ServerOpCode.LoginMessage;
  }
  serialize(writer: BinaryWriter): void {
    writer.writeUint8(this.type);
    writer.writeString8(this.message);
  }
  deserialize(reader: BinaryReader): void {
    this.type = reader.readUint8();
    this.message = reader.readString8();
  }
}
