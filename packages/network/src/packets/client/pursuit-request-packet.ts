import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ClientPacketFactory } from '../packet-factory';

export class PursuitRequestPacket implements Packet {}

class PursuitRequestSerializer extends BasePacketSerializer<PursuitRequestPacket> {
  constructor() {
    super(ClientOpCode.RequestPursuit, PursuitRequestPacket);
  }
  serialize(writer: BinaryWriter, packet: PursuitRequestPacket): void {
    throw new Error('Method not implemented.');
  }
  deserialize(reader: BinaryReader, packet: PursuitRequestPacket): void {
    throw new Error('Method not implemented.');
  }
}

ClientPacketFactory.register(PursuitRequestSerializer);
