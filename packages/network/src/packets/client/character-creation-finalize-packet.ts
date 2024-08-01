import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';

export class CharacterCreationFinalizePacket implements Packet {
  constructor(
    public hairStyle: number,
    public hairColour: number,
    public skinColour: number,
    public bodyType: number
  ) {}

  get opCode(): number {
    return ClientOpCode.CreateCharFinalize;
  }

  serialize(writer: BinaryWriter): void {
    writer.writeUint8(this.hairStyle);
    writer.writeUint8(this.bodyType);
    writer.writeUint8(this.hairColour);
    writer.writeUint8(this.skinColour);
  }
  deserialize(reader: BinaryReader): void {
    this.hairStyle = reader.readUint8();
    this.bodyType = reader.readUint8();
    this.hairColour = reader.readUint8();

    if (reader.remaining() > 0) {
      this.skinColour = reader.readUint8();
    } else {
      this.skinColour = 0;
    }
  }
}
