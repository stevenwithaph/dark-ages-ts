import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class ForceClientPacket implements Packet {}

class ForceClientSerializer extends BasePacketSerializer<ForceClientPacket> {
  constructor() {
    super(ServerOpCode.ForceClient, ForceClientPacket);
  }

  serialize(writer: BinaryWriter, packet: ForceClientPacket) {
    throw new Error('Method not implemented.');
  }

  deserialize(reader: BinaryReader, packet: ForceClientPacket) {
    throw new Error('Method not implemented.');
  }
}

ServerPacketFactory.register(ForceClientSerializer);
