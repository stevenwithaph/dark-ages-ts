import { ServerPackets } from '@medenia/network';
import { Client } from '../network/client';
import { Actor } from './actor';
import { SpatialHashGrid } from './map/spatial-hash-grid';
import { EntityTypes } from './entity-types';

export class Aisling extends Actor {
  public get layer(): EntityTypes {
    return EntityTypes.AISLING;
  }
  public get mask(): EntityTypes {
    return EntityTypes.AREA | EntityTypes.AISLNG_AREA;
  }

  private _client: Client;

  public get clientId() {
    return this._client.networkId;
  }

  constructor(client: Client, grid: SpatialHashGrid) {
    super(client.networkId, grid);

    this._client = client;
  }

  public createDisplay() {
    return new ServerPackets.DisplayAislingPacket(
      this.x,
      this.y,
      this.direction,
      this.networkId,
      {
        helmet: 13,
        bodyShape: 16,
        armor: 0,
        armor2: 9,
        boots: 4,
        shield: 0,
        weapon: 240,
        helmetColour: 0,
        bootsColour: 0,
        accessory1Colour: 0,
        accessory1: 0,
        accessory2: 0,
        accessory2Colour: 0,
        accessory3: 0,
        accessory3Colour: 0,
        lanternSize: 0,
        restPosition: 0,
        overcoat: 0,
        overcoatColour: 0,
        bodyColour: 0,
        isTransparent: false,
        faceShape: 1,
      },
      0,
      'steven',
      ''
    );
  }

  protected onHealthChange(percent: number): void {
    super.onHealthChange(percent);

    //  send stats to current client
  }
}
