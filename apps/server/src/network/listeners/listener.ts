import { v4 as uuid } from 'uuid';

import { TcpServer } from '../servers/tcp/tcp-server';
import { WebServer } from '../servers/web/web-server';
import { ClientHandler } from '../client-handler';
import { Socket } from '../servers/socket';
import { Client } from '../client';
import { Constructor } from 'type-fest';
import { ClientPackets, ServerPackets } from '@medenia/network';
import { PacketHandler } from '../packet-handler';
import { redirectManager } from '../../services/redirect-manager';

export abstract class Listener extends ClientHandler {
  private tcpServer: TcpServer;
  private webServer: WebServer;

  constructor(
    port: number,
    private ctx: Constructor<Client>
  ) {
    super();

    this.tcpServer = new TcpServer(port);
    this.webServer = new WebServer(port + 100);

    this.tcpServer.on('connection', this.onConnection, this);
    this.webServer.on('connection', this.onConnection, this);
  }

  @PacketHandler(ClientPackets.ClientRedirectedPacket)
  onClientRedirected(client: Client, packet: ClientPackets.ClientRedirectedPacket) {
    const redirect = redirectManager.get(packet.redirect.id);

    if (!redirect || packet.redirect.key !== redirect.key || packet.redirect.seed !== redirect.seed || packet.redirect.keySalts !== redirect.keySalts) {
      client.disconnect();

      return;
    }

    client.key = packet.redirect.key;
    client.keySalts = packet.redirect.keySalts;
    client.seed = packet.redirect.seed;

    this.onRedirect(client, packet);
  }

  onRedirect(client: Client, packet: ClientPackets.ClientRedirectedPacket) {}

  onConnection(socket: Socket) {
    const id = uuid();
    const client = new this.ctx(id, socket);

    this.addClient(client);

    client.once('disconnect', this.onDisconnect, this);
  }

  onDisconnect(client: Client) {
    this.removeClient(client);
  }

  protected redirect(client: Client, address: string, port: number) {
    const redirect = redirectManager.add(client.seed, client.key, client.keySalts);

    client.sendPacket(new ServerPackets.RedirectPacket(address, port, redirect));
  }
}
