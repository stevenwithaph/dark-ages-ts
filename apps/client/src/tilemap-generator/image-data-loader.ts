import { AssetSource } from './asset-source';

class Loader {
  private items = new Map<string, ImageBitmap>();

  constructor() {
    this.items = new Map();
  }

  async load(assets: AssetSource[]) {
    return new Promise<void>(async (resolve) => {
      let count = 0;

      for (const asset of assets) {
        if (this.has(asset.src)) {
          count++;
          if (count === assets.length) {
            resolve();
          }
        } else {
          fetch(asset.src)
            .then((resp) => resp.blob())
            .then((blob) => createImageBitmap(blob))
            .then((bitmap) => {
              this.add(asset.src, bitmap);
              count++;
              if (count === assets.length) {
                resolve();
              }
            });
        }
      }
    });
  }

  add(name: string, object: any) {
    this.items.set(name, object);
  }

  remove(name: string) {
    this.items.delete(name);
  }

  get(name: string) {
    return this.items.get(name);
  }

  has(name: string) {
    return this.items.has(name);
  }
}

export const loader = new Loader();
