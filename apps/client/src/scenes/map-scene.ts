import { ClientPackets, ServerPackets } from '@medenia/network';
import { IsoMap } from '../game-objects/iso-map';
import { PacketHandler } from '../network/packet-handler';
import { NetworkedScene } from './networked-scene';
import { clientManager } from '../network/client-manager';
import { PlayerController } from '../controllers/player-controller';
import { MapEntity } from '../game-objects/map-entity';
import { PaperDollContainer, PaperDollGender } from '../game-objects/paper-doll/paper-doll-container';
import { EventBus } from '../ui/event-bus';
import { Actor } from '../game-objects/actor';
import { RouterStore } from '../ui/stores/router.svelte';

export class MapScene extends NetworkedScene {
  map: IsoMap;

  mapData: Uint16Array;

  playerController: PlayerController;

  private width: number = 0;
  private height: number = 0;

  private cursor: Phaser.GameObjects.Image;

  private actors: Map<number, MapEntity> = new Map();

  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super({
      key: 'map',
      ...config,
    });
  }

  create(data: any) {
    RouterStore.push('game');

    this.cameras.main.setZoom(2);

    if (data !== null) {
      clientManager.main.redirect(data.ip, data.port, data.redirect);
    }

    this.cameras.main.centerOn(0, 0);

    this.playerController = new PlayerController(this, clientManager.main);

    this.cursor = this.add
      .image(0, 0, 'cursor')
      .setDepth(Phaser.Math.MIN_SAFE_INTEGER + 1)
      .setOrigin(0.5, 1);
  }

  @PacketHandler(ServerPackets.MapInfoPacket)
  onMapInfo(packet: ServerPackets.MapInfoPacket) {
    console.log(packet);
    this.width = packet.width;
    this.height = packet.height;

    this.mapData = new Uint16Array(packet.width * packet.height * 3);

    clientManager.main.send(new ClientPackets.RequestMapDataPacket());

    this.map = new IsoMap(this, packet.areaId, packet.width, packet.height);
    this.add.existing(this.map);
  }

  @PacketHandler(ServerPackets.SoundPacket)
  onSound(packet: ServerPackets.SoundPacket) {
    if (packet.isMusic) {
      this.bgm.play(packet.assetId);
    }
  }

  @PacketHandler(ServerPackets.MapDataPacket)
  onMapData(packet: ServerPackets.MapDataPacket) {
    const offset = packet.row * this.width * 3;

    this.mapData.set(packet.data, offset);
    if (packet.row === this.height - 1) {
      this.map.setMapData(this.mapData);
    }
  }

  @PacketHandler(ServerPackets.LocationPacket)
  onLocation(packet: ServerPackets.LocationPacket) {
    const position = this.map.tileToWorldXY(packet.x, packet.y);
    this.cameras.main.centerOn(position.x, position.y);

    const player = this.actors.get(this.playerController.actorId);
    if (player) {
      player.setToTilePosition(position.x, position.y);
    }
  }

  @PacketHandler(ServerPackets.UserIdPacket)
  onUserId(packet: ServerPackets.UserIdPacket) {
    this.playerController.actorId = packet.userId;
  }

  @PacketHandler(ServerPackets.DisplayAislingPacket)
  onDisplayAisling(packet: ServerPackets.DisplayAislingPacket) {
    const aisling = new PaperDollContainer(this, packet.info.bodyShape & 16 ? PaperDollGender.Male : PaperDollGender.Female, packet.direction);

    //  TODO: move this to the aisling class
    aisling.pieces.helmet.setItemId(packet.info.helmet);
    aisling.pieces.helmet.setDye(79 + packet.info.helmetColour);

    aisling.pieces.armor.setItemId(packet.info.armor2);

    aisling.pieces.weapon.setItemId(packet.info.weapon);
    aisling.pieces.shield.setItemId(packet.info.shield);

    aisling.pieces.boots.setItemId(packet.info.boots);
    aisling.pieces.boots.setDye(79 + packet.info.bootsColour);

    // Women don't wear pants
    const pantsDye = 16 ^ packet.info.bodyShape;
    aisling.pieces.pants.setItemId(1);
    aisling.pieces.pants.setDye(79 + pantsDye);

    const entity = new MapEntity(this, aisling, this.map, packet.x, packet.y);

    this.actors.set(packet.id, entity);

    this.add.existing(entity);

    if (this.playerController.actorId === packet.id) {
      this.playerController.possses(entity);
    }
  }

  @PacketHandler(ServerPackets.DisplayVisibleEntitiesPacket)
  onDisplayVisibleEntities(packet: ServerPackets.DisplayVisibleEntitiesPacket) {
    for (const entity of packet.entities) {
      const actor = new Actor(this, entity.spriteId);

      const mapEntity = new MapEntity(this, actor, this.map, entity.x, entity.y);

      this.add.existing(mapEntity);
      this.actors.set(entity.id, mapEntity);
    }
  }

  @PacketHandler(ServerPackets.CreatureWalkPacket)
  onCreatureWalk(packet: ServerPackets.CreatureWalkPacket) {
    const actor = this.actors.get(packet.actorId);

    if (!actor) return;

    actor.moveFrom(packet.fromX, packet.fromY, packet.direction);
  }

  @PacketHandler(ServerPackets.RemoveObjectPacket)
  onRemoveObject(packet: ServerPackets.RemoveObjectPacket) {
    const actor = this.actors.get(packet.entityId);
    if (actor) {
      actor.destroy(true);
    }
  }

  update(): void {
    const player = this.actors.get(this.playerController.actorId);
    if (player) {
      this.cameras.main.centerOn(player.x, player.y);
    }

    if (this.map) {
      const tile = this.map.worldToTileXY(this.input.mousePointer.worldX, this.input.mousePointer.worldY);
      const world = this.map.tileToWorldXY(tile.x, tile.y);

      this.cursor.setPosition(world.x, world.y);
    }
  }
}
