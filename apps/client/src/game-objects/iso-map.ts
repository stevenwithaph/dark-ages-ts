import { GameObjects, Scene, Tilemaps } from 'phaser';

import { Astar } from '../astar';
import { AtlasGid } from '../tilemap-generator/tilemap-factory';
import { TileMapGenerator } from '../tilemap-generator';

export const TILE_WIDTH = 56;
export const TILE_HEIGHT = 27;

export const TILES_PER_ATLAS = 2700;

const TILE_HALF_WIDTH = TILE_WIDTH / 2;
const TILE_HALF_HEIGHT = TILE_HEIGHT / 2;

export class IsoMap extends GameObjects.GameObject {
  protected tileMap: Tilemaps.Tilemap;
  protected tileSets: Tilemaps.Tileset[];
  protected astar: Astar;

  protected tileReference: Map<number, AtlasGid>;

  constructor(
    scene: Scene,
    protected mapId: number,
    protected width: number,
    protected height: number
  ) {
    super(scene, 'iso-map');

    this.astar = new Astar();

    this.tileMap = new Tilemaps.Tilemap(
      this.scene,
      new Tilemaps.MapData({
        tileWidth: TILE_WIDTH,
        tileHeight: TILE_HEIGHT,
        width,
        height,

        orientation: Tilemaps.Orientation.ISOMETRIC,
        format: Tilemaps.Formats.ARRAY_2D,
      })
    );
  }

  setMapData(data: Uint16Array) {
    this.createSpriteSheets(data);

    this.astar.create(data, this.width, this.height);
  }

  private async createSpriteSheets(data: Uint16Array) {
    const atlases = await TileMapGenerator.fromMapData(data);

    this.tileSets = [];
    for (let i = 0; i < atlases.tiles.sheets.length; i++) {
      const tileSheet = atlases.tiles.sheets[i];

      this.scene.textures.addUint8Array(
        `map/${this.mapId}/tiles/${i}`,
        new Uint8Array(tileSheet.data.buffer),
        tileSheet.width,
        tileSheet.height
      );

      const tileSet = this.tileMap.addTilesetImage(
        `map/${this.mapId}/tiles/${i}`
      );
      if (!tileSet) {
        throw new Error('Invalid Tileset');
      }
      this.tileSets.push(tileSet);
    }

    const layer = this.tileMap.createBlankLayer(
      `map/${this.mapId}`,
      this.tileSets
    );

    if (!layer) {
      throw new Error('Invalid layer');
    }

    layer.setDepth(Phaser.Math.MIN_SAFE_INTEGER);

    this.scene.add.existing(layer);

    this.tileReference = atlases.tiles.reference;

    for (let i = 0; i < atlases.walls.length; i++) {
      const atlas = atlases.walls[i];
      const sheet = this.scene.textures.addUint8Array(
        `map/${this.mapId}/walls`,
        new Uint8Array(atlas.sheet.data.buffer),
        atlas.sheet.width,
        atlas.sheet.height
      );
      for (const rect of atlas.rects) {
        sheet?.add(
          `map/${this.mapId}/walls/${rect.id}`,
          0,
          rect.x,
          rect.y,
          rect.width,
          rect.height
        );
      }
    }

    this.drawMapData(data);
  }

  private drawMapData(data: Uint16Array) {
    for (let i = 0; i < data.length; i += 3) {
      const tileId = data[i];
      const leftWallId = data[i + 1];
      const rightWallId = data[i + 2];

      const mapIndex = i / 3;
      const x = mapIndex % this.width;
      const y = Math.floor(mapIndex / this.width);

      this.drawTile(tileId, x, y);

      if (leftWallId >= 13) {
        this.drawWall(leftWallId, x, y, true);
      }
      if (rightWallId >= 13) {
        this.drawWall(rightWallId, x, y, false);
      }
    }
  }

  drawTile(tileId: number, tileX: number, tileY: number) {
    const gid = this.tileReference.get(tileId)?.gid ?? 0;

    this.tileMap.putTileAt(gid, tileX, tileY);
  }

  drawWall(wallId: number, tileX: number, tileY: number, right: boolean) {
    const position = this.tileToWorldXY(tileX, tileY);

    const wall = new GameObjects.Sprite(
      this.scene,
      position.x,
      position.y,
      `map/${this.mapId}/walls`,
      `map/${this.mapId}/walls/${wallId}`
    );

    wall.setOrigin(right ? 1 : 0, 1);
    wall.setDepth(position.y);

    this.scene.add.existing(wall);
  }

  async findPath(startX: number, startY: number, endX: number, endY: number) {
    return await this.astar.findPath(startX, startY, endX, endY);
  }

  avoidPoint(tileX: number, tileY: number) {
    this.astar.avoidPoint(tileX, tileY);
  }

  stopAvoidingPoint(tileX: number, tileY: number) {
    this.astar.stopAvoidingPoint(tileX, tileY);
  }

  tileToWorldXY(tileX: number, tileY: number) {
    const world = new Phaser.Math.Vector2(
      (tileX - tileY) * TILE_HALF_WIDTH,
      (tileX + tileY) * TILE_HALF_HEIGHT
    );

    world.x += 27;
    world.y += 27;

    return world;
  }

  worldToTileXY(worldX: number, worldY: number) {
    worldX -= 27;
    worldY -= 27;

    const tile = new Phaser.Math.Vector2(
      Math.ceil(worldX / TILE_WIDTH + worldY / TILE_HEIGHT),
      Math.ceil(worldY / TILE_HEIGHT - worldX / TILE_WIDTH)
    );

    return tile;
  }
}
