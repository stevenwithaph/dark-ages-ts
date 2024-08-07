import EasyStar from 'easystarjs';

export class Astar {
  private easystar = new EasyStar.js();
  private width: number;
  private height: number;

  public static Sotp: Uint8Array;

  constructor() {
    this.easystar.setAcceptableTiles(0);
  }

  create(mapData: Uint16Array, width: number, height: number) {
    const grid: number[][] = [];

    this.width = width;
    this.height = height;

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
    //this.easystar.avoidAdditionalPoint(tileX, tileY);
  }

  stopAvoidingPoint(tileX: number, tileY: number) {
    //this.easystar.stopAvoidingAdditionalPoint(tileX, tileY);
  }
}
