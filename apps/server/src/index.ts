import 'reflect-metadata';

import { AppDataSource } from './db';
import { GameServer } from './network/servers/game-server';

AppDataSource.initialize();

new GameServer();
