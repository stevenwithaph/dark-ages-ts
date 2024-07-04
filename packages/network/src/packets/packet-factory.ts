import { Constructor } from 'type-fest';
import { BinaryReader, BinaryWriter } from '@medenia/serialization';

import { Packet } from './packet';
import { PacketPayload } from './packet-payload';
import { ClientPackets } from './client-packets';
import { ServerPackets } from './server-packets';

export class PacketFactory {
  protected opCodeToSerializer: Map<number, Constructor<Packet>> = new Map();

  register(packet: Constructor<Packet>) {
    //const instance = new serializer();
    //this.packetToSerializer.set(instance.packet, instance);
    this.opCodeToSerializer.set(packet.prototype.opCode, packet);
  }

  serialize(packet: Packet) {
    const writer = new BinaryWriter();
    packet.serialize(writer);

    return {
      opCode: packet.opCode,
      data: writer.toArray(),
    } satisfies PacketPayload;
  }

  deserialize(payload: PacketPayload) {
    const ctx = this.opCodeToSerializer.get(payload.opCode);

    if (!ctx) {
      return undefined;
    }

    const reader = new BinaryReader(payload.data);
    const packet = new ctx();

    packet.deserialize(reader);

    return packet;
  }

  get(opCode: number) {
    return this.opCodeToSerializer.get(opCode);
  }
}

const ClientPacketFactory = new PacketFactory();
const ServerPacketFactory = new PacketFactory();

for (const packet in ClientPackets) {
  //@ts-ignore
  ClientPacketFactory.register(ClientPackets[packet]);
}

for (const packet in ServerPackets) {
  //@ts-ignore
  ServerPacketFactory.register(ServerPackets[packet]);
}

export { ClientPacketFactory, ServerPacketFactory };
