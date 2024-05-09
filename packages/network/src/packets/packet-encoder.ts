import { Crypto } from '@medenia/encryption';

import { PacketPayload } from './packet-payload';
import { PacketFactory } from './packet-factory';
import { BinaryReader } from '@medenia/serialization';

export function encode(payload: PacketPayload, crypto: Crypto): Uint8Array {
  const encrypted = crypto.encrypt(payload.data, payload.opCode);

  const payloadBuffer = new Uint8Array(encrypted.length + 4);

  const length = encrypted.length + 1;

  payloadBuffer[0] = 170;
  payloadBuffer[1] = (length >> 8) & 0xff;
  payloadBuffer[2] = length & 0xff;
  payloadBuffer[3] = payload.opCode;

  payloadBuffer.set(encrypted, 4);

  return payloadBuffer;
}

export function decode(
  buffer: Uint8Array,
  factory: PacketFactory,
  crypto: Crypto
) {
  const packets = [];
  while (buffer.length !== 0) {
    if (buffer[0] !== 170) {
      throw new Error('Invalid packet');
    }

    const opCode = buffer[3];
    const length = (buffer[1] << 8) | buffer[2];

    const data = buffer.subarray(4, length + 3);

    const serializer = factory.get(opCode);

    if (serializer) {
      const decrypted = crypto.decrypt(data, opCode);
      const reader = new BinaryReader(decrypted);
      const packet = new serializer.packet();
      try {
        serializer.deserialize(reader, packet);
      } catch (e) {}

      packets.push(packet);
    }

    buffer = buffer.subarray(length + 3);
  }

  return packets;
}
