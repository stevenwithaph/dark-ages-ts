import { BinaryReader } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
import { BasePacketSerializer } from '../packet-serializer';
import { ServerPacketFactory } from '../packet-factory';

interface DisplayAislingInformation {
  helmet: number;
  bodyShape: number;
  armor: number;
  armor2: number;
  boots: number;
  shield: number;
  weapon: number;
  helmetColour: number;
  bootsColour: number;
  accessory1Colour: number;
  accessory1: number;
  accessory2Colour: number;
  accessory2: number;
  accessory3Colour: number;
  accessory3: number;
  lanternSize: number;
  restPosition: number;
  overcoat: number;
  overcoatColour: number;
  bodyColour: number;
  isTransparent: boolean;
  faceShape: number;
}

export class DisplayAislingPacket implements Packet {
  constructor(
    public x: number,
    public y: number,
    public direction: number,
    public id: number,
    public info: DisplayAislingInformation,
    public nameDisplay: number,
    public name: string,
    public groupName: string
  ) {}
}

class DisplayAislingSerializer extends BasePacketSerializer<DisplayAislingPacket> {
  constructor() {
    super(ServerOpCode.DisplayAisling, DisplayAislingPacket);
  }

  serialize(writer: BinaryWriter, packet: DisplayAislingPacket) {
    writer.writeUint16(packet.x);
    writer.writeUint16(packet.y);

    writer.writeUint8(packet.direction);

    writer.writeUint32(packet.id);

    writer.writeUint16(packet.info.helmet);
    writer.writeUint8(packet.info.bodyShape);
    writer.writeUint16(packet.info.armor);
    writer.writeUint8(packet.info.boots);
    writer.writeUint16(packet.info.armor2);
    writer.writeUint8(packet.info.shield);
    writer.writeUint16(packet.info.weapon);
    writer.writeUint8(packet.info.helmetColour);
    writer.writeUint8(packet.info.bootsColour);
    writer.writeUint8(packet.info.accessory1Colour);
    writer.writeUint16(packet.info.accessory1);
    writer.writeUint8(packet.info.accessory2Colour);
    writer.writeUint16(packet.info.accessory2);
    writer.writeUint8(packet.info.accessory3Colour);
    writer.writeUint16(packet.info.accessory3);

    writer.writeUint8(packet.info.lanternSize);
    writer.writeUint8(packet.info.restPosition);

    writer.writeUint16(packet.info.overcoat);
    writer.writeUint8(packet.info.overcoatColour);

    writer.writeUint8(packet.info.bodyColour);
    writer.writeBoolean(packet.info.isTransparent);
    writer.writeUint8(packet.info.faceShape);

    writer.writeUint8(packet.nameDisplay);
    writer.writeString8(packet.name);
    writer.writeString8(packet.groupName);
  }

  deserialize(reader: BinaryReader, packet: DisplayAislingPacket) {
    packet.x = reader.readUint16();
    packet.y = reader.readUint16();

    packet.direction = reader.readUint8();

    packet.id = reader.readUint32();

    packet.info = {
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

    packet.nameDisplay = reader.readUint8();
    packet.name = reader.readString8();
    packet.groupName = reader.readString8();
  }
}

ServerPacketFactory.register(DisplayAislingSerializer);
