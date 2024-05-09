import { Constructor } from 'type-fest';
import { Packet } from '@medenia/network';

export function PacketHandler(packet: Constructor<Packet>) {
  return function (target: any, _: string, descriptor: PropertyDescriptor) {
    let handlers = Reflect.getMetadata('packet-handlers', target) ?? [];

    Reflect.defineMetadata(
      'packet-handlers',
      [...handlers, { packet, func: descriptor.value }],
      target
    );
  };
}
