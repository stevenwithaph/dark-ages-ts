export function EventHandler(event: string) {
  return function (target: any, _: string, descriptor: PropertyDescriptor) {
    let handlers = Reflect.getMetadata('event-handlers', target) ?? [];

    Reflect.defineMetadata(
      'event-handlers',
      [...handlers, { event, func: descriptor.value }],
      target
    );
  };
}
