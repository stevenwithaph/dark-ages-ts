import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';

export class RequestMapDataPacket implements Packet {
  get opCode(): number {
    return ClientOpCode.RequestMapData;
  }
  serialize(writer: BinaryWriter): void {
    // Intentionally left blank
  }
  deserialize(reader: BinaryReader): void {
    // Intentionally left blank
  }
}
