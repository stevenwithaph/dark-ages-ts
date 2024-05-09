import { Constructor } from 'type-fest';
import { Packet } from '@medenia/network';

export function PacketHandler(packet: Constructor<Packet>) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    let handlers = Reflect.getMetadata('handlers', target) ?? [];

    handlers = handlers.slice();

    handlers.push({
      packet,
      func: descriptor.value,
    });

    Reflect.defineMetadata('handlers', handlers, target);
  };
}
