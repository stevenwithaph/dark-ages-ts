import { ClientPackets, LoginMessageType, ServerPackets } from '@medenia/network';
import { clientManager } from '../network/client-manager';
import { EventBus } from '../event-bus';
import { NetworkedScene } from './networked-scene';
import { PacketHandler } from '../packet-handler';
import { EventHandler } from '../event-handler';

export class AuthScene extends NetworkedScene {
  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super({
      key: 'auth',
      ...config,
    });
  }

  create() {
    this.bgm.play(1);

    //  TODO: check if we have server tables
    clientManager.main.send(new ClientPackets.ServerTableRequestPacket(true, 0));
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
  async login(username: string, password: string) {
    const { type } = await clientManager.main.sendWithAck(new ClientPackets.LoginPacket(username, password), ServerPackets.LoginMessagePacket);

    if (type === LoginMessageType.Confirm) {
      clientManager.main.keySalts = username;
      const redirect = await clientManager.main.await(ServerPackets.RedirectPacket);

      this.scene.start('map', redirect);
    }
  }

  @EventHandler('character-creation')
  async characterCreation() {
    EventBus.emit('route');
  }

  @EventHandler('create-character')
  async createCharacter() {}
}
