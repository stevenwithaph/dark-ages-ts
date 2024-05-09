import { createServer, type Server, type Socket } from 'net';
import { Server as BaseServer } from '../server';
import { TcpSocket } from './tcp-socket';

export class TcpServer extends BaseServer {
  protected server: Server;

  constructor(public port: number) {
    super();
    this.server = createServer((socket: Socket) => this.onConnection(socket));
    this.server.listen(port);
  }

  private onConnection(socket: Socket) {
    this.emit('connection', new TcpSocket(socket));
  }
}
