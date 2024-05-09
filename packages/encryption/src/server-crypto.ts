import { Crypto } from './crypto';
import { EncryptionType } from './encryption-type';
import {
  generateKey,
  generateValuePair,
  getClientEncryptionType,
  getServerEncryptionType,
  xor,
} from './utils';

export class ServerCrypto extends Crypto {
  public encrypt(buffer: Uint8Array, opCode: number): Uint8Array {
    let encryptionKey: Uint8Array;

    const encryptionType = getServerEncryptionType(opCode);

    if (encryptionType === EncryptionType.NONE) {
      return buffer;
    }

    const { a, b } = generateValuePair();

    switch (encryptionType) {
      case EncryptionType.NORMAL:
        encryptionKey = this.keyBuffer;
        break;
      case EncryptionType.MD5:
        encryptionKey = generateKey(a, b, this.keySaltsBuffer);
        break;
    }

    const ordinal = this.nextOrdinal();

    xor(buffer, encryptionKey, ordinal, this.seed);

    //ordinal + message + 3 bytes of footer
    const encryptedBuffer = new Uint8Array(buffer.length + 4);

    encryptedBuffer[0] = ordinal;
    encryptedBuffer.set(buffer, 1);

    encryptedBuffer[encryptedBuffer.length - 3] = (a & 0xff) ^ 116;
    encryptedBuffer[encryptedBuffer.length - 2] = b ^ 36;
    encryptedBuffer[encryptedBuffer.length - 1] = ((a >> 8) & 0xff) ^ 100;

    return encryptedBuffer;
  }

  public decrypt(buffer: Uint8Array, opCode: number): Uint8Array {
    let encryptionKey: Uint8Array;
    let encryptedBuffer: Uint8Array;

    const encryptionType = getClientEncryptionType(opCode);

    if (encryptionType === EncryptionType.NONE) {
      return buffer;
    }

    const a: number =
      ((buffer[buffer.length - 1] << 8) | buffer[buffer.length - 3]) ^ 29808;
    const b: number = buffer[buffer.length - 2] ^ 35;

    switch (encryptionType) {
      case EncryptionType.NORMAL:
        encryptionKey = this.keyBuffer;
        encryptedBuffer = buffer.subarray(1, buffer.length - 3);

        break;
      case EncryptionType.MD5:
        encryptionKey = generateKey(a, b, this.keySaltsBuffer);
        encryptedBuffer = buffer.subarray(1, buffer.length - 7);

        break;
    }

    const ordinal = buffer[0];
    xor(encryptedBuffer, encryptionKey, ordinal, this.seed);

    return encryptedBuffer;
  }
}
