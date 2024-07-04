import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';

export class CharacterCreationRequestPacket implements Packet {
  constructor(
    public name: string,
    public password: string
  ) {}
  get opCode(): number {
    return ClientOpCode.CreateCharRequest;
  }
  serialize(writer: BinaryWriter): void {
    writer.writeString8(this.name);
    writer.writeString8(this.password);
  }
  deserialize(reader: BinaryReader): void {
    this.name = reader.readString8();
    this.password = reader.readString8();
  }
}
