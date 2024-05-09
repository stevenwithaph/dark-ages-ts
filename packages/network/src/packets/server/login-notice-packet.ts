import { BinaryReader, Fields } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class LoginNoticePacket implements Packet {
  constructor(
    public hasMessage: boolean,
    public message: string,
    public messageCrc: number
  ) {}
}

class LoginNoticeSerializer extends BasePacketSerializer<LoginNoticePacket> {
  constructor() {
    super(ServerOpCode.LoginNotice, LoginNoticePacket);
  }

  serialize(writer: BinaryWriter, packet: LoginNoticePacket) {
    writer.writeBoolean(packet.hasMessage);

    if (packet.hasMessage) {
      Fields.CompressedConverter.serialize(Buffer.from(packet.message), writer);
    } else {
      writer.writeUint32(packet.messageCrc);
    }
  }

  deserialize(reader: BinaryReader, packet: LoginNoticePacket) {
    packet.hasMessage = reader.readBoolean();

    if (packet.hasMessage) {
      packet.message = new TextDecoder().decode(
        Fields.CompressedConverter.deserialize(reader)
      );
    } else {
      packet.messageCrc = reader.readUint32();
    }
  }
}

ServerPacketFactory.register(LoginNoticeSerializer);
