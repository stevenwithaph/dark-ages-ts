import { Crypto } from './crypto';
import { EncryptionType } from './encryption-type';
import {
  generateKey,
  generateValuePair,
  getMd5Hash,
  getClientEncryptionType,
  xor,
  getServerEncryptionType,
} from './utils';

export class ClientCrypto extends Crypto {
  encrypt(buffer: Uint8Array, opCode: number): Uint8Array {
    //  TODO: check dialog
    let encryptionKey: Uint8Array;
    let encryptedBuffer: Uint8Array;

    const encryptionType = getClientEncryptionType(opCode);

    if (encryptionType === EncryptionType.NONE) {
      return buffer;
    }
    const { a, b } = generateValuePair();

    //  the end position of the encryptedBuffer
    let offset: number = buffer.length + 1;

    switch (encryptionType) {
      case EncryptionType.NORMAL:
        encryptionKey = this.keyBuffer;

        //ordinal + length + 4 bytes md5 + 3 salt
        encryptedBuffer = new Uint8Array(buffer.length + 8);
        break;
      case EncryptionType.MD5:
        encryptionKey = generateKey(a, b, this.keySaltsBuffer);

        //ordinal + length + opCode + 4 bytes md5 + 3 salt
        encryptedBuffer = new Uint8Array(buffer.length + 9);

        //  ordinal + buffer, increase to move offset along
        encryptedBuffer[offset++] = opCode;
        break;
    }

    const ordinal = this.nextOrdinal();

    xor(buffer, encryptionKey, ordinal, this.seed);

    encryptedBuffer[0] = ordinal;
    encryptedBuffer.set(buffer, 1);

    const hashBuffer = new Uint8Array(buffer.length + 2);
    hashBuffer[0] = opCode;
    hashBuffer[1] = ordinal;

    hashBuffer.set(buffer, 2);

    const hash = getMd5Hash(hashBuffer);

    encryptedBuffer[offset++] = hash[13];
    encryptedBuffer[offset++] = hash[3];
    encryptedBuffer[offset++] = hash[11];
    encryptedBuffer[offset++] = hash[7];

    encryptedBuffer[offset++] = (a % 256 ^ 112) & 0xff;
    encryptedBuffer[offset++] = (b ^ 35) & 0xff;
    encryptedBuffer[offset++] = ((a >> 8) % 256 ^ 116) & 0xff;

    return encryptedBuffer;
  }

  decrypt(buffer: Uint8Array, opCode: number): Uint8Array {
    let encryptionKey: Uint8Array;
    let encryptedBuffer: Uint8Array;

    const encryptionType = getServerEncryptionType(opCode);

    if (encryptionType === EncryptionType.NONE) {
      return buffer;
    }

    const a: number =
      ((buffer[buffer.length - 1] << 8) | buffer[buffer.length - 3]) ^ 25716;
    const b: number = buffer[buffer.length - 2] ^ 36;

    switch (encryptionType) {
      case EncryptionType.NORMAL:
        encryptionKey = this.keyBuffer;
        break;
      case EncryptionType.MD5:
        encryptionKey = generateKey(a, b, this.keySaltsBuffer);
        break;
    }

    encryptedBuffer = buffer.subarray(1, buffer.length - 3);

    const ordinal = buffer[0];

    xor(encryptedBuffer, encryptionKey, ordinal, this.seed);

    return encryptedBuffer;
  }
}
