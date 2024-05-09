import { LoginMessageType } from '../../entities';
import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class LoginMessagePacket implements Packet {
  constructor(
    public type: LoginMessageType,
    public message: string
  ) {}
}

class LoginMessageSerializer extends BasePacketSerializer<LoginMessagePacket> {
  constructor() {
    super(ServerOpCode.LoginMessage, LoginMessagePacket);
  }

  serialize(writer: BinaryWriter, packet: LoginMessagePacket) {
    writer.writeUint8(packet.type);
    writer.writeString8(packet.message);
  }

  deserialize(reader: BinaryReader, packet: LoginMessagePacket) {
    packet.type = reader.readUint8();
    packet.message = reader.readString8();
  }
}

ServerPacketFactory.register(LoginMessageSerializer);
