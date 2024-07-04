import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';

export class ClientExceptionPacket implements Packet {
  get opCode(): number {
    return ClientOpCode.ClientException;
  }
  serialize(writer: BinaryWriter): void {
    throw new Error('Method not implemented.');
  }
  deserialize(reader: BinaryReader): void {
    throw new Error('Method not implemented.');
  }
}
