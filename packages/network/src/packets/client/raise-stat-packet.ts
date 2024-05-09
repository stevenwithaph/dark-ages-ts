import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';

export class RaiseStatPacket implements Packet {}

class RaiseStatSerializer extends BasePacketSerializer<RaiseStatPacket> {
  constructor() {
    super(ClientOpCode.RaiseStat, RaiseStatPacket);
  }
  serialize(writer: BinaryWriter, packet: RaiseStatPacket): void {
    throw new Error('Method not implemented.');
  }
  deserialize(reader: BinaryReader, packet: RaiseStatPacket): void {
    throw new Error('Method not implemented.');
  }
}

ClientPacketFactory.register(RaiseStatSerializer);
