import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';

export class CharacterCreationFinalizePacket implements Packet {
  constructor(
    public hairStyle: number,
    public hairColour: number,
    public bodyType: number
  ) {}

  get opCode(): number {
    return ClientOpCode.CreateCharFinalize;
  }

  serialize(writer: BinaryWriter): void {
    writer.writeUint8(this.hairStyle);
    writer.writeUint8(this.bodyType);
    writer.writeUint8(this.hairColour);
  }
  deserialize(reader: BinaryReader): void {
    this.hairStyle = reader.readUint8();
    this.bodyType = reader.readUint8();
    this.hairColour = reader.readUint8();
  }
}
