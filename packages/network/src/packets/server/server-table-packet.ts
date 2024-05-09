import { ServerTable } from '../../entities/server-table';
import { BinaryReader, Fields } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class ServerTablePacket implements Packet {
  constructor(public serverTable: ServerTable) {}
}

class ServerTableSerializer extends BasePacketSerializer<ServerTablePacket> {
  constructor() {
    super(ServerOpCode.ServerTable, ServerTablePacket);
  }

  serialize(writer: BinaryWriter, packet: ServerTablePacket) {
    const tableWriter = new BinaryWriter();
    packet.serverTable.serialize(tableWriter);
    Fields.CompressedConverter.serialize(tableWriter.toArray(), writer);
  }

  deserialize(reader: BinaryReader, packet: ServerTablePacket) {
    const decompressed = Fields.CompressedConverter.deserialize(reader);

    const serverTable = new ServerTable();
    serverTable.deserialize(new BinaryReader(decompressed));

    packet.serverTable = serverTable;
  }
}

ServerPacketFactory.register(ServerTableSerializer);
