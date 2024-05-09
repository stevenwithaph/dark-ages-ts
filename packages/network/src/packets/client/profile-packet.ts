import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';

export class ProfilePacket implements Packet {}

class ProfileSerializer extends BasePacketSerializer<ProfilePacket> {
  constructor() {
    super(ClientOpCode.Profile, ProfilePacket);
  }
  serialize(writer: BinaryWriter, packet: ProfilePacket): void {
    throw new Error('Method not implemented.');
  }
  deserialize(reader: BinaryReader, packet: ProfilePacket): void {
    throw new Error('Method not implemented.');
  }
}

ClientPacketFactory.register(ProfileSerializer);
