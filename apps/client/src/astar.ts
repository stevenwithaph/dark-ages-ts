import EasyStar from 'easystarjs';

export class Astar {
  private easystar = new EasyStar.js();
  private width: number;
  private height: number;

  private additional: Uint8Array;

  public static Sotp: Uint8Array;

  constructor() {
    this.easystar.setAcceptableTiles(0);
  }

  setSize(width: number, height: number) {
    this.additional = new Uint8Array(width * height);

    this.width = width;
    this.height = height;
  }

  setGrid(mapData: Uint16Array) {
    const grid: number[][] = [];

    for (let i = 0; i < this.height; i++) {
      grid.push([]);
      for (let j = 0; j < this.width; j++) {
        const idx = (i * this.width + j) * 3;

        const leftWallId = mapData[idx + 1];
        const rightWallId = mapData[idx + 2];

        if (Astar.Sotp[leftWallId - 1] === 0x0f || Astar.Sotp[rightWallId - 1] === 0x0f) {
          grid[i].push(1);
        } else {
          grid[i].push(0);
        }
      }
    }

    this.easystar.setGrid(grid);
  }

  async findPath(startX: number, startY: number, endX: number, endY: number) {
    return new Promise<{ x: number; y: number }[]>((resolve) => {
      if (endX < 0 || endX >= this.width || endY < 0 || endY >= this.height) {
        resolve([]);
      }

      this.easystar.findPath(startX, startY, endX, endY, (path) => {
        if (path === null || path.length === 1) {
          resolve([]);
        } else {
          resolve(path.slice(1));
        }
      });
      this.easystar.calculate();
    });
  }

  avoidPoint(tileX: number, tileY: number) {
    const tileIdx = tileX + tileY * this.width;
    const entities = this.additional[tileIdx];

    this.additional[tileIdx]++;

    if (entities === 1) {
      this.easystar.avoidAdditionalPoint(tileX, tileY);
    }
  }

  stopAvoidingPoint(tileX: number, tileY: number) {
    const tileIdx = tileX + tileY * this.width;
    const entities = this.additional[tileIdx];

    this.additional[tileIdx]--;

    if (entities === 0) {
      this.easystar.stopAvoidingAdditionalPoint(tileX, tileY);
    }
  }
}
