import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';

export class PasswordChangePacket implements Packet {}

class PasswordChangeSerializer extends BasePacketSerializer<PasswordChangePacket> {
  constructor() {
    super(ClientOpCode.PasswordChange, PasswordChangePacket);
  }
  serialize(writer: BinaryWriter, packet: PasswordChangePacket): void {
    throw new Error('Method not implemented.');
  }
  deserialize(reader: BinaryReader, packet: PasswordChangePacket): void {
    throw new Error('Method not implemented.');
  }
}

ClientPacketFactory.register(PasswordChangeSerializer);
