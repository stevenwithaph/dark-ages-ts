import { ClientPackets, LoginMessageType, ServerPackets } from '@medenia/network';
import { clientManager } from '../network/client-manager';
import { EventBus } from '../event-bus';
import { NetworkedScene } from './networked-scene';
import { PacketHandler } from '../packet-handler';
import { EventHandler } from '../event-handler';
import { IsoMap, MapEvents } from '../game-objects/iso-map';
import { PaperDollContainer, PaperDollContainerEvents, PaperDollGender } from '../game-objects/paper-doll/paper-doll-container';

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

    this.map = new IsoMap(this, -1, 100, 100);
    this.map.setMapData(new Uint16Array(this.cache.binary.get('login-map')));
    this.add.existing(this.map);

    this.map.on(MapEvents.Loaded, this.fadeIn, this);

    this.center = this.map.tileToWorldXY(25, 50);

    this.aisling = new PaperDollContainer(this, PaperDollGender.Male, 1);
    this.aisling.pieces.armor.setItemId(1);
    this.aisling.pieces.pants.setItemId(1);
    this.aisling.pieces.pants.setDye(80);
    this.aisling.pieces.boots.setItemId(1);
    this.aisling.pieces.boots.setDye(85);
    this.aisling.pieces.helmet.setItemId(1);

    this.aisling.on(PaperDollContainerEvents.PieceLoaded, this.onPieceLoaded, this);

    this.dynamicTexture = new Phaser.Textures.DynamicTexture(this.textures, 'auth', 114, 170);
    this.dynamicTexture.camera.setRoundPixels(true);
    this.dynamicTexture.camera.setZoom(2);
    this.dynamicTexture.camera.centerOn(0, -42);
    this.dynamicTexture.draw(this.aisling);

    //  TODO: check if we have server tables
    clientManager.main.send(new ClientPackets.ServerTableRequestPacket(true, 0));
  }

  onPieceLoaded() {
    this.drawAisling();
  }

  drawAisling() {
    this.dynamicTexture.clear();
    this.dynamicTexture.draw(this.aisling);
    this.dynamicTexture.snapshot((image) => {
      if (this.image) {
        this.image.src = (image as HTMLImageElement).src;
      }
    });
  }

  @PacketHandler(ServerPackets.LoginMessagePacket)
  async onLoginMessage(packet: ServerPackets.LoginMessagePacket) {
    switch (packet.type) {
      case LoginMessageType.ClearName:
      case LoginMessageType.ClearPassword:
      case LoginMessageType.InvalidUsername:
      case LoginMessageType.IncorrectPassword:
    }
  }

  @PacketHandler(ServerPackets.ServerTablePacket)
  async onServerTable() {
    const { ip, port, redirect } = await clientManager.main.sendWithAck(new ClientPackets.ServerTableRequestPacket(false, 1), ServerPackets.RedirectPacket);

    clientManager.main.redirect(ip, port, redirect);
  }

  @PacketHandler(ServerPackets.LoginNoticePacket)
  async onLoginNoticePacket(packet: ServerPackets.LoginNoticePacket) {
    EventBus.emit('login-notice', packet.message);
  }

  @EventHandler('login-character')
  async onLogin(username: string, password: string) {
    const { type } = await clientManager.main.sendWithAck(new ClientPackets.LoginPacket(username, password), ServerPackets.LoginMessagePacket);

    if (type === LoginMessageType.Confirm) {
      clientManager.main.keySalts = username;
      const redirect = await clientManager.main.await(ServerPackets.RedirectPacket);

      this.scene.start('map', redirect);
    }
  }

  @EventHandler('character-creation')
  async onCharacterCreation() {
    EventBus.emit('route');
  }

  @EventHandler('create-character')
  async onCreateCharacter() {}

  @EventHandler('character-hair-colour')
  onCharacterHairColour(hairColour: number) {
    this.aisling.pieces.helmet.setDye(78 + hairColour);
    this.drawAisling();
  }

  @EventHandler('character-hair-style')
  onCharacterHairStyle(hairStyle: number) {
    this.aisling.pieces.helmet.setItemId(hairStyle);
  }

  @EventHandler('character-gender')
  onCharacterGender(gender: number) {
    switch (gender) {
      case 1:
        this.aisling.setGender(PaperDollGender.Male);
        break;
      case 2:
        this.aisling.setGender(PaperDollGender.Female);
        break;
    }
  }

  @EventHandler('character-canvas')
  onCharacterCanvas(image: HTMLImageElement) {
    this.image = image;
    this.drawAisling();
  }

  fadeIn() {
    this.cameras.main.fadeIn(500);
  }

  update() {
    this.cameras.main.centerOn(this.center.x, this.center.y);
  }
}
