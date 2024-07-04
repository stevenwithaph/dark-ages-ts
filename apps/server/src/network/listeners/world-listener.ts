import { ClientPackets, ServerPackets, PanelType } from '@medenia/network';
import { Client } from '../client';
import { PacketHandler } from '../packet-handler';
import { Listener } from './listener';
import { playerCache } from '../../services/player-cache';

export class WorldServer extends Listener {
  constructor() {
    super(2612, Client);
  }

  async onRedirect(client: Client, packet: ClientPackets.ClientRedirectedPacket) {
    playerCache.connect(client, packet.redirect.keySalts);
  }

  @PacketHandler(ClientPackets.RequestProfilePacket)
  onRequestProfile(client: Client) {
    client.sendPacket(new ServerPackets.SelfProfilePacket(0, '', '', '', false, 0, '', '', 0));
  }

  @PacketHandler(ClientPackets.UnequipPacket)
  onUnequip(client: Client, packet: ClientPackets.UnequipPacket) {
    const player = playerCache.get(client.id);

    if (!player) {
      return;
    }

    player.equipment.remove(packet.slot);
  }

  @PacketHandler(ClientPackets.SwapSlotPacket)
  onSwapSlot(client: Client, packet: ClientPackets.SwapSlotPacket) {
    const player = playerCache.get(client.id);

    if (!player) {
      return;
    }

    switch (packet.panelType) {
      case PanelType.Inventory:
        player.inventory.move(packet.slot1, packet.slot2);
        break;
      case PanelType.SpellBook:
        player.spells.move(packet.slot1, packet.slot2);
        break;
      case PanelType.SkillBook:
        player.skills.move(packet.slot1, packet.slot2);
        break;
    }
  }

  @PacketHandler(ClientPackets.SynchronizeTicksPacket)
  onSynchronizeTicks(client: Client, packet: ClientPackets.SynchronizeTicksPacket) {
    //  Intentionally left blank
  }
}
