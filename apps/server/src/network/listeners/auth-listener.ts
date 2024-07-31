import { ClientPackets, LoginMessageType, ServerPackets } from '@medenia/network';
import fs from 'fs';

import { Client } from '../client';
import { PacketHandler } from '../packet-handler';
import { Listener } from './listener';
import { AuthError, authService } from '../../services/auth-service';

export class AuthListener extends Listener {
  motd: string;

  constructor() {
    super(Number(process.env.AUTH_PORT));

    fs.readFile('./data/motd.txt', (err, data) => {
      this.motd = data.toString();
    });
  }

  onRedirect(client: Client): void {
    //  TODO: CRC Should be sent properly
    client.sendPacket(new ServerPackets.LoginNoticePacket(true, this.motd, 12));
  }

  @PacketHandler(ClientPackets.LoginPacket)
  async onLogin(client: Client, packet: ClientPackets.LoginPacket) {
    try {
      await authService.login(packet.username, packet.password);
      client.keySalts = packet.username;
      client.sendPacket(new ServerPackets.LoginMessagePacket(LoginMessageType.Confirm, 'Success!'));

      this.redirect(client, process.env.SERVER_ENDPOINT!, Number(process.env.WORLD_PORT));
    } catch (error) {
      this.handleAuthError(client, error);
    }
  }

  @PacketHandler(ClientPackets.CharacterCreationRequestPacket)
  async onCharacterCreationPacket(client: Client, packet: ClientPackets.CharacterCreationRequestPacket) {
    try {
      const aisling = await authService.create(packet.name, packet.password);
      client.sendPacket(new ServerPackets.LoginMessagePacket(LoginMessageType.Confirm, 'Success!'));

      const finalize = await client.await(ClientPackets.CharacterCreationFinalizePacket);

      await authService.finalize(aisling.id, finalize.hairStyle, finalize.hairColour, finalize.bodyType);

      client.sendPacket(new ServerPackets.LoginMessagePacket(LoginMessageType.Confirm, 'Success!'));
    } catch (error) {
      console.log(error);
      this.handleAuthError(client, error);
    }
  }

  @PacketHandler(ClientPackets.MetaDataRequestPacket)
  onMetaDataRequest(client: Client) {
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
