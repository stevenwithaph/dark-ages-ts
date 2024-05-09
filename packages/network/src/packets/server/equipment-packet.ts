import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class EquipmentPacket implements Packet {}

class EquipmentSerializer extends BasePacketSerializer<EquipmentPacket> {
  constructor() {
    super(ServerOpCode.Equipment, EquipmentPacket);
  }

  serialize(writer: BinaryWriter, packet: EquipmentPacket) {
    throw new Error('Method not implemented.');
  }

  deserialize(reader: BinaryReader, packet: EquipmentPacket) {
    throw new Error('Method not implemented.');
  }
}

ServerPacketFactory.register(EquipmentSerializer);
