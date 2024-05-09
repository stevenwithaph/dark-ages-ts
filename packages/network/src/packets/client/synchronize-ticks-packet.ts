import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';

export class SynchronizeTicksPacket implements Packet {
  constructor(
    public serverTicks: number,
    public clientTicks: number
  ) {}
}

class SynchronizeTicksSerializer extends BasePacketSerializer<SynchronizeTicksPacket> {
  constructor() {
    super(ClientOpCode.SynchronizeTicks, SynchronizeTicksPacket);
  }
  serialize(writer: BinaryWriter, packet: SynchronizeTicksPacket): void {
    writer.writeUint32(packet.serverTicks);
    writer.writeUint32(packet.clientTicks);
  }
  deserialize(reader: BinaryReader, packet: SynchronizeTicksPacket): void {
    packet.serverTicks = reader.readUint32();
    packet.clientTicks = reader.readUint32();
  }
}

ClientPacketFactory.register(SynchronizeTicksSerializer);
