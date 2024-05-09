import { Service } from 'typedi';
import {
  ClientPackets,
  LoginMessageType,
  Redirect,
  ServerPackets,
} from '@medenia/network';

import { Client } from '../client';
import { PacketHandler } from '../packet-handler';
import { Listener } from './listener';

@Service()
export class AuthListener extends Listener {
  constructor() {
    super(2611);
  }

  @PacketHandler(ClientPackets.ClientRedirectedPacket)
  onClientRedirected(
    client: Client,
    packet: ClientPackets.ClientRedirectedPacket
  ) {
    client.key = packet.key;
    client.keySalts = packet.keySalts;
    client.seed = packet.seed;

    client.sendPacket(new ServerPackets.LoginNoticePacket(true, 'MOTD', 12));
  }

  @PacketHandler(ClientPackets.LoginPacket)
  onLogin(client: Client, packet: ClientPackets.LoginPacket) {
    client.sendPacket(
      new ServerPackets.LoginMessagePacket(LoginMessageType.Confirm, 'success!')
    );

    client.keySalts = packet.username;

    client.sendPacket(
      new ServerPackets.RedirectPacket(
        '127.0.0.1',
        2612,
        new Redirect(client.seed, client.key, client.keySalts, 0)
      )
    );
  }

  //  Client is good to go and can be logged in.
  //  still should be double-checked to make sure auth info is correct
  @PacketHandler(ClientPackets.MetaDataRequestPacket)
  onMetaDataRequest(client: Client) {
    //client.sendPacket(new ServerPackets.MetaDataPacket());
  }
}
