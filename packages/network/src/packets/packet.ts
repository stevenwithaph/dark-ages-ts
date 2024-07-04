import { Serializable } from '@medenia/serialization';

export interface Packet extends Serializable {
  get opCode(): number;
}
