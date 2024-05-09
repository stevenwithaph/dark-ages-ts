import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class ConfirmExitPacket implements Packet {}

class ConfirmExitSerializer extends BasePacketSerializer<ConfirmExitPacket> {
  constructor() {
    super(ServerOpCode.ConfirmExit, ConfirmExitPacket);
  }

  serialize(writer: BinaryWriter, packet: ConfirmExitPacket) {
    throw new Error('Method not implemented.');
  }

  deserialize(reader: BinaryReader, packet: ConfirmExitPacket) {
    throw new Error('Method not implemented.');
  }
}

ServerPacketFactory.register(ConfirmExitSerializer);
