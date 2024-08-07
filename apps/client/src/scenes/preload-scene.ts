import { NetworkedScene } from './networked-scene';
import { clientManager } from '../network/client-manager';
import { PacketHandler } from '../network/packet-handler';
import { ClientPackets, ServerPackets } from '@medenia/network';
import { Astar } from '../astar';

export class PreloadScene extends NetworkedScene {
  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super({
      key: 'preload',
      ...config,
    });
  }

  preload() {
    this.bgm.create();

    this.load.image('cursor');
    this.load.image('palettes', 'palettes.png');

    this.load.binary('sotp', 'sotp.dat');

    this.load.binary('login-map', 'maps/login-map.map');
  }

  create() {
    Astar.Sotp = new Uint8Array(this.cache.binary.get('sotp'));

    clientManager.main.connect(import.meta.env.VITE_GATEWAY_SERVER, Number(import.meta.env.VITE_GATEWAY_PORT));
  }

  @PacketHandler(ServerPackets.AcceptConnectionPacket)
  async onAcceptConnection() {
    const { seed, key } = await clientManager.main.sendWithAck(new ClientPackets.VersionPacket(913), ServerPackets.ConnectionInfoPacket);

    clientManager.main.seed = seed;
    clientManager.main.key = key;

    this.scene.start('auth');
  }
}
