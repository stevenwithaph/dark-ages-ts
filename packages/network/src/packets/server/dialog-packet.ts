import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class DialogPacket implements Packet {}

class DialogSerializer extends BasePacketSerializer<DialogPacket> {
  constructor() {
    super(ServerOpCode.Dialog, DialogPacket);
  }

  serialize(writer: BinaryWriter, packet: DialogPacket) {
    throw new Error('Method not implemented.');
  }

  deserialize(reader: BinaryReader, packet: DialogPacket) {
    throw new Error('Method not implemented.');
  }
}

ServerPacketFactory.register(DialogSerializer);
