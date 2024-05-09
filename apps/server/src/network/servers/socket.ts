import EventEmitter from 'eventemitter3';

type SocketEvents = {
  data: (data: Buffer) => void;
  error: (error: Error) => void;
  disconnect: () => void;
};

export abstract class Socket extends EventEmitter<SocketEvents> {
  onError(error: Error) {
    this.emit('error', error);
  }

  onClose() {
    this.emit('disconnect');
  }

  onData(data: Buffer) {
    this.emit('data', data);
  }

  abstract send(data: Uint8Array): void;
}
