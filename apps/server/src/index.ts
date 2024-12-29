import 'reflect-metadata';

import { AppDataSource } from './database';
import { GameServer } from './network/servers/game-server';

AppDataSource.initialize();

new GameServer();
