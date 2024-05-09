import { Service } from 'typedi';
import {
  ClientPackets,
  ServerTable,
  ServerPackets,
  Redirect,
} from '@medenia/network';

import { Client } from '../client';
import { PacketHandler } from '../packet-handler';
import { Listener } from './listener';

@Service()
export class GatewayListener extends Listener {
  protected serverTable: ServerTable;

  constructor() {
    super(2610);

    this.serverTable = new ServerTable();

    this.serverTable.addEntry('127.0.0.1', 2611, 'A new name', 'Goes Here');
  }

  addClient(client: Client): void {
    super.addClient(client);

    client.sendPacket(
      new ServerPackets.AcceptConnectionPacket('CONNECTED SERVER\n')
    );
  }

  @PacketHandler(ClientPackets.VersionPacket)
  protected onVersionPacket(client: Client) {
    client.sendPacket(
      new ServerPackets.ConnectionInfoPacket(false, 12, client.seed, client.key)
    );
  }

  @PacketHandler(ClientPackets.ServerTableRequestPacket)
  protected onServerTableRequest(
    client: Client,
    packet: ClientPackets.ServerTableRequestPacket
  ) {
    if (packet.serverListMismatch) {
      client.sendPacket(new ServerPackets.ServerTablePacket(this.serverTable));
    } else {
      const redirect = new Redirect(
        client.seed,
        client.key,
        client.keySalts,
        1
      );

      const entry = this.serverTable.getEntry(packet.serverSelection);
      client.sendPacket(
        new ServerPackets.RedirectPacket(entry.ip, entry.port, redirect)
      );
    }
  }
}
