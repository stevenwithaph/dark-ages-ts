import { EventBus } from '../event-bus';
import { clientManager } from '../network/client-manager';

export class NetworkedScene extends Phaser.Scene {
  protected packetHandlers: Map<Function, Function> = new Map();
  protected eventHandlers: Map<string, Function> = new Map();

  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super(config);
  }

  init() {
    this.bindListeners();
    this.events.on('shutdown', this.removeListeners, this);
  }

  onRedirected() {}

  onConnected() {}

  private bindListeners() {
    clientManager.main.on('connected', this.onConnected, this);
    clientManager.main.on('redirected', this.onRedirected, this);

    const packet = Reflect.getMetadata('packet-handlers', this);
    if (packet !== undefined) {
      for (let i = 0; i < packet.length; i++) {
        clientManager.main.on(packet[i].packet.name, packet[i].func, this);
      }
    }

    const events = Reflect.getMetadata('event-handlers', this);
    if (events !== undefined) {
      for (let i = 0; i < events.length; i++) {
        EventBus.on(events[i].event, events[i].func, this);
      }
    }
  }

  private removeListeners() {
    const packet = Reflect.getMetadata('packet-handlers', this);
    if (packet !== undefined) {
      for (let i = 0; i < packet.length; i++) {
        clientManager.main.off(packet[i].packet.name, packet[i].func, this);
      }
    }

    const events = Reflect.getMetadata('event-handlers', this);
    if (events !== undefined) {
      for (let i = 0; i < events.length; i++) {
        EventBus.off(events[i].event, events[i].func, this);
      }
    }
  }
}
