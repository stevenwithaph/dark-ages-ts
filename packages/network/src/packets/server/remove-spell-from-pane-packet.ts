import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';

export class RemoveSpellFromPanePacket implements Packet {
  constructor(public slot: number) {}
  get opCode(): number {
    return ServerOpCode.RemoveSpellFromPane;
  }
  serialize(writer: BinaryWriter): void {
    writer.writeUint8(this.slot);
  }
  deserialize(reader: BinaryReader): void {
    this.slot = reader.readUint8();
  }
}
