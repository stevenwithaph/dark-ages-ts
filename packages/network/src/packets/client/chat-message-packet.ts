import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { ChatMessageType } from '../../entities';

export class ChatMessagePacket implements Packet {
  constructor(
    public type: ChatMessageType,
    public message: string
  ) {}
  get opCode(): number {
    return ClientOpCode.PublicMessage;
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
