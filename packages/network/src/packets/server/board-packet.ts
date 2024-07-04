import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';

export class BoardPacket implements Packet {
  get opCode(): number {
    return ServerOpCode.Board;
  }
  serialize(writer: BinaryWriter): void {
    throw new Error('Method not implemented.');
  }
  deserialize(reader: BinaryReader): void {
    throw new Error('Method not implemented.');
  }
}
