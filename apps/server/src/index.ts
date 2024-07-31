import 'reflect-metadata';

import { AppDataSource } from './db';

import { GatewayListener } from './network/listeners/gateway-listener';
import { AuthListener } from './network/listeners/auth-listener';
import { WorldServer } from './network/listeners/world-listener';

AppDataSource.initialize();

new GatewayListener();
new AuthListener();
new WorldServer();
