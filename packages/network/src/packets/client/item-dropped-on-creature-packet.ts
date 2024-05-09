import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';

export class ItemDroppedOnCreaturePacket implements Packet {}

class ItemDroppedOnCreatureSerializer extends BasePacketSerializer<ItemDroppedOnCreaturePacket> {
  constructor() {
    super(ClientOpCode.ItemDroppedOnCreature, ItemDroppedOnCreaturePacket);
  }
  serialize(writer: BinaryWriter, packet: ItemDroppedOnCreaturePacket): void {
    throw new Error('Method not implemented.');
  }
  deserialize(reader: BinaryReader, packet: ItemDroppedOnCreaturePacket): void {
    throw new Error('Method not implemented.');
  }
}

ClientPacketFactory.register(ItemDroppedOnCreatureSerializer);
