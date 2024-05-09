import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class BoardPacket implements Packet {}

class BoardSerializer extends BasePacketSerializer<BoardPacket> {
  constructor() {
    super(ServerOpCode.Board, BoardPacket);
  }

  serialize(writer: BinaryWriter, packet: BoardPacket) {
    throw new Error('Method not implemented.');
  }

  deserialize(reader: BinaryReader, packet: BoardPacket) {
    throw new Error('Method not implemented.');
  }
}

ServerPacketFactory.register(BoardSerializer);
