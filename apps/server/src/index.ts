import 'reflect-metadata';

import { Container } from 'typedi';

import { GatewayListener } from './network/listeners/gateway-listener';
import { AuthListener } from './network/listeners/auth-listener';
import { MapServer } from './network/listeners/world-listener';

Container.get(GatewayListener);
Container.get(AuthListener);
Container.get(MapServer);
