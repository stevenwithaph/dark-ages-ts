import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { AislingDisplay } from '../../entities/aisling-display';
import { NameDisplay } from '../../entities/name-display';

export class DisplayAislingPacket implements Packet {
  constructor(
    public x: number,
    public y: number,
    public direction: number,
    public id: number,
    public info: AislingDisplay,
    public nameDisplay: NameDisplay,
    public name: string,
    public groupName: string
  ) {}
  get opCode(): number {
    return ServerOpCode.DisplayAisling;
  }
  serialize(writer: BinaryWriter): void {
    writer.writeUint16(this.x);
    writer.writeUint16(this.y);

    writer.writeUint8(this.direction);

    writer.writeUint32(this.id);

    writer.writeUint16(this.info.helmet);
    writer.writeUint8(this.info.bodyShape);
    writer.writeUint16(this.info.armor);
    writer.writeUint8(this.info.boots);
    writer.writeUint16(this.info.armor2);
    writer.writeUint8(this.info.shield);
    writer.writeUint16(this.info.weapon);
    writer.writeUint8(this.info.helmetColour);
    writer.writeUint8(this.info.bootsColour);
    writer.writeUint8(this.info.accessory1Colour);
    writer.writeUint16(this.info.accessory1);
    writer.writeUint8(this.info.accessory2Colour);
    writer.writeUint16(this.info.accessory2);
    writer.writeUint8(this.info.accessory3Colour);
    writer.writeUint16(this.info.accessory3);

    writer.writeUint8(this.info.lanternSize);
    writer.writeUint8(this.info.restPosition);

    writer.writeUint16(this.info.overcoat);
    writer.writeUint8(this.info.overcoatColour);

    writer.writeUint8(this.info.bodyColour);
    writer.writeBoolean(this.info.isTransparent);
    writer.writeUint8(this.info.faceShape);

    writer.writeUint8(this.nameDisplay);
    writer.writeString8(this.name);
    writer.writeString8(this.groupName);
  }
  deserialize(reader: BinaryReader): void {
    this.x = reader.readUint16();
    this.y = reader.readUint16();

    this.direction = reader.readUint8();

    this.id = reader.readUint32();

    this.info = {
      helmet: reader.readUint16(),
      bodyShape: reader.readUint8(),
      armor: reader.readUint16(),
      boots: reader.readUint8(),
      armor2: reader.readUint16(),
      shield: reader.readUint8(),
      weapon: reader.readUint16(),
      helmetColour: reader.readUint8(),
      bootsColour: reader.readUint8(),
      accessory1Colour: reader.readUint8(),
      accessory1: reader.readUint16(),
      accessory2Colour: reader.readUint8(),
      accessory2: reader.readUint16(),
      accessory3Colour: reader.readUint8(),
      accessory3: reader.readUint16(),
      lanternSize: reader.readUint8(),
      restPosition: reader.readUint8(),
      overcoat: reader.readUint16(),
      overcoatColour: reader.readUint8(),
      bodyColour: reader.readUint8(),
      isTransparent: reader.readBoolean(),
      faceShape: reader.readUint8(),
    };

    this.nameDisplay = reader.readUint8();
    this.name = reader.readString8();
    this.groupName = reader.readString8();
  }
}
