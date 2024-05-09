import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class SynchronizeTicksPacket implements Packet {
  constructor(public ticks: number) {}
}

class SynchronizeTicksSerializer extends BasePacketSerializer<SynchronizeTicksPacket> {
  constructor() {
    super(ServerOpCode.SynchronizeTicks, SynchronizeTicksPacket);
  }

  serialize(writer: BinaryWriter, packet: SynchronizeTicksPacket) {
    writer.writeUint32(packet.ticks);
  }

  deserialize(reader: BinaryReader, packet: SynchronizeTicksPacket) {
    throw new Error('Method not implemented.');
  }
}

ServerPacketFactory.register(SynchronizeTicksSerializer);
