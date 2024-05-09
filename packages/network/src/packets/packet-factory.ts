import { Constructor } from 'type-fest';
import { BinaryReader, BinaryWriter } from '@medenia/serialization';

import { Packet } from './packet';
import { PacketSerializer } from './packet-serializer';
import { PacketPayload } from './packet-payload';

export class PacketFactory {
  protected packetToSerializer: Map<Constructor<Packet>, PacketSerializer> =
    new Map();

  protected opCodeToSerializer: Map<number, PacketSerializer> = new Map();

  register(serializer: Constructor<PacketSerializer>) {
    const instance = new serializer();
    this.packetToSerializer.set(instance.packet, instance);
    this.opCodeToSerializer.set(instance.opCode, instance);
  }

  serialize(message: Packet) {
    const serializer = this.packetToSerializer.get(
      message.constructor as Constructor<Packet>
    );

    if (!serializer) {
      return undefined;
    }

    const writer = new BinaryWriter();
    serializer.serialize(writer, message);

    return {
      opCode: serializer.opCode,
      data: writer.toArray(),
    } satisfies PacketPayload;
  }

  deserialize(payload: PacketPayload) {
    const serializer = this.opCodeToSerializer.get(payload.opCode);

    if (!serializer) {
      return undefined;
    }

    const reader = new BinaryReader(payload.data);
    const packet = new serializer.packet();

    serializer.deserialize(reader, packet);

    return packet;
  }

  get(opCode: number) {
    return this.opCodeToSerializer.get(opCode);
  }
}

const ClientPacketFactory = new PacketFactory();
const ServerPacketFactory = new PacketFactory();

export { ClientPacketFactory, ServerPacketFactory };
