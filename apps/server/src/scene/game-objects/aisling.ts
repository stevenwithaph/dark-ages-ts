import { AislingDisplay, NameDisplay, ServerPackets } from '@medenia/network';
import { Peer } from '../network/peer';
import { MapEntity } from './map-entity';
import { Aisling as AislingModel } from '@prisma/client';

/**
 * 0- 15 no body - still pants
 * 16 - 31 male body - pants
 * 32 - 47 female body - pants
 */

export class Aisling extends MapEntity {
  protected display: AislingDisplay;

  constructor(model: AislingModel) {
    super(model.username);

    this.display = {
      helmet: model.hairStyle,
      helmetColour: model.hairColour,
      armor: 0,
      armor2: 1,
      boots: 1,
      shield: 0,
      weapon: 0,
      bootsColour: 6,
      bodyShape: model.bodyType === 1 ? 17 : 32,
      accessory1Colour: 0,
      accessory1: 0,
      accessory2Colour: 0,
      accessory2: 0,
      accessory3Colour: 0,
      accessory3: 0,
      lanternSize: 0,
      restPosition: 0,
      overcoat: 0,
      overcoatColour: 0,
      bodyColour: 0,
      isTransparent: false,
      faceShape: 0,
    };
  }

  onObserverAdded(peer: Peer) {
    super.onObserverAdded(peer);

    /**
     * 0: invis
     * 16: body type 1
     * 32: body type 2
     * 48: ghost - pants
     * 64: ghost - no pants
     * 80: body type 1 transparent
     * 96: body type 2 transparent
     * 112: jester
     * 128: body type 1 head - no pants
     * 144: body type 2 head - no pants
     */

    peer.send(
      new ServerPackets.DisplayAislingPacket(this.x, this.y, this.direction, this.identity.networkId, this.display, NameDisplay.NeutralHover, this.name, '')
    );
  }
}
