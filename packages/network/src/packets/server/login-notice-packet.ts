import { BinaryReader, Fields, Serializable } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';

export class LoginNoticePacket implements Packet {
  constructor(
    public hasMessage: boolean,
    public message: string,
    public messageCrc: number
  ) {}
  get opCode(): number {
    return ServerOpCode.LoginNotice;
  }
  serialize(writer: BinaryWriter): void {
    writer.writeBoolean(this.hasMessage);

    if (this.hasMessage) {
      Fields.CompressedConverter.serialize(Buffer.from(this.message), writer);
    } else {
      writer.writeUint32(this.messageCrc);
    }
  }
  deserialize(reader: BinaryReader): void {
    this.hasMessage = reader.readBoolean();

    if (this.hasMessage) {
      this.message = new TextDecoder().decode(Fields.CompressedConverter.deserialize(reader));
    } else {
      this.messageCrc = reader.readUint32();
    }
  }
}
