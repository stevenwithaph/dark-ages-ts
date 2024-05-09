import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';

export class UserOptionTogglePacket implements Packet {}

class UserOptionToggleSerializer extends BasePacketSerializer<UserOptionTogglePacket> {
  constructor() {
    super(ClientOpCode.UserOptionToggle, UserOptionTogglePacket);
  }
  serialize(writer: BinaryWriter, packet: UserOptionTogglePacket): void {
    throw new Error('Method not implemented.');
  }
  deserialize(reader: BinaryReader, packet: UserOptionTogglePacket): void {
    throw new Error('Method not implemented.');
  }
}

ClientPacketFactory.register(UserOptionToggleSerializer);
