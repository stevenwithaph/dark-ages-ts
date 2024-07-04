import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ClientOpCode } from '../op-codes';

export class ClientTurnPacket implements Packet {
  constructor(public direction: number) {}
  get opCode(): number {
    return ClientOpCode.ClientTurn;
  }
  serialize(writer: BinaryWriter): void {
    writer.writeUint8(this.direction);
  }
  deserialize(reader: BinaryReader): void {
    this.direction = reader.readUint8();
  }
}
