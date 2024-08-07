import { ClientPackets, ServerPackets } from '@medenia/network';
import { IsoMap } from '../game-objects/iso-map';
import { PacketHandler } from '../network/packet-handler';
import { NetworkedScene } from './networked-scene';
import { clientManager } from '../network/client-manager';
import { PlayerController } from '../controllers/player-controller';
import { MapEntity } from '../game-objects/map-entity';
import { PaperDollContainer, PaperDollGender } from '../game-objects/paper-doll/paper-doll-container';
import { Actor } from '../game-objects/actor';
import { RouterStore } from '../ui/stores/router.svelte';
import { CompassStore } from '../ui/stores/compass.svelte';

enum BodyFlags {
  MaleBody = 16,
  FemaleBody = 32,
}

export class MapScene extends NetworkedScene {
  map: IsoMap;

  mapData: Uint16Array;

  playerController: PlayerController;

  private width: number = 0;
  private height: number = 0;

  private cursor: Phaser.GameObjects.Image;

  private entities: Map<number, MapEntity> = new Map();

  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super({
      key: 'map',
      ...config,
    });
  }

  create() {
    RouterStore.push('game');

    this.cameras.main.setZoom(2);

    this.cameras.main.centerOn(0, 0);

    this.map = new IsoMap(this);
    this.add.existing(this.map);

    this.playerController = new PlayerController(this, clientManager.main);
    this.add.existing(this.playerController);

    this.cursor = this.add
      .image(0, 0, 'cursor')
      .setDepth(Phaser.Math.MIN_SAFE_INTEGER + 1)
      .setOrigin(0.5, 1);
  }

  @PacketHandler(ServerPackets.MapInfoPacket)
  onMapInfo(packet: ServerPackets.MapInfoPacket) {
    this.width = packet.width;
    this.height = packet.height;

    this.mapData = new Uint16Array(packet.width * packet.height * 3);
    this.map.setMapInfo(packet.areaId, packet.width, packet.height);

    CompassStore.name = packet.name;

    for (const [_, entity] of this.entities) {
      entity.destroy(true);
    }

    this.entities.clear();
    this.playerController.actorId = 0;

    clientManager.main.send(new ClientPackets.RequestMapDataPacket());
  }

  @PacketHandler(ServerPackets.MapChangePendingPacket)
  onMapChangePending() {}

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

    CompassStore.x = packet.x;
    CompassStore.y = packet.y;

    const player = this.entities.get(this.playerController.actorId);
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

    aisling.pieces.body.setDye(63 + packet.info.bodyColour);

    //  TODO: there has to be a better way
    if ((packet.info.bodyShape & BodyFlags.FemaleBody) === BodyFlags.FemaleBody) {
      if (packet.info.bodyShape === BodyFlags.FemaleBody) {
        aisling.pieces.pants.setItemId(0);
      }
    } else if ((packet.info.bodyShape & BodyFlags.MaleBody) === BodyFlags.MaleBody) {
      if (packet.info.bodyShape === BodyFlags.FemaleBody) {
        aisling.pieces.pants.setItemId(0);
      } else {
        aisling.pieces.pants.setItemId(1);
        aisling.pieces.pants.setDye(79 + (packet.info.bodyShape & 0x0f));
      }
    }

    const entity = new MapEntity(this, aisling, this.map, packet.x, packet.y);

    this.entities.set(packet.id, entity);
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
      this.entities.set(entity.id, mapEntity);
    }
  }

  @PacketHandler(ServerPackets.CreatureWalkPacket)
  onCreatureWalk(packet: ServerPackets.CreatureWalkPacket) {
    const actor = this.entities.get(packet.actorId);

    if (!actor) return;

    actor.moveFrom(packet.fromX, packet.fromY, packet.direction);
  }

  @PacketHandler(ServerPackets.RemoveObjectPacket)
  onRemoveObject(packet: ServerPackets.RemoveObjectPacket) {
    const actor = this.entities.get(packet.entityId);

    if (actor) {
      actor.destroy(true);
    }
  }

  @PacketHandler(ServerPackets.ChatMessagePacket)
  onChatMessage(packet: ServerPackets.ChatMessagePacket) {
    const actor = this.entities.get(packet.entityId);

    if (!actor) {
      return;
    }

    actor.say(packet.message);
  }

  update(): void {
    super.update();

    const player = this.entities.get(this.playerController.actorId);
    if (player) {
      this.cameras.main.centerOn(player.x, player.y);
    }

    const tile = this.map.worldToTileXY(this.input.mousePointer.worldX, this.input.mousePointer.worldY);
    const world = this.map.tileToWorldXY(tile.x, tile.y);

    this.cursor.setPosition(world.x, world.y);
  }
}
