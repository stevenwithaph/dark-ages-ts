import { BinaryReader, BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';

export class SelfProfilePacket implements Packet {
  constructor(
    public nationId: number,
    public guildRank: string,
    public title: string,
    public partyStatus: string,
    public canGroup: boolean,
    public classId: number,
    public className: string,
    public guildName: string,
    public marks: number
  ) {}
  get opCode(): number {
    return ServerOpCode.SelfProfile;
  }
  serialize(writer: BinaryWriter): void {
    writer.writeUint8(this.nationId);
    writer.writeString8(this.guildRank);
    writer.writeString8(this.title);
    writer.writeString8(this.partyStatus);
    writer.writeBoolean(this.canGroup);

    writer.offset += 1;

    writer.writeUint8(this.classId);

    writer.offset += 2;

    writer.writeString8(this.className);
    writer.writeString8(this.guildName);
    writer.writeUint8(this.marks);
  }
  deserialize(reader: BinaryReader): void {
    throw new Error('Method not implemented.');
  }
}
