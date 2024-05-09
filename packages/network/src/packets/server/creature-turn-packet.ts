import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class CreatureTurnPacket implements Packet {
  constructor(
    public entityId: number,
    public direction: number
  ) {}
}

class CreatureTurnSerializer extends BasePacketSerializer<CreatureTurnPacket> {
  constructor() {
    super(ServerOpCode.CreatureTurn, CreatureTurnPacket);
  }

  serialize(writer: BinaryWriter, packet: CreatureTurnPacket) {
    writer.writeUint32(packet.entityId);
    writer.writeUint8(packet.direction);
  }

  deserialize(reader: BinaryReader, packet: CreatureTurnPacket) {
    packet.entityId = reader.readUint32();
    packet.direction = reader.readUint8();
  }
}

ServerPacketFactory.register(CreatureTurnSerializer);
