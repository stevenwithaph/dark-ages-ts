import * as fs from 'fs/promises';

class MapLoader {
  #maps: Map<string, Uint16Array>;

  async get(id: string) {
    let data = this.#maps.get('asdf');

    if (!data) {
      data = new Uint16Array((await fs.readFile(`./data/map-data/lod${id}.map`)).buffer);
    }
  }

  async delete() {}
}

export const mapLoader = new MapLoader();
