import { IRectangle, MaxRectsPacker } from '@medenia/maxrects-packer';
import { loader } from './image-data-loader';
import { AssetSource } from './asset-source';

interface TextureRect extends IRectangle {
  x: number;
  y: number;
  width: number;
  height: number;
  asset: AssetSource;
}

export interface AtlasRect {
  x: number;
  y: number;
  width: number;
  height: number;
  sheet: number;
  id: number;
}

export interface AtlasGid {
  gid: number;
  sheet: number;
}

export interface Atlas {
  sheet: ImageData;
  rects: AtlasRect[];
}

let offscreenCanvas: OffscreenCanvas;
let context: OffscreenCanvasRenderingContext2D;

export function init(canvas: OffscreenCanvas) {
  offscreenCanvas = canvas;
  canvas.width = 2048;
  canvas.height = 2048;
  context = offscreenCanvas.getContext('2d')!;
}

export async function fromMapData(data: Uint16Array) {
  const tileSet: Map<number, AssetSource> = new Map();
  const wallSet: Map<number, AssetSource> = new Map();

  for (let i = 0; i < data.length; i += 3) {
    const tileId = data[i];

    const leftWallId = data[i + 1];
    const rightWallId = data[i + 2];

    if (tileId > 0) {
      tileSet.set(tileId, {
        src: `${import.meta.env.VITE_ASSET_PATH}/assets/tiles/mpt/${tileId}.png`,
        id: tileId,
      });
    }

    if (leftWallId > 13) {
      wallSet.set(leftWallId, {
        src: `${import.meta.env.VITE_ASSET_PATH}/assets/walls/stc/${leftWallId}.png`,
        id: leftWallId,
      });
    }

    if (rightWallId > 13) {
      wallSet.set(rightWallId, {
        src: `${import.meta.env.VITE_ASSET_PATH}/assets/walls/stc/${rightWallId}.png`,
        id: rightWallId,
      });
    }
  }

  await loader.load([...Array.from(tileSet.values()), ...Array.from(wallSet.values())]);

  const walls = createSpriteSheet(wallSet);
  const tiles = createTileSheet(tileSet);

  return {
    tiles,
    walls,
  };
}

function createTileSheet(assets: Map<number, AssetSource>) {
  const packer = new MaxRectsPacker<TextureRect>(2024, 2048, 0, {
    square: false,
    pot: false,
  });

  for (const [_, asset] of assets) {
    const bitmap = loader.get(asset.src);
    if (!bitmap) continue;
    packer.add({
      x: 0,
      y: 0,
      width: bitmap.width,
      height: bitmap.height,
      bin: 0,
      asset,
    });
  }

  const sheets: ImageData[] = [];
  const reference: Map<number, AtlasGid> = new Map();
  for (const bin of packer.bins) {
    context.clearRect(0, 0, 2048, 2048);

    const rows = bin.width / 56;
    const cols = bin.height / 27;

    for (const rect of packer.rects) {
      const bitmap = loader.get(rect.asset.src);
      if (!bitmap) continue;

      const row = (rect.x / bin.width) * rows;
      const col = (rect.y / bin.height) * cols;

      context.drawImage(bitmap, rect.x, rect.y);
      let gid = col * rows + row;
      reference.set(rect.asset.id, {
        gid: gid,
        sheet: rect.bin,
      });
    }
    sheets.push(context.getImageData(0, 0, bin.width, bin.height));
  }

  return {
    sheets,
    reference,
  };
}

function createSpriteSheet(assets: Map<number, AssetSource>) {
  const packer = new MaxRectsPacker<TextureRect>(2048, 2048, 0, {
    square: true,
    pot: true,
  });

  for (const [_, asset] of assets) {
    const bitmap = loader.get(asset.src);
    if (!bitmap) continue;
    packer.add({
      x: 0,
      y: 0,
      width: bitmap.width,
      height: bitmap.height,
      bin: 0,
      asset,
    });
  }

  const atlases: Atlas[] = [];
  for (const bin of packer.bins) {
    context.clearRect(0, 0, 1024, 1024);
    const atlasRects: AtlasRect[] = [];
    for (const rect of packer.rects) {
      const bitmap = loader.get(rect.asset.src);
      if (!bitmap) continue;

      context.drawImage(bitmap, rect.x, rect.y);
      atlasRects.push({
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        sheet: rect.bin,
        id: rect.asset.id,
      });
    }
    atlases.push({
      sheet: context.getImageData(0, 0, bin.width, bin.height),
      rects: atlasRects,
    });
  }

  return atlases;
}
