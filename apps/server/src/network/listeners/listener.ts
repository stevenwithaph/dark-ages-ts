import { v4 as uuid } from 'uuid';

import { TcpServer } from '../servers/tcp/tcp-server';
import { WebServer } from '../servers/web/web-server';
import { ClientHandler } from '../client-handler';
import { Socket } from '../servers/socket';
import { Client } from '../client';

export abstract class Listener extends ClientHandler {
  private tcpServer: TcpServer;
  private webServer: WebServer;

  constructor(port: number) {
    super();

    this.tcpServer = new TcpServer(port);
    this.webServer = new WebServer(port + 100);

    this.tcpServer.on('connection', this.onConnection, this);
    this.webServer.on('connection', this.onConnection, this);
  }

  onConnection(socket: Socket) {
    const id = uuid();
    const client = new Client(id, socket);

    this.addClient(client);

    client.once('disconnect', this.onDisconnect, this);
  }

  onDisconnect(client: Client) {
    this.removeClient(client);
  }
}
