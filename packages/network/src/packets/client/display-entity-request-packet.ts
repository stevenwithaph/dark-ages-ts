import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';

export class DisplayEntityRequestPacket implements Packet {}

class DisplayEntityRequestSerializer extends BasePacketSerializer<DisplayEntityRequestPacket> {
  constructor() {
    super(ClientOpCode.RequestDisplayEntity, DisplayEntityRequestPacket);
  }
  serialize(writer: BinaryWriter, packet: DisplayEntityRequestPacket): void {
    throw new Error('Method not implemented.');
  }
  deserialize(reader: BinaryReader, packet: DisplayEntityRequestPacket): void {
    throw new Error('Method not implemented.');
  }
}

ClientPacketFactory.register(DisplayEntityRequestSerializer);
