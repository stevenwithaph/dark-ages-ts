import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';

export class ClientTurnPacket implements Packet {
  constructor(public direction: number) {}
}

class ClientTurnSerializer extends BasePacketSerializer<ClientTurnPacket> {
  constructor() {
    super(ClientOpCode.ClientTurn, ClientTurnPacket);
  }
  serialize(writer: BinaryWriter, packet: ClientTurnPacket): void {
    writer.writeUint8(packet.direction);
  }
  deserialize(reader: BinaryReader, packet: ClientTurnPacket): void {
    packet.direction = reader.readUint8();
  }
}

ClientPacketFactory.register(ClientTurnSerializer);
