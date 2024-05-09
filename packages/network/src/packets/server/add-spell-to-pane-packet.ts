import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class AddSpellToPanePacket implements Packet {
  constructor(
    public name: string,
    public slot: number,
    public iconId: number,
    public spellType: number,
    public prompt: string,
    public castLines: number
  ) {}
}

class AddSpellToPaneSerializer extends BasePacketSerializer<AddSpellToPanePacket> {
  constructor() {
    super(ServerOpCode.AddSpellToPane, AddSpellToPanePacket);
  }

  serialize(writer: BinaryWriter, packet: AddSpellToPanePacket) {
    writer.writeUint8(packet.slot);
    writer.writeUint16(packet.iconId);
    writer.writeUint8(packet.spellType);
    writer.writeString8(packet.name);
    writer.writeString8(packet.prompt);

    writer.writeUint8(packet.castLines);
  }

  deserialize(reader: BinaryReader, packet: AddSpellToPanePacket) {
    throw new Error('Method not implemented.');
  }
}

ServerPacketFactory.register(AddSpellToPaneSerializer);
