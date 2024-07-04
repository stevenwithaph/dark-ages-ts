import { ClientPackets, LoginMessageType, Redirect, ServerPackets } from '@medenia/network';

import { Client } from '../client';
import { PacketHandler } from '../packet-handler';
import { Listener } from './listener';
import { AuthError, authService } from '../../services/auth-service';

class AuthClient extends Client {}

export class AuthListener extends Listener {
  constructor() {
    super(2611, AuthClient);
  }

  onRedirect(client: Client): void {
    client.sendPacket(new ServerPackets.LoginNoticePacket(true, 'MOTD2', 12));
  }

  @PacketHandler(ClientPackets.LoginPacket)
  async onLogin(client: AuthClient, packet: ClientPackets.LoginPacket) {
    try {
      await authService.login(packet.username, packet.password);
      client.keySalts = packet.username;

      client.sendPacket(new ServerPackets.LoginMessagePacket(LoginMessageType.Confirm, 'Success!'));

      this.redirect(client, '127.0.0.1', 2612);
    } catch (error) {
      this.handleAuthError(client, error);
    }
  }

  @PacketHandler(ClientPackets.CharacterCreationRequestPacket)
  async onCharacterCreationPacket(client: AuthClient, packet: ClientPackets.CharacterCreationRequestPacket) {
    try {
      const aisling = await authService.create(packet.name, packet.password);
      client.sendPacket(new ServerPackets.LoginMessagePacket(LoginMessageType.Confirm, 'Success!'));

      const finalize = await client.await(ClientPackets.CharacterCreationFinalizePacket);

      await authService.finalize(aisling.id, finalize.hairStyle, finalize.hairColour, finalize.bodyType);

      client.sendPacket(new ServerPackets.LoginMessagePacket(LoginMessageType.Confirm, 'Success!'));
    } catch (error) {
      this.handleAuthError(client, error);
    }
  }

  //  still should be double-checked to make sure auth info is correct
  @PacketHandler(ClientPackets.MetaDataRequestPacket)
  onMetaDataRequest(client: AuthClient) {
    //client.sendPacket(new ServerPackets.MetaDataPacket());
  }

  handleAuthError(client: Client, error: any) {
    if (error instanceof AuthError) {
      client.sendPacket(new ServerPackets.LoginMessagePacket(error.type, error.message));
    } else {
      client.sendPacket(new ServerPackets.LoginMessagePacket(LoginMessageType.InvalidUsername, 'Something went wrong.'));
    }
  }
}
