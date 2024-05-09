import { transfer } from 'comlink';

type WorkerModule = typeof import('./tilemap-factory');

const TileMapGenerator = new ComlinkWorker<WorkerModule>(
  new URL('./tilemap-factory', import.meta.url)
);

const canvas = document.createElement('canvas');
const offscreenCanvas = canvas.transferControlToOffscreen();

await TileMapGenerator.init(transfer(offscreenCanvas, [offscreenCanvas]));

export { TileMapGenerator };
