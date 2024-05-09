import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';

export class SwapSlotPacket implements Packet {}

class SwapSlotSerializer extends BasePacketSerializer<SwapSlotPacket> {
  constructor() {
    super(ClientOpCode.SwapSlot, SwapSlotPacket);
  }
  serialize(writer: BinaryWriter, packet: SwapSlotPacket): void {
    throw new Error('Method not implemented.');
  }
  deserialize(reader: BinaryReader, packet: SwapSlotPacket): void {
    throw new Error('Method not implemented.');
  }
}

ClientPacketFactory.register(SwapSlotSerializer);
