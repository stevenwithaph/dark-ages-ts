import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { Redirect } from '../../entities';

export class ClientRedirectedPacket implements Packet {
  constructor(public redirect: Redirect) {}

  get opCode(): number {
    return ClientOpCode.ClientRedirected;
  }
  serialize(writer: BinaryWriter): void {
    writer.writeSerializable(this.redirect);
  }
  deserialize(reader: BinaryReader): void {
    this.redirect = reader.readSerializable(Redirect);
  }
}
