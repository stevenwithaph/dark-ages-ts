import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';

export class MetaDataPacket implements Packet {
  get opCode(): number {
    return ServerOpCode.MetaData;
  }
  serialize(writer: BinaryWriter): void {
    //TODO
  }
  deserialize(reader: BinaryReader): void {
    //TODO
  }
}
