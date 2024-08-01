import { v4 as uuid } from 'uuid';

import { ClientPackets, ServerPackets } from '@medenia/network';
import { redirectManager } from '../../services/redirect-manager';
import { Client } from '../client';
import { ClientHandler } from '../client-handler';
import { PacketHandler } from '../packet-handler';
import { Socket } from './socket';
import { TcpServer } from './tcp/tcp-server';
import { WebServer } from './web/web-server';

import { GatewayListener } from '../listeners/gateway-listener';
import { AuthListener } from '../listeners/auth-listener';
import { WordListener } from '../listeners/world-listener';

export class GameServer extends ClientHandler {
  private tcpServer: TcpServer;
  private webServer: WebServer;

  private gateway: GatewayListener;
  private auth: AuthListener;
  private world: WordListener;

  constructor() {
    super();

    this.gateway = new GatewayListener();
    this.auth = new AuthListener();
    this.world = new WordListener();

    this.tcpServer = new TcpServer(2610);
    this.webServer = new WebServer(80);

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

    this.gateway.removeClient(client);

    client.key = packet.redirect.key;
    client.keySalts = packet.redirect.keySalts;
    client.seed = packet.redirect.seed;

    switch (redirect.subject) {
      case 'auth':
        this.auth.clientRedirected(client, packet);
        break;
      case 'game':
        this.world.clientRedirected(client, packet);
        break;
      default:
        client.disconnect();
    }
  }

  onConnection(socket: Socket) {
    const id = uuid();
    const client = new Client(id, socket);

    this.gateway.addClient(client);
    this.addClient(client);

    client.once('disconnect', this.onDisconnect, this);
  }

  onDisconnect(client: Client) {
    this.removeClient(client);
  }
}
