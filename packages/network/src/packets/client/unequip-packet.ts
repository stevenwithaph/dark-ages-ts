import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { EquipmentSlot } from '../../entities/equipment-slot';

export class UnequipPacket implements Packet {
  constructor(public slot: EquipmentSlot) {}
  get opCode(): number {
    return ClientOpCode.Unequip;
  }
  serialize(writer: BinaryWriter): void {
    writer.writeUint8(this.slot);
  }
  deserialize(reader: BinaryReader): void {
    this.slot = reader.readUint8();
  }
}
