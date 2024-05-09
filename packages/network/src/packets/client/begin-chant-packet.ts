import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';

export class BeginChantPacket implements Packet {
  constructor(public castLines: string) {}
}

class BeginChantSerializer extends BasePacketSerializer<BeginChantPacket> {
  constructor() {
    super(ClientOpCode.BeginChant, BeginChantPacket);
  }

  serialize(writer: BinaryWriter, packet: BeginChantPacket) {
    writer.writeString8(packet.castLines);
  }

  deserialize(reader: BinaryReader, packet: BeginChantPacket) {
    throw new Error('Method not implemented.');
  }
}

ClientPacketFactory.register(BeginChantSerializer);
