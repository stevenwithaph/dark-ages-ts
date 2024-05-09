import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';

export class ClientRedirectedPacket implements Packet {
  constructor(
    public seed: number,
    public key: string,
    public keySalts: string,
    public id: number
  ) {}
}

class ClientRedirectedSerializer extends BasePacketSerializer<ClientRedirectedPacket> {
  constructor() {
    super(ClientOpCode.ClientRedirected, ClientRedirectedPacket);
  }
  serialize(writer: BinaryWriter, packet: ClientRedirectedPacket): void {
    writer.writeUint8(packet.seed);
    writer.writeString8(packet.key);
    writer.writeString8(packet.keySalts);
    writer.writeUint8(packet.id);
  }
  deserialize(reader: BinaryReader, packet: ClientRedirectedPacket): void {
    packet.seed = reader.readUint8();
    packet.key = reader.readString8();
    packet.keySalts = reader.readString8();
    packet.id = reader.readUint8();
  }
}

ClientPacketFactory.register(ClientRedirectedSerializer);
