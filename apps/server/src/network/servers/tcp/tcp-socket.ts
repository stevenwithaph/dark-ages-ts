import EventEmitter from 'eventemitter3';
import { type Socket } from 'net';
import { Socket as BaseSocket } from '../socket';

type SocketEvents = {
  data: (data: Buffer) => void;
  error: (error: Error) => void;
  disconnect: () => void;
};

export class TcpSocket extends BaseSocket {
  constructor(private socket: Socket) {
    super();

    this.onData = this.onData.bind(this);
    this.onError = this.onError.bind(this);
    this.onClose = this.onClose.bind(this);

    socket.on('data', this.onData);
    socket.on('error', this.onError);
    socket.on('close', this.onClose);
  }

  send(data: Uint8Array) {
    this.socket.write(data);
  }
}
