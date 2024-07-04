import 'reflect-metadata';

import { GatewayListener } from './network/listeners/gateway-listener';
import { AuthListener } from './network/listeners/auth-listener';
import { WorldServer } from './network/listeners/world-listener';

new GatewayListener();
new AuthListener();
new WorldServer();
