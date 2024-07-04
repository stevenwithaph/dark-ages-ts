import { Serializable } from './serializable';

export class BinaryWriter {
  private buffer: Buffer;

  public offset: number;

  constructor() {
    this.offset = 0;
    this.buffer = Buffer.alloc(32);
  }

  writeUint8(value: number) {
    this.grow(1);
    this.buffer.writeUint8(value, this.offset);

    this.offset += 1;
  }

  writeUint16(value: number) {
    this.grow(2);
    this.buffer.writeUInt16BE(value, this.offset);

    this.offset += 2;
  }

  writeUint32(value: number) {
    this.grow(4);
    this.buffer.writeUint32BE(value, this.offset);

    this.offset += 4;
  }

  writeInt8(value: number) {
    this.grow(1);
    this.buffer.writeInt8(value, this.offset);

    this.offset += 1;
  }

  writeInt16(value: number) {
    this.grow(2);
    this.buffer.writeInt16BE(value, this.offset);

    this.offset += 2;
  }

  writeInt32(value: number) {
    this.grow(4);
    this.buffer.writeInt32BE(value, this.offset);
    this.offset += 4;
  }

  writeString(value: string) {
    this.grow(value.length);
    this.buffer.write(value, this.offset, 'ascii');

    this.offset += value.length;
  }

  writeBoolean(value: boolean) {
    this.writeUint8(value ? 1 : 0);
  }

  writeBytes(value: Uint8Array) {
    this.grow(value.length);
    this.buffer.set(value, this.offset);

    this.offset += value.length;
  }

  writeString8(value: string) {
    this.writeUint8(value.length);
    this.writeString(value);
  }

  writeString16(value: string) {
    this.writeUint16(value.length);
    this.writeString(value);
  }

  writeString32(value: string) {
    this.writeUint32(value.length);
    this.writeString(value);
  }

  writeBytes8(value: Uint8Array) {
    this.writeUint8(value.length);
    this.writeBytes(value);
  }

  writeBytes16(value: Uint8Array) {
    this.writeUint16(value.length);
    this.writeBytes(value);
  }

  writeBytes32(value: Uint8Array) {
    this.writeUint32(value.length);
    this.writeBytes(value);
  }

  writeSerializable(value: Serializable) {
    value.serialize(this);
  }

  grow(size: number) {
    if (size + this.offset > this.buffer.byteLength) {
      const buffer = Buffer.alloc(this.offset + size);

      this.buffer.copy(buffer);
      this.buffer = buffer;
    }
  }

  toArray() {
    return this.buffer.subarray(0, this.offset);
  }
}
