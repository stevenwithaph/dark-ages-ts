import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class SoundPacket implements Packet {
  constructor(
    public isMusic: boolean,
    public assetId: number
  ) {}
}

class SoundPacketSerializer extends BasePacketSerializer<SoundPacket> {
  constructor() {
    super(ServerOpCode.Sound, SoundPacket);
  }

  serialize(writer: BinaryWriter, packet: SoundPacket) {
    if (packet.isMusic) {
      writer.writeUint8(255);
    }

    writer.writeUint8(packet.assetId);
  }

  deserialize(reader: BinaryReader, packet: SoundPacket) {
    packet.isMusic = reader.readUint8() === 255;
    packet.assetId = reader.readUint8();
  }
}

ServerPacketFactory.register(SoundPacketSerializer);
