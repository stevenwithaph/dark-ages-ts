import EventEmitter from 'eventemitter3';
import {Socket} from './socket';

type ServerEvents = {
  connection: (socket: Socket) => void;
}

export abstract class Server extends EventEmitter<ServerEvents> {

}