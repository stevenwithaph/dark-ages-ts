import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';

export class ServerTableRequestPacket implements Packet {
  constructor(
    public serverListMismatch: boolean,
    public serverSelection: number
  ) {}
}

class ServerTableRequestPacketSerializer extends BasePacketSerializer<ServerTableRequestPacket> {
  constructor() {
    super(ClientOpCode.RequestServerTable, ServerTableRequestPacket);
  }
  serialize(writer: BinaryWriter, packet: ServerTableRequestPacket): void {
    writer.writeBoolean(packet.serverListMismatch);

    writer.writeUint8(packet.serverSelection);
  }
  deserialize(reader: BinaryReader, packet: ServerTableRequestPacket): void {
    packet.serverListMismatch = reader.readBoolean();
    packet.serverSelection = reader.readUint8();
  }
}

ClientPacketFactory.register(ServerTableRequestPacketSerializer);
