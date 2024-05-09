import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class ServerMessagePacket implements Packet {}

class ServerMessageSerializer extends BasePacketSerializer<ServerMessagePacket> {
  constructor() {
    super(ServerOpCode.ServerMessage, ServerMessagePacket);
  }

  serialize(writer: BinaryWriter, packet: ServerMessagePacket) {
    throw new Error('Method not implemented.');
  }

  deserialize(reader: BinaryReader, packet: ServerMessagePacket) {
    throw new Error('Method not implemented.');
  }
}

ServerPacketFactory.register(ServerMessageSerializer);
