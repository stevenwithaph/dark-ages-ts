import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class UserIdPacket implements Packet {
  constructor(
    public userId: number,
    public direction: number,
    public classId: number
  ) {}
}

class UserIdSerializer extends BasePacketSerializer<UserIdPacket> {
  constructor() {
    super(ServerOpCode.UserId, UserIdPacket);
  }

  serialize(writer: BinaryWriter, packet: UserIdPacket) {
    writer.writeUint32(packet.userId);
    writer.writeUint8(packet.direction);

    //  if these are removed, occasionally the client will not recongize their aisling
    writer.writeUint8(0);
    writer.writeUint8(packet.classId);
    writer.writeUint8(0);
    writer.writeUint8(0);
    writer.writeUint8(0);
  }

  deserialize(reader: BinaryReader, packet: UserIdPacket) {
    packet.userId = reader.readUint32();
    packet.direction = reader.readUint8();
  }
}

ServerPacketFactory.register(UserIdSerializer);
