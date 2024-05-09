import Pako from 'pako';

import { BinaryReader } from '../binary-reader';
import { BinaryWriter } from '../binary-writer';

export const Uint16ArrayConverter = {
  serialize(value: Uint16Array, writer: BinaryWriter) {
    for (const short of value) {
      writer.writeUint16(short);
    }
  },

  deserialize(reader: BinaryReader) {
    const remaining = reader.remaining() / 2;
    const array = new Uint16Array(remaining);

    for (let i = 0; i < remaining; i++) {
      array[i] = reader.readUint16();
    }

    return array;
  },
};
