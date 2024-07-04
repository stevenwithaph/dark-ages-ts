import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
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
  get opCode(): number {
    return ServerOpCode.DisplayVisibleEntities;
  }
  serialize(writer: BinaryWriter): void {
    writer.writeUint16(this.entities.length);

    for (const entity of this.entities) {
      writer.writeUint16(entity.x);
      writer.writeUint16(entity.y);

      writer.writeUint32(entity.id);
      writer.writeUint16(entity.spriteId);
      writer.offset += 4;

      writer.writeUint8(entity.direction);

      writer.offset += 1;

      writer.writeUint8(entity.creatureType);

      writer.writeString8(entity.name);
    }
  }
  deserialize(reader: BinaryReader): void {
    const length = reader.readUint16();
    this.entities = [];
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

      this.entities.push({
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
