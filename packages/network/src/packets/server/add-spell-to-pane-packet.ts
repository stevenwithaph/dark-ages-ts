import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';

export class AddSpellToPanePacket implements Packet {
  constructor(
    public name: string,
    public slot: number,
    public iconId: number,
    public spellType: number,
    public prompt: string,
    public castLines: number
  ) {}

  get opCode(): number {
    return ServerOpCode.AddSpellToPane;
  }

  serialize(writer: BinaryWriter): void {
    writer.writeUint8(this.slot);
    writer.writeUint16(this.iconId);
    writer.writeUint8(this.spellType);
    writer.writeString8(this.name);
    writer.writeString8(this.prompt);

    writer.writeUint8(this.castLines);
  }
  deserialize(reader: BinaryReader): void {
    throw new Error('Method not implemented.');
  }
}
