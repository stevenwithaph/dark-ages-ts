import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class ProfilePacket implements Packet {}

class ProfileSerializer extends BasePacketSerializer<ProfilePacket> {
  constructor() {
    super(ServerOpCode.Profile, ProfilePacket);
  }

  serialize(writer: BinaryWriter, packet: ProfilePacket) {
    throw new Error('Method not implemented.');
  }

  deserialize(reader: BinaryReader, packet: ProfilePacket) {
    throw new Error('Method not implemented.');
  }
}

ServerPacketFactory.register(ProfileSerializer);
