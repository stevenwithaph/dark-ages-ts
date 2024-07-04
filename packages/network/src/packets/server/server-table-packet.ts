import { BinaryReader, Fields, Serializable } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { ServerTable } from '../../entities/server-table';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';

export class ServerTablePacket implements Packet {
  constructor(public serverTable: ServerTable) {}
  get opCode(): number {
    return ServerOpCode.ServerTable;
  }
  serialize(writer: BinaryWriter): void {
    const tableWriter = new BinaryWriter();
    this.serverTable.serialize(tableWriter);
    Fields.CompressedConverter.serialize(tableWriter.toArray(), writer);
  }
  deserialize(reader: BinaryReader): void {
    const decompressed = Fields.CompressedConverter.deserialize(reader);

    const serverTable = new ServerTable();
    serverTable.deserialize(new BinaryReader(decompressed));

    this.serverTable = serverTable;
  }
}
