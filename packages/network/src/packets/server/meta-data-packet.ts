import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class MetaDataPacket implements Packet {}

class MetaDataSerializer extends BasePacketSerializer<MetaDataPacket> {
  constructor() {
    super(ServerOpCode.MetaData, MetaDataPacket);
  }

  serialize(writer: BinaryWriter, packet: MetaDataPacket) {
    //TODO
    //throw new Error('Method not implemented.');
  }

  deserialize(reader: BinaryReader, packet: MetaDataPacket) {
    //TODO
    //throw new Error('Method not implemented.');
  }
}

ServerPacketFactory.register(MetaDataSerializer);
