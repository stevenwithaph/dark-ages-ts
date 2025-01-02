import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';

export class RequestProfilePacket implements Packet {
  get opCode(): number {
    return ClientOpCode.RequestProfile;
  }
  serialize(writer: BinaryWriter): void {}
  deserialize(reader: BinaryReader): void {}
}
