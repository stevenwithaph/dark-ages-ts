import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';

export class LoginPacket implements Packet {
  constructor(
    public username: string,
    public password: string
  ) {}
}

class LoginSerializer extends BasePacketSerializer<LoginPacket> {
  constructor() {
    super(ClientOpCode.Login, LoginPacket);
  }
  serialize(writer: BinaryWriter, packet: LoginPacket): void {
    writer.writeString8(packet.username);
    writer.writeString8(packet.password);
  }
  deserialize(reader: BinaryReader, packet: LoginPacket): void {
    packet.username = reader.readString8();
    packet.password = reader.readString8();
  }
}

ClientPacketFactory.register(LoginSerializer);
