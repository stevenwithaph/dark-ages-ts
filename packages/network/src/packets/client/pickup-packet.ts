import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';

export class PickupPacket implements Packet {}

class PickupSerializer extends BasePacketSerializer<PickupPacket> {
  constructor() {
    super(ClientOpCode.Pickup, PickupPacket);
  }
  serialize(writer: BinaryWriter, packet: PickupPacket): void {
    throw new Error('Method not implemented.');
  }
  deserialize(reader: BinaryReader, packet: PickupPacket): void {
    throw new Error('Method not implemented.');
  }
}

ClientPacketFactory.register(PickupSerializer);
