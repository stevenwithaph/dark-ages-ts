function tilesetFileCallback(
  this: Phaser.Loader.LoaderPlugin,
  id: number,
  tilesets: Set<number>
) {
  const tileset = new TilesetFile(this, id, tilesets);

  this.addFile(tileset.files);
}

class TilesetFile extends Phaser.Loader.MultiFile {
  constructor(
    loader: Phaser.Loader.LoaderPlugin,
    id: number,
    tilesets: Set<number>
  ) {
    const images: Phaser.Loader.FileTypes.ImageFile[] = [];

    for (const tileset of tilesets) {
      const image = new Phaser.Loader.FileTypes.ImageFile(
        loader,
        `mpt-tileset-${tileset}`,
        `assets/tiles/mpt/${tileset}.png`
      );

      images.push(image);
    }

    super(loader, 'tileset', `${id}`, images);
  }

  addToCache(): void {
    if (this.isReadyToProcess()) {
      for (const file of this.files) {
        this.loader.textureManager.create(file.key, file.data);
      }
    }
  }
}

export class TilesetFilePlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager: Phaser.Plugins.PluginManager) {
    super(pluginManager);

    pluginManager.registerFileType('tileset', tilesetFileCallback);
  }
}
