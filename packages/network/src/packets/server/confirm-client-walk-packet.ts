import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

//  TODO: I don't think this packet does anything
export class ConfirmClientWalkPacket implements Packet {
  constructor(
    public direction: number,
    public x: number,
    public y: number
  ) {}
}

class ConfirmClientWalkSerializer extends BasePacketSerializer<ConfirmClientWalkPacket> {
  constructor() {
    super(ServerOpCode.ConfirmClientWalk, ConfirmClientWalkPacket);
  }

  serialize(writer: BinaryWriter, packet: ConfirmClientWalkPacket) {
    writer.writeUint8(packet.direction);
    writer.writeUint8(packet.x);
    writer.writeUint8(packet.y);

    writer.writeUint16(11);
    writer.writeUint16(11);
    writer.writeUint8(1);
  }

  deserialize(reader: BinaryReader, packet: ConfirmClientWalkPacket) {
    packet.direction = reader.readUint8();
    packet.x = reader.readUint8();
    packet.y = reader.readUint8();
  }
}

ServerPacketFactory.register(ConfirmClientWalkSerializer);
