import { ClientPackets, ServerPackets } from '@medenia/network';

import { ClientHandler } from '../client-handler';
import { Client } from '../client';
import { redirectManager } from '../../services/redirect-manager';

export abstract class Listener extends ClientHandler {
  clientRedirected(client: Client, _packet: ClientPackets.ClientRedirectedPacket) {
    this.addClient(client);
  }

  protected redirect(client: Client, address: string, _port: number, subject: string) {
    const redirect = redirectManager.add(client.seed, client.key, client.keySalts, subject);
    client.sendPacket(new ServerPackets.RedirectPacket(address, 2610, redirect));
  }
}
