import { NetworkedScene } from './networked-scene';
import { clientManager } from '../network/client-manager';
import { PacketHandler } from '../packet-handler';
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
    this.load.image('palettes', 'assets/palettes.png');

    this.load.binary('sotp', 'assets/sotp.dat');
  }

  create() {
    Astar.Sotp = new Uint8Array(this.cache.binary.get('sotp'));

    clientManager.main.connect('127.0.0.1', 2610);
  }

  @PacketHandler(ServerPackets.AcceptConnectionPacket)
  async onAcceptConnection() {
    const { seed, key } = await clientManager.main.sendWithAck(
      new ClientPackets.VersionPacket(913),
      ServerPackets.ConnectionInfoPacket
    );

    clientManager.main.seed = seed;
    clientManager.main.key = key;

    this.scene.start('auth');
  }
}
