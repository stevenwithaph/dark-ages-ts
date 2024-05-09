import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class CreatureWalkPacket implements Packet {
  constructor(
    public actorId: number,
    public fromX: number,
    public fromY: number,
    public direction: number
  ) {}
}

class CreatureWalkSerializer extends BasePacketSerializer<CreatureWalkPacket> {
  constructor() {
    super(ServerOpCode.CreatureWalk, CreatureWalkPacket);
  }

  serialize(writer: BinaryWriter, packet: CreatureWalkPacket) {
    writer.writeUint32(packet.actorId);
    writer.writeUint16(packet.fromX);
    writer.writeUint16(packet.fromY);
    writer.writeUint8(packet.direction);
  }

  deserialize(reader: BinaryReader, packet: CreatureWalkPacket) {
    packet.actorId = reader.readUint32();
    packet.fromX = reader.readUint16();
    packet.fromY = reader.readUint16();
    packet.direction = reader.readUint8();
  }
}

ServerPacketFactory.register(CreatureWalkSerializer);
