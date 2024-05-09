import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';

export class BoardReqestPacket implements Packet {}

class BoardRequestSerializer extends BasePacketSerializer<BoardReqestPacket> {
  constructor() {
    super(ClientOpCode.BoardRequest, BoardReqestPacket);
  }
  serialize(writer: BinaryWriter, packet: BoardReqestPacket): void {
    throw new Error('Method not implemented.');
  }
  deserialize(reader: BinaryReader, packet: BoardReqestPacket): void {
    throw new Error('Method not implemented.');
  }
}

ClientPacketFactory.register(BoardRequestSerializer);
