import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class ConnectionInfoPacket implements Packet {
  constructor(
    public versionMismatch: boolean,
    public serverTableCrc: number,
    public seed: number,
    public key: string
  ) {}
}

class ConnectionInfoSerializer extends BasePacketSerializer<ConnectionInfoPacket> {
  constructor() {
    super(ServerOpCode.ConnectionInfo, ConnectionInfoPacket);
  }

  serialize(writer: BinaryWriter, packet: ConnectionInfoPacket) {
    writer.writeBoolean(packet.versionMismatch);
    writer.writeUint32(packet.serverTableCrc);
    writer.writeUint8(packet.seed);
    writer.writeString8(packet.key);
  }

  deserialize(reader: BinaryReader, packet: ConnectionInfoPacket) {
    packet.versionMismatch = reader.readBoolean();
    packet.serverTableCrc = reader.readUint32();
    packet.seed = reader.readUint8();
    packet.key = reader.readString8();
  }
}

ServerPacketFactory.register(ConnectionInfoSerializer);
