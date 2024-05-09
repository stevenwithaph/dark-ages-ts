import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class LoginControlsPacket implements Packet {}

class LoginControlsPacketSerializer extends BasePacketSerializer<LoginControlsPacket> {
  constructor() {
    super(ServerOpCode.LoginControls, LoginControlsPacket);
  }

  serialize(writer: BinaryWriter, packet: LoginControlsPacket) {
    throw new Error('Method Not Implemented');
  }

  deserialize(reader: BinaryReader, packet: LoginControlsPacket) {
    throw new Error('Method Not Implemented');
  }
}

ServerPacketFactory.register(LoginControlsPacketSerializer);
