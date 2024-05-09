import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class HealthBarPacket implements Packet {
  constructor(
    public actorId: number,
    public percent: number
  ) {}
}

class HealthBarSerializer extends BasePacketSerializer<HealthBarPacket> {
  constructor() {
    super(ServerOpCode.HealthBar, HealthBarPacket);
  }

  serialize(writer: BinaryWriter, packet: HealthBarPacket) {
    writer.writeUint32(packet.actorId);
    writer.offset += 1;
    writer.writeUint8(packet.percent);
    //  Only up to 127 can be played here
    writer.writeUint8(255);
  }

  deserialize(reader: BinaryReader, packet: HealthBarPacket) {
    throw new Error('Method not implemented.');
  }
}

ServerPacketFactory.register(HealthBarSerializer);
