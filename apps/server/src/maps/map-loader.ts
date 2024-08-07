import * as fs from 'fs/promises';
import { MapInfo } from './map-info';
import { MapResource } from './map-resource';

class MapLoader {
  #info: Map<string, MapInfo>;
  #data: Map<number, Uint16Array>;

  constructor() {
    this.#data = new Map();
    this.#info = new Map();
  }

  async get(name: string): Promise<MapResource> {
    let info = this.#info.get(name);

    if (!info) {
      info = JSON.parse(await fs.readFile(`./data/maps/${name}.json`, 'utf-8')) as MapInfo;
      this.#info.set(name, info);
    }

    let data = this.#data.get(info.id);

    if (!data) {
      data = new Uint16Array((await fs.readFile(`./data/map-data/lod${info.id}.map`)).buffer);
      this.#data.set(info.id, data);
    }

    return {
      info,
      data,
    };
  }

  async delete() {}
}

export const mapLoader = new MapLoader();
