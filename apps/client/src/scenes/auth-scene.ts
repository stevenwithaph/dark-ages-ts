import { ClientPackets, Redirect, ServerPackets } from '@medenia/network';
import { clientManager } from '../network/client-manager';
import { NetworkedScene } from './networked-scene';
import { PacketHandler } from '../network/packet-handler';
import { IsoMap, MapEvents } from '../game-objects/iso-map';
import { PaperDollContainer } from '../game-objects/paper-doll/paper-doll-container';
import { RouterStore } from '../ui/stores/router.svelte';
import { EventHandler } from '../ui/event-handler';
import { NoticeStore } from '../ui/stores/notice.svelte';

export class AuthScene extends NetworkedScene {
  map: IsoMap;
  center: Phaser.Math.Vector2;
  aisling: PaperDollContainer;
  dynamicTexture: Phaser.Textures.DynamicTexture;
  image: HTMLImageElement;

  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super({
      key: 'auth',
      ...config,
    });
  }

  create() {
    this.bgm.play(1);
    this.cameras.main.setZoom(2);

    this.map = new IsoMap(this);
    this.map.setMapInfo(-1, 100, 100);
    this.map.setMapData(new Uint16Array(this.cache.binary.get('login-map')));
    this.add.existing(this.map);

    this.map.on(MapEvents.Loaded, this.fadeIn, this);

    this.center = this.map.tileToWorldXY(25, 50);

    //  TODO: check if we have server tables
    clientManager.main.send(new ClientPackets.ServerTableRequestPacket(true, 0));
  }

  @PacketHandler(ServerPackets.ServerTablePacket)
  async onServerTable() {
    const { ip, port, redirect } = await clientManager.main.sendWithAck(new ClientPackets.ServerTableRequestPacket(false, 1), ServerPackets.RedirectPacket);

    clientManager.main.redirect(ip, port, redirect);
  }

  @PacketHandler(ServerPackets.LoginNoticePacket)
  async onLoginNoticePacket(packet: ServerPackets.LoginNoticePacket) {
    NoticeStore.message = packet.message;
    RouterStore.push('auth/notice');
  }

  @EventHandler('logged-in')
  handleLoggedIn() {
    this.scene.start('map');
  }

  fadeIn() {
    this.cameras.main.fadeIn(500);
  }

  update() {
    super.update();

    this.cameras.main.centerOn(this.center.x, this.center.y);
  }
}
