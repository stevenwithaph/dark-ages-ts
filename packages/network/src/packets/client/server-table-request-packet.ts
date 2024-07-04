import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';

export class ServerTableRequestPacket implements Packet {
  constructor(
    public mismatch: boolean,
    public id: number
  ) {}
  get opCode(): number {
    return ClientOpCode.RequestServerTable;
  }
  serialize(writer: BinaryWriter): void {
    writer.writeBoolean(this.mismatch);
    writer.writeUint8(this.id);
  }
  deserialize(reader: BinaryReader): void {
    this.mismatch = reader.readBoolean();
    this.id = reader.readUint8();
  }
}
