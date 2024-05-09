import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';
import { MetaDataRequestType } from '../../entities/meta-data-request-type';

export class MetaDataRequestPacket implements Packet {
  constructor(
    public type: MetaDataRequestType,
    public name?: string
  ) {}
}

class MetaDataRequestPacketSerializer extends BasePacketSerializer<MetaDataRequestPacket> {
  constructor() {
    super(ClientOpCode.RequestMetaData, MetaDataRequestPacket);
  }

  serialize(writer: BinaryWriter, packet: MetaDataRequestPacket): void {
    writer.writeUint8(packet.type);

    switch (packet.type) {
      case MetaDataRequestType.DataByName:
        if (packet.name) {
          writer.writeString8(packet.name);
        }
        break;
      case MetaDataRequestType.AllCheckSum:
        break;
    }
  }

  deserialize(reader: BinaryReader, packet: MetaDataRequestPacket): void {
    packet.type = reader.readUint8();
    switch (packet.type) {
      case MetaDataRequestType.DataByName:
        packet.name = reader.readString8();
        break;
      case MetaDataRequestType.AllCheckSum:
        break;
    }
  }
}

ClientPacketFactory.register(MetaDataRequestPacketSerializer);
