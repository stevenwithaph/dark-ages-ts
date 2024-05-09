import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Constructor } from 'type-fest';
import { Packet } from './packet';

export abstract class BasePacketSerializer<T extends Packet>
  implements PacketSerializer
{
  protected constructor(
    public opCode: number,
    public packet: Constructor<T>
  ) {}

  abstract serialize(writer: BinaryWriter, packet: T): void;
  abstract deserialize(reader: BinaryReader, packet: T): void;
}

export interface PacketSerializer {
  opCode: number;
  packet: Constructor<Packet>;

  serialize(writer: BinaryWriter, packet: Packet): void;
  deserialize(reader: BinaryReader, packet: Packet): void;
}
