import { WebSocket as WsWebSocket } from 'ws';
import { Socket } from '../socket';

export class WebSocket extends Socket {
  constructor(private socket: WsWebSocket) {
    super();

    this.onData = this.onData.bind(this);
    this.onError = this.onError.bind(this);
    this.onClose = this.onClose.bind(this);

    socket.on('message', this.onData);
    socket.on('error', this.onError);
    socket.on('close', this.onClose);
  }

  send(data: Uint8Array) {
    this.socket.send(data);
  }

  disconnect(): void {
    this.socket.close();
  }
}
