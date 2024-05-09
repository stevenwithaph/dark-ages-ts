import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

export class NotepadPacket implements Packet {}

class NotepadSerializer extends BasePacketSerializer<NotepadPacket> {
  constructor() {
    super(ServerOpCode.Notepad, NotepadPacket);
  }

  serialize(writer: BinaryWriter, packet: NotepadPacket) {
    throw new Error('Method not implemented.');
  }

  deserialize(reader: BinaryReader, packet: NotepadPacket) {
    throw new Error('Method not implemented.');
  }
}

ServerPacketFactory.register(NotepadSerializer);
