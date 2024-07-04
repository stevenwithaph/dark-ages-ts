import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';

export class ConnectionInfoPacket implements Packet {
  constructor(
    public versionMismatch: boolean,
    public serverTableCrc: number,
    public seed: number,
    public key: string
  ) {}
  get opCode(): number {
    return ServerOpCode.ConnectionInfo;
  }
  serialize(writer: BinaryWriter): void {
    writer.writeBoolean(this.versionMismatch);
    writer.writeUint32(this.serverTableCrc);
    writer.writeUint8(this.seed);
    writer.writeString8(this.key);
  }
  deserialize(reader: BinaryReader): void {
    this.versionMismatch = reader.readBoolean();
    this.serverTableCrc = reader.readUint32();
    this.seed = reader.readUint8();
    this.key = reader.readString8();
  }
}
