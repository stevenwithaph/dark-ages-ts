import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';

export class MapChangeCompletePacket implements Packet {
  constructor() {}
  get opCode(): number {
    return ServerOpCode.MapChangeComplete;
  }
  serialize(writer: BinaryWriter): void {
    //  Intentionally left blank
  }
  deserialize(reader: BinaryReader): void {
    //  Intentionally left blank
  }
}
