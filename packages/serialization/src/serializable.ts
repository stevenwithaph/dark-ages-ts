import { BinaryReader } from './binary-reader';
import { BinaryWriter } from './binary-writer';

export interface Serializable {
  serialize(writer: BinaryWriter): void;
  deserialize(reader: BinaryReader): void;
}
