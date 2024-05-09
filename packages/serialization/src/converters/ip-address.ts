import { BinaryReader } from '../binary-reader';
import { BinaryWriter } from '../binary-writer';

export const IpAddressConverter = {
  serialize(value: string, writer: BinaryWriter) {
    const decimals = value.split('.');
    const int =
      ((+decimals[3] * 256 + +decimals[2]) * 256 + +decimals[1]) * 256 +
      +decimals[0];

    writer.writeUint32(int);
  },

  deserialize(reader: BinaryReader) {
    let bytes = reader.readUint32();
    let ip = (bytes % 256).toString();
    for (let i = 3; i > 0; i--) {
      bytes = Math.floor(bytes / 256);
      ip = ip + '.' + (bytes % 256).toString();
    }

    return ip;
  },
};
