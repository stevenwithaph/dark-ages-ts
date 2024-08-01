import { WebSocketServer, WebSocket as WsWebSocket } from 'ws';
import fs from 'fs';
import https from 'https';
import { Server } from '../server';
import { WebSocket } from './web-socket';

export class WebServer extends Server {
  private server: WebSocketServer;

  constructor(protected port: number) {
    super();

    let config = {};

    if (process.env.ENV === 'prod') {
      config = {
        cert: fs.readFileSync(process.env.CERT as string),
        key: fs.readFileSync(process.env.KEY as string),
      };
    }

    const httpServer = https.createServer(config).listen(process.env.ENV === 'prod' ? 443 : 80);

    this.server = new WebSocketServer({ server: httpServer });

    this.server.on('connection', (socket: WsWebSocket) => this.onConnection(socket));
  }

  private onConnection(socket: WsWebSocket) {
    this.emit('connection', new WebSocket(socket));
  }
}
