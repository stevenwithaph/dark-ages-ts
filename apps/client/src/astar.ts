import EasyStar from 'easystarjs';

export class Astar {
  private easystar = new EasyStar.js();
  private width: number;
  private height: number;

  private grid: number[][] = [];
  private additional: Map<number, number>;

  public static Sotp: Uint8Array;

  constructor() {
    this.easystar.setAcceptableTiles(0);
  }

  setSize(width: number, height: number) {
    this.additional = new Map();

    this.width = width;
    this.height = height;
  }

  setGrid(mapData: Uint16Array) {
    this.grid = [];

    for (let i = 0; i < this.height; i++) {
      this.grid.push([]);
      for (let j = 0; j < this.width; j++) {
        const idx = (i * this.width + j) * 3;

        const leftWallId = mapData[idx + 1];
        const rightWallId = mapData[idx + 2];

        if (Astar.Sotp[leftWallId - 1] === 0x0f || Astar.Sotp[rightWallId - 1] === 0x0f) {
          this.grid[i].push(1);
        } else {
          this.grid[i].push(0);
        }
      }
    }

    this.easystar.setGrid(this.grid);
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

  isObstacle(x: number, y: number) {
    const tileIdx = x + y * this.width;

    return this.grid[x][y] === 0x0f || this.additional.has(tileIdx);
  }

  avoidPoint(tileX: number, tileY: number) {
    const tileIdx = tileX + tileY * this.width;
    let entities = this.additional.get(tileIdx) ?? 0;

    entities++;

    if (entities === 1) {
      this.easystar.avoidAdditionalPoint(tileX, tileY);
    }

    if (entities > 0) {
      this.additional.set(tileIdx, entities);
    } else {
      this.additional.delete(tileIdx);
    }
  }

  stopAvoidingPoint(tileX: number, tileY: number) {
    const tileIdx = tileX + tileY * this.width;
    let entities = this.additional.get(tileIdx) ?? 1;

    entities--;

    if (entities === 0) {
      this.easystar.stopAvoidingAdditionalPoint(tileX, tileY);
      this.additional.delete(tileIdx);
    } else {
      this.additional.set(tileIdx, entities);
    }
  }
}
