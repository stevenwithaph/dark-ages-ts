import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';

export class MapChangePendingPacket implements Packet {
  constructor() {}
  get opCode(): number {
    return ServerOpCode.MapChangePending;
  }
  serialize(writer: BinaryWriter): void {
    //  Intentionally left blank
  }
  deserialize(reader: BinaryReader): void {
    //  Intentionally left blank
  }
}
