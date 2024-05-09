import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';

export class SetNotepadPacket implements Packet {}

class SetNotepadSerializer extends BasePacketSerializer<SetNotepadPacket> {
  constructor() {
    super(ClientOpCode.SetNotepad, SetNotepadPacket);
  }
  serialize(writer: BinaryWriter, packet: SetNotepadPacket): void {
    throw new Error('Method not implemented.');
  }
  deserialize(reader: BinaryReader, packet: SetNotepadPacket): void {
    throw new Error('Method not implemented.');
  }
}

ClientPacketFactory.register(SetNotepadSerializer);
