import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { ClickType } from '../../entities/click-type';

interface ClickTarget {
  id?: number;
  point?: {
    x: number;
    y: number;
  };
}

export class ClickPacket implements Packet {
  constructor(
    public type: ClickType,
    public target: ClickTarget
  ) {}

  get opCode(): number {
    return ClientOpCode.Click;
  }
  serialize(writer: BinaryWriter): void {
    writer.writeUint8(this.type);

    switch (this.type) {
      case ClickType.Id:
        writer.writeUint32(this.target.id ?? 0);
        break;
      case ClickType.Point:
        writer.writeUint8(this.target.point ? this.target.point.x : 0);
        writer.writeUint8(this.target.point ? this.target.point.y : 0);
        break;
    }
  }
  deserialize(reader: BinaryReader): void {
    this.type = reader.readUint8();

    switch (this.type) {
      case ClickType.Id:
        this.target = { id: reader.readUint32() };
        break;
      case ClickType.Point:
        this.target = {
          point: {
            x: reader.readUint8(),
            y: reader.readUint8(),
          },
        };
        break;
    }
  }
}
