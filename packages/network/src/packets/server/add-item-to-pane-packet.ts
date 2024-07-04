import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';

export class AddItemToPanePacket implements Packet {
  constructor(
    public slot: number,
    public sprite: number,
    public name: string,
    public count: number,
    public stackable: boolean,
    public durability: number,
    public currentDurability: number
  ) {}
  get opCode(): number {
    return ServerOpCode.AddItemToPane;
  }
  serialize(writer: BinaryWriter): void {
    writer.writeUint8(this.slot);
    writer.writeUint16(this.sprite);

    writer.offset += 1;

    writer.writeString8(this.name);
    writer.writeUint32(this.count);
    writer.writeBoolean(this.stackable);
    writer.writeUint32(this.durability);
    writer.writeUint32(this.currentDurability);
  }
  deserialize(reader: BinaryReader): void {
    this.slot = reader.readUint8();
    this.sprite = reader.readUint16();

    reader.offset += 1;

    this.name = reader.readString8();
    this.count = reader.readUint32();
    this.stackable = reader.readBoolean();
    this.durability = reader.readUint32();
    this.currentDurability = reader.readUint32();
  }
}
