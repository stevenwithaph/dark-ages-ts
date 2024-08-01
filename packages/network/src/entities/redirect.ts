import { BinaryReader, BinaryWriter, Serializable } from '@medenia/serialization';

export class Redirect implements Serializable {
  constructor(
    public seed: number,
    public key: string,
    public keySalts: string,
    public id: number,
    public subject: string
  ) {}

  serialize(writer: BinaryWriter): void {
    writer.writeUint8(this.seed);
    writer.writeString8(this.key);
    writer.writeString8(this.keySalts);
    writer.writeUint32(this.id);
  }
  deserialize(reader: BinaryReader): void {
    this.seed = reader.readUint8();
    this.key = reader.readString8();
    this.keySalts = reader.readString8();
    this.id = reader.readUint32();
  }
}
