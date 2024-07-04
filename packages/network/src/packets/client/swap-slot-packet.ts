import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { PanelType } from '../../entities/panel-type';

export class SwapSlotPacket implements Packet {
  constructor(
    public panelType: PanelType,
    public slot1: number,
    public slot2: number
  ) {}
  get opCode(): number {
    return ClientOpCode.SwapSlot;
  }
  serialize(writer: BinaryWriter): void {
    writer.writeUint8(this.panelType);
    writer.writeUint8(this.slot1);
    writer.writeUint8(this.slot2);
  }
  deserialize(reader: BinaryReader): void {
    this.panelType = reader.readUint8();
    this.slot1 = reader.readUint8();
    this.slot2 = reader.readUint8();
  }
}
