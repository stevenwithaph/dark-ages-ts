import { Service } from 'typedi';

import { ClientPackets, ServerPackets } from '@medenia/network';
import { Client } from '../client';
import { PacketHandler } from '../packet-handler';
import { MapService } from '../../services/map-service';
import { Listener } from './listener';

@Service()
export class MapServer extends Listener {
  constructor(private maps: MapService) {
    super(2612);
  }

  @PacketHandler(ClientPackets.RequestProfilePacket)
  onRequestProfile(client: Client) {
    client.sendPacket(
      new ServerPackets.SelfProfilePacket(
        0,
        'guild',
        'hero',
        'partying',
        false,
        0,
        'hero',
        'guild name',
        0,
        1
      )
    );
  }

  @PacketHandler(ClientPackets.ClientRedirectedPacket)
  async onClientRedirected(
    client: Client,
    packet: ClientPackets.ClientRedirectedPacket
  ) {
    client.key = packet.key;
    client.keySalts = packet.keySalts;
    client.seed = packet.seed;

    this.maps.transfer(500, client, 27, 45, 0);
  }

  @PacketHandler(ClientPackets.SynchronizeTicksPacket)
  onSynchronizeTicks(
    client: Client,
    packet: ClientPackets.SynchronizeTicksPacket
  ) {
    //  Intentionally left blank
  }
}
