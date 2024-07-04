import { Redirect } from '../../entities';
import { BinaryReader, Fields, Serializable } from '@medenia/serialization';
import { BinaryWriter } from '@medenia/serialization';
import { Packet } from '../packet';
import { ServerOpCode } from '../op-codes';
export class RedirectPacket implements Packet {
  constructor(
    public ip: string,
    public port: number,
    public redirect: Redirect
  ) {}
  get opCode(): number {
    return ServerOpCode.Redirect;
  }
  serialize(writer: BinaryWriter): void {
    Fields.IpAddressConverter.serialize(this.ip, writer);
    writer.writeUint16(this.port);

    const redirectWriter = new BinaryWriter();
    this.redirect.serialize(redirectWriter);

    writer.writeBytes8(redirectWriter.toArray());
  }
  deserialize(reader: BinaryReader): void {
    this.ip = Fields.IpAddressConverter.deserialize(reader);
    this.port = reader.readUint16();

    reader.offset += 1;
    this.redirect = reader.readSerializable(Redirect);
  }
}
