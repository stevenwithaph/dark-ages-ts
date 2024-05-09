import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';

export class ClientWalkPacket implements Packet {
  constructor(
    public direction: number,
    public steps: number
  ) {}
}

class ClientWalkSerializer extends BasePacketSerializer<ClientWalkPacket> {
  constructor() {
    super(ClientOpCode.ClientWalk, ClientWalkPacket);
  }
  serialize(writer: BinaryWriter, packet: ClientWalkPacket): void {
    writer.writeUint8(packet.direction);
    writer.writeUint8(packet.steps);
  }
  deserialize(reader: BinaryReader, packet: ClientWalkPacket): void {
    packet.direction = reader.readUint8();
    packet.steps = reader.readUint8();
  }
}

ClientPacketFactory.register(ClientWalkSerializer);
