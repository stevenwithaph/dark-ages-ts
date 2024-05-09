import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class AcceptConnectionPacket implements Packet {
  constructor(public message: string) {}
}

class AcceptConnectionSerializer extends BasePacketSerializer<AcceptConnectionPacket> {
  constructor() {
    super(ServerOpCode.AcceptConnection, AcceptConnectionPacket);
  }

  serialize(writer: BinaryWriter, packet: AcceptConnectionPacket) {
    writer.writeString(packet.message);
  }

  deserialize(reader: BinaryReader, packet: AcceptConnectionPacket) {
    packet.message = reader.readString();
  }
}

ServerPacketFactory.register(AcceptConnectionSerializer);
