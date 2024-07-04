import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';

export class GroupRequestPacket implements Packet {
  get opCode(): number {
    return ClientOpCode.GroupRequest;
  }
  serialize(writer: BinaryWriter): void {
    throw new Error('Method not implemented.');
  }
  deserialize(reader: BinaryReader): void {
    throw new Error('Method not implemented.');
  }
}
