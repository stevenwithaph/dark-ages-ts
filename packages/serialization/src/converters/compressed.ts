import Pako from 'pako';

import { BinaryReader } from '../binary-reader';
import { BinaryWriter } from '../binary-writer';

export const CompressedConverter = {
  serialize(value: Uint8Array, writer: BinaryWriter) {
    const compressed = Pako.deflate(value, {
      level: 6,
    });

    writer.writeBytes16(compressed);
  },

  deserialize(reader: BinaryReader) {
    const compressed = reader.readBytes16();
    return Pako.inflate(compressed);
  },
};
