import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ChatMessageType } from '../../entities/chat-message-type';
import { ServerOpCode } from '../op-codes';

export class ChatMessagePacket implements Packet {
  constructor(
    public type: ChatMessageType,
    public entityId: number,
    public message: string
  ) {}
  get opCode(): number {
    return ServerOpCode.ChatMessage;
  }
  serialize(writer: BinaryWriter): void {
    writer.writeUint8(this.type);
    writer.writeUint32(this.entityId);
    writer.writeString8(this.message);
  }
  deserialize(reader: BinaryReader): void {
    this.type = reader.readUint8();
    this.entityId = reader.readUint32();
    this.message = reader.readString8();
  }
}
