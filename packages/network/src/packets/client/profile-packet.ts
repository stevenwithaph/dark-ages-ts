import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';

export class ProfilePacket implements Packet {
  get opCode(): number {
    return ClientOpCode.Profile;
  }
  serialize(writer: BinaryWriter): void {
    writer.writeBytes(new Uint8Array([3, 0, 0, 0, 0, 0]));
  }

  deserialize(reader: BinaryReader): void {}
}
