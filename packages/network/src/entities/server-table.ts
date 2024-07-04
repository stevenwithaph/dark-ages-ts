import { BinaryReader, BinaryWriter, Serializable, Fields } from '@medenia/serialization';

export class ServerTable implements Serializable {
  public entries: Array<ServerTableEntry>;

  constructor() {
    this.entries = [];
  }

  addEntry(ip: string, port: number, name: string, descrption: string) {
    this.entries.push(new ServerTableEntry(this.entries.length + 1, ip, port, name, descrption));
  }

  getEntry(id: number) {
    return this.entries[id - 1];
  }

  serialize(writer: BinaryWriter): void {
    writer.writeUint8(this.entries.length);

    for (const entry of this.entries) {
      entry.serialize(writer);
    }
  }

  deserialize(reader: BinaryReader): void {
    const entries = reader.readUint8();

    for (let i = 0; i < entries; i++) {
      //TODO: figure out a better api for serialization
      //@ts-ignore
      const entry = new ServerTableEntry();
      entry.deserialize(reader);
      this.entries.push(entry);
    }
  }
}

class ServerTableEntry implements Serializable {
  constructor(
    public id: number,
    public ip: string,
    public port: number,
    public name: string,
    public descrption: string
  ) {}

  serialize(writer: BinaryWriter): void {
    writer.writeUint8(this.id);

    Fields.IpAddressConverter.serialize(this.ip, writer);

    writer.writeUint16(this.port);

    writer.writeString(`${this.name};${this.descrption}\0`);
  }
  deserialize(reader: BinaryReader): void {
    this.id = reader.readUint8();

    this.ip = Fields.IpAddressConverter.deserialize(reader);

    this.port = reader.readUint16();

    const [name, descrption] = reader.readString().split(';');
    this.name = name;
    this.descrption = descrption;
  }
}
