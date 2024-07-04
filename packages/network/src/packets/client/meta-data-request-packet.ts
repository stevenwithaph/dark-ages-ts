import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { MetaDataRequestType } from '../../entities/meta-data-request-type';

export class MetaDataRequestPacket implements Packet {
  constructor(
    public type: MetaDataRequestType,
    public name?: string
  ) {}
  get opCode(): number {
    return ClientOpCode.RequestMetaData;
  }
  serialize(writer: BinaryWriter): void {
    writer.writeUint8(this.type);

    switch (this.type) {
      case MetaDataRequestType.DataByName:
        if (this.name) {
          writer.writeString8(this.name);
        }
        break;
      case MetaDataRequestType.AllCheckSum:
        break;
    }
  }
  deserialize(reader: BinaryReader): void {
    this.type = reader.readUint8();
    switch (this.type) {
      case MetaDataRequestType.DataByName:
        this.name = reader.readString8();
        break;
      case MetaDataRequestType.AllCheckSum:
        break;
    }
  }
}
