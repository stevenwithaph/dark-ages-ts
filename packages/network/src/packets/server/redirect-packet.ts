import { Redirect } from '../../entities';
import { BinaryReader, Fields } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class RedirectPacket implements Packet {
  constructor(
    public ip: string,
    public port: number,
    public redirect: Redirect
  ) {}
}

class RedirectSerializer extends BasePacketSerializer<RedirectPacket> {
  constructor() {
    super(ServerOpCode.Redirect, RedirectPacket);
  }

  serialize(writer: BinaryWriter, packet: RedirectPacket) {
    Fields.IpAddressConverter.serialize(packet.ip, writer);
    writer.writeUint16(packet.port);

    const redirectWriter = new BinaryWriter();
    packet.redirect.serialize(redirectWriter);

    writer.writeBytes8(redirectWriter.toArray());
  }

  deserialize(reader: BinaryReader, packet: RedirectPacket) {
    packet.ip = Fields.IpAddressConverter.deserialize(reader);
    packet.port = reader.readUint16();

    reader.offset += 1;

    packet.redirect = reader.readSerializable(Redirect);
  }
}

ServerPacketFactory.register(RedirectSerializer);
