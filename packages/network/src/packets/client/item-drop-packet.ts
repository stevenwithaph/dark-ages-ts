import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';

export class ItemDropPacket implements Packet {}

class ItemDropSerializer extends BasePacketSerializer<ItemDropPacket> {
  constructor() {
    super(ClientOpCode.ItemDrop, ItemDropPacket);
  }
  serialize(writer: BinaryWriter, packet: ItemDropPacket): void {
    throw new Error('Method not implemented.');
  }
  deserialize(reader: BinaryReader, packet: ItemDropPacket): void {
    throw new Error('Method not implemented.');
  }
}

ClientPacketFactory.register(ItemDropSerializer);
