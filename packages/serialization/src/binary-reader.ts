import { Class, Constructor } from 'type-fest';
import { Serializable } from './serializable';

export class BinaryReader {
  private buffer: Buffer;

  public offset: number;

  constructor(data: Uint8Array) {
    this.buffer = Buffer.from(data);
    this.offset = 0;
  }

  readUint8(): number {
    const value = this.buffer.readUint8(this.offset);

    this.offset += 1;

    return value;
  }

  readUint16() {
    const value = this.buffer.readUint16BE(this.offset);

    this.offset += 2;

    return value;
  }

  readUint32() {
    const value = this.buffer.readUint32BE(this.offset);

    this.offset += 4;

    return value;
  }

  readInt8(): number {
    const value = this.buffer.readUInt8(this.offset);

    this.offset += 1;

    return value;
  }

  readInt16() {
    const value = this.buffer.readInt16BE(this.offset);

    this.offset += 2;

    return value;
  }

  readInt32() {
    const value = this.buffer.readInt32BE(this.offset);

    this.offset += 4;

    return value;
  }

  readString(length?: number) {
    if (!length) {
      //  just read to the end of the packet if there is no length
      length = this.buffer.byteLength - this.offset;
    }

    const value = this.buffer.toString(
      'ascii',
      this.offset,
      this.offset + length
    );

    this.offset += length;

    return value;
  }

  readString8() {
    const length = this.readUint8();
    return this.readString(length);
  }

  readString16() {
    const length = this.readUint16();
    return this.readString(length);
  }

  readString32() {
    const length = this.readUint32();
    return this.readString(length);
  }

  readBoolean() {
    return this.readUint8() === 1;
  }

  readBytes(length?: number) {
    if (!length) {
      //  just read to the end of the packet if there is no length
      length = this.buffer.byteLength - this.offset;
    }

    const value = this.buffer.subarray(this.offset, this.offset + length);
    this.offset += length;

    return value;
  }

  readBytes8() {
    const length = this.readUint8();
    return this.readBytes(length);
  }

  readBytes16() {
    const length = this.readUint16();
    return this.readBytes(length);
  }

  readBytes32() {
    const length = this.readUint32();
    return this.readBytes(length);
  }

  readSerializable<T extends Serializable>(serializable: Constructor<T>): T {
    const serialized = new serializable();
    serialized.deserialize(this);

    return serialized;
  }

  remaining() {
    return this.buffer.byteLength - this.offset;
  }
}
