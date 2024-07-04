import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { EquipmentSlot } from '../../entities/equipment-slot';

export class EquipmentPacket implements Packet {
  constructor(
    public slot: EquipmentSlot,
    public sprite: number,
    public color: number,
    public name: string,
    public durability: number,
    public maxDurability: number
  ) {}
  get opCode(): number {
    return ServerOpCode.Equipment;
  }
  serialize(writer: BinaryWriter): void {
    writer.writeUint8(this.slot);
    writer.writeUint16(this.sprite);
    writer.writeUint8(this.slot);
    writer.writeString8(this.name);

    writer.offset += 1;

    writer.writeUint32(this.durability);
    writer.writeUint32(this.maxDurability);
  }
  deserialize(reader: BinaryReader): void {
    this.slot = reader.readUint8();
    this.sprite = reader.readUint16();
    this.slot = reader.readUint8();
    this.name = reader.readString8();

    reader.offset += 1;

    this.durability = reader.readUint32();
    this.maxDurability = reader.readUint32();
  }
}
