import * as fs from 'fs/promises';

class MapLoader {
  #maps: Map<number, Uint16Array>;

  constructor() {
    this.#maps = new Map();
  }

  async get(id: number) {
    let data = this.#maps.get(id);

    if (!data) {
      data = new Uint16Array((await fs.readFile(`./data/map-data/lod${id}.map`)).buffer);
    }

    return data;
  }

  async delete() {}
}

export const mapLoader = new MapLoader();
