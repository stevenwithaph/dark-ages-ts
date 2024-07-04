import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';

export class SoundPacket implements Packet {
  constructor(
    public isMusic: boolean,
    public assetId: number
  ) {}
  get opCode(): number {
    return ServerOpCode.Sound;
  }
  serialize(writer: BinaryWriter): void {
    if (this.isMusic) {
      writer.writeUint8(255);
    }

    writer.writeUint8(this.assetId);
  }
  deserialize(reader: BinaryReader): void {
    this.isMusic = reader.readUint8() === 255;
    this.assetId = reader.readUint8();
  }
}
