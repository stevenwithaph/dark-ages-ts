import { WebSocketServer, WebSocket as WsWebSocket } from 'ws';
import { Server } from '../server';
import { WebSocket } from './web-socket';

export class WebServer extends Server {
  private server: WebSocketServer;

  constructor(protected port: number) {
    super();
    this.server = new WebSocketServer({ port });

    this.server.on('connection', (socket: WsWebSocket) =>
      this.onConnection(socket)
    );
  }

  private onConnection(socket: WsWebSocket) {
    this.emit('connection', new WebSocket(socket));
  }
}
