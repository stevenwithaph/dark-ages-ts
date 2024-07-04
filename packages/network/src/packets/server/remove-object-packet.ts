import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';

export class RemoveObjectPacket implements Packet {
  constructor(public entityId: number) {}
  get opCode(): number {
    return ServerOpCode.RemoveObject;
  }
  serialize(writer: BinaryWriter): void {
    writer.writeUint32(this.entityId);
  }
  deserialize(reader: BinaryReader): void {
    this.entityId = reader.readUint32();
  }
}
