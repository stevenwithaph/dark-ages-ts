import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';
import { CreatureType } from '../../entities/creature-type';

interface VisibleEntity {
  x: number;
  y: number;
  id: number;
  spriteId: number;
  direction: number;
  creatureType: CreatureType;
  name: string;
}

export class DisplayVisibleEntitiesPacket implements Packet {
  constructor(public entities: Array<VisibleEntity>) {}
}

class DisplayVisibleEntitiesSerializer extends BasePacketSerializer<DisplayVisibleEntitiesPacket> {
  constructor() {
    super(ServerOpCode.DisplayVisibleEntities, DisplayVisibleEntitiesPacket);
  }

  serialize(writer: BinaryWriter, packet: DisplayVisibleEntitiesPacket) {
    writer.writeUint16(packet.entities.length);

    for (const entity of packet.entities) {
      writer.writeUint16(entity.x);
      writer.writeUint16(entity.y);

      writer.writeUint32(entity.id);
      writer.writeUint16(entity.spriteId);
      writer.offset += 4;

      writer.writeUint8(entity.direction);

      writer.offset += 1;

      writer.writeUint8(4);

      writer.writeString8(entity.name);
    }
  }

  deserialize(reader: BinaryReader, packet: DisplayVisibleEntitiesPacket) {
    const length = reader.readUint16();
    packet.entities = [];
    for (let i = 0; i < length; i++) {
      const x = reader.readUint16();
      const y = reader.readUint16();
      const id = reader.readUint32();
      const spriteId = reader.readUint16();
      reader.offset += 4;

      const direction = reader.readUint8();

      reader.offset += 1;
      const creatureType = reader.readUint8();

      const name = reader.readString8();

      packet.entities.push({
        x,
        y,
        id,
        spriteId,
        direction,
        creatureType,
        name,
      });
    }
  }
}

ServerPacketFactory.register(DisplayVisibleEntitiesSerializer);
