import { EncryptionType } from '../encryption-type';
import { md5 } from 'js-md5';
import { SALT_TABLE } from './salt-table';

const KEY_LENGTH = 9;

export function generateKey(a: number, b: number, salts: Uint8Array) {
  const key = new Uint8Array(KEY_LENGTH);

  for (let i = 0; i < KEY_LENGTH; i++) {
    key[i] = salts[(i * (9 * i + b * b) + a) % salts.length];
  }

  return key;
}

export function generateKeySalts(seed: string) {
  let saltTable = getMd5HashHex(getMd5HashHex(seed));

  for (let i = 0; i < 31; i++) {
    saltTable += getMd5HashHex(saltTable);
  }

  return Buffer.from(saltTable) as Uint8Array;
}

export function getMd5HashHex(value: string) {
  return md5.update(value).hex();
}

export function getMd5Hash(value: Uint8Array) {
  return md5.update(value).array();
}

export function getClientEncryptionType(opCode: number) {
  switch (opCode) {
    case 0:
    case 16:
    case 72:
      return EncryptionType.NONE;
    case 2:
    case 3:
    case 4:
    case 11:
    case 38:
    case 45:
    case 58:
    case 66:
    case 67:
    case 75:
    case 87:
    case 98:
    case 104:
    case 113:
    case 115:
    case 123:
      return EncryptionType.NORMAL;
    default:
      return EncryptionType.MD5;
  }
}

export function getServerEncryptionType(opCode: number) {
  switch (opCode) {
    case 0:
    case 3:
    case 64:
    case 126:
      return EncryptionType.NONE;
    case 1:
    case 2:
    case 10:
    case 86:
    case 96:
    case 98:
    case 102:
    case 111:
      return EncryptionType.NORMAL;
    default:
      return EncryptionType.MD5;
  }
}

export function generateValuePair() {
  const a: number = Math.floor(Math.random() * (65535 - 256) + 256);
  const b: number = Math.floor(Math.random() * (255 - 100) + 100);

  return { a, b };
}

export function xor(
  data: Uint8Array,
  key: Uint8Array,
  ordinal: number,
  seed: number
) {
  for (let i = 0; i < data.length; i++) {
    var saltIndex = Math.floor(i / key.length) % 256;
    data[i] ^= SALT_TABLE[seed][saltIndex] ^ key[i % key.length];

    if (saltIndex !== ordinal) {
      data[i] ^= SALT_TABLE[seed][ordinal];
    }
  }
}
