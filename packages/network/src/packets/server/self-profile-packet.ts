import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class SelfProfilePacket implements Packet {
  constructor(
    public nationId: number,
    public guildRank: string,
    public title: string,
    public partyStatus: string,
    public canGroup: boolean,
    public classId: number,
    public className: string,
    public guildName: string,
    public marks: number,
    public gender: number
  ) {}
}

//  TODO: update this packet to https://github.com/Sichii/Chaos-Server/blob/12bbe4b8fb4d86e0d79bfe3e4647c03f72168ac3/Chaos.Networking/Converters/Server/SelfProfileConverter.cs
class SelfProfileSerializer extends BasePacketSerializer<SelfProfilePacket> {
  constructor() {
    super(ServerOpCode.SelfProfile, SelfProfilePacket);
  }

  serialize(writer: BinaryWriter, packet: SelfProfilePacket) {
    writer.writeUint8(packet.nationId);
    writer.writeString8(packet.guildRank);
    writer.writeString8(packet.title);
    writer.writeString8(packet.partyStatus);
    writer.writeBoolean(packet.canGroup);

    writer.offset += 1;

    writer.writeUint8(packet.classId);

    writer.offset += 2;

    writer.writeString8(packet.className);
    writer.writeString8(packet.guildName);
    writer.writeUint8(packet.marks);

    writer.offset += 1;

    //??
    writer.writeUint16(packet.gender);
  }

  deserialize(reader: BinaryReader, packet: SelfProfilePacket) {
    throw new Error('Method not implemented.');
  }
}

ServerPacketFactory.register(SelfProfileSerializer);
