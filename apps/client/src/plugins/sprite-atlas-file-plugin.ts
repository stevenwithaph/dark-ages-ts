import * as Phaser from 'phaser';

interface SpriteAtlasFrame {
  name: string;
  bounds: Phaser.Geom.Rectangle;
  offsets?: Phaser.Geom.Rectangle;
}

interface SpriteAtlas {
  frames: Array<SpriteAtlasFrame>;
}

function atlasFileCallback(
  this: Phaser.Loader.LoaderPlugin,
  key: string,
  url: string
) {
  const spriteAtlas = new SpriteAtlasFile(this, key, url);

  this.addFile(spriteAtlas.files);
}

class SpriteAtlasFile extends Phaser.Loader.MultiFile {
  private url: string;

  private atlases: Array<SpriteAtlas> = [];

  constructor(loader: Phaser.Loader.LoaderPlugin, key: string, url: string) {
    const last = url.lastIndexOf('/');
    const name = url.slice(last + 1);

    const atlas = new Phaser.Loader.FileTypes.TextFile(
      loader,
      key,
      `${url}/${name}.atlas`
    );

    super(loader, 'spriteAtlas', key, [atlas]);

    this.url = url;
  }

  onFileComplete(file: Phaser.Loader.File): void {
    this.pending--;

    if (file.type === 'text') {
      const lines = (file.data as string).split('\n');

      let multiKeyIndex = 0;

      let currentFrame: SpriteAtlasFrame | undefined = undefined;
      let currentAtlas: SpriteAtlas | undefined = undefined;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (line.indexOf('.png') !== -1) {
          const key = `MA${multiKeyIndex++}_${line}`;

          const image = new Phaser.Loader.FileTypes.ImageFile(
            this.loader,
            key,
            `${this.url}/${line}`
          );

          this.addToMultiFile(image);
          this.loader.addFile(image);

          currentAtlas = {
            frames: [],
          };
          this.atlases.push(currentAtlas);

          //  Skip size of atlas
          i++;
        } else if (line.indexOf(':') !== -1) {
          if (!currentFrame) {
            console.error('Found values without frame');
            continue;
          }

          const keyValue = line.split(': ');
          const key = keyValue[0];
          const value = keyValue[1];
          const values = value.split(',');

          if (key === 'bounds') {
            currentFrame.bounds.x = parseInt(values[0]);
            currentFrame.bounds.y = parseInt(values[1]);
            currentFrame.bounds.width = parseInt(values[2]);
            currentFrame.bounds.height = parseInt(values[3]);
          } else if (key === 'offsets') {
            currentFrame.offsets = new Phaser.Geom.Rectangle(
              parseInt(values[0]),
              parseInt(values[1]),
              parseInt(values[2]),
              parseInt(values[3])
            );
          }
        } else if (line.length !== 0) {
          if (currentAtlas === undefined) {
            console.error('Found frame without atlas');
            continue;
          }
          currentFrame = {
            name: line,
            bounds: new Phaser.Geom.Rectangle(),
          };

          currentAtlas.frames.push(currentFrame);
        }
      }
    }
  }

  addToCache(): void {
    if (this.isReadyToProcess()) {
      const images: Array<HTMLImageElement> = [];
      for (let i = 1; i < this.files.length; i++) {
        const atlas = this.files[i];

        const image = atlas.data as HTMLImageElement;

        images.push(image);
      }

      const texture = this.loader.textureManager.create(this.key, images);

      if (!texture) {
        return;
      }

      const sources = texture.source;

      for (let i = 0; i < sources.length; i++) {
        const source = sources[i];

        texture.add('__BASE', i, 0, 0, source.width, source.height);

        //  Assuming atlases and sources are in the same order

        const atlas = this.atlases[i];

        for (let k = 0; k < atlas.frames.length; k++) {
          const { name, bounds, offsets } = atlas.frames[k];

          const frame = texture.add(
            name,
            i,
            bounds.x,
            bounds.y,
            bounds.width,
            bounds.height
          );
          if (frame === null) {
            console.warn('Key already exists');
            continue;
          }

          if (offsets !== undefined) {
            frame.setTrim(
              offsets.width,
              offsets.height,
              offsets.x,
              offsets.height - bounds.height - offsets.y,
              0,
              0
            );
          }
        }
      }
    }
  }
}

export class SpriteAtlasFilePlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager: Phaser.Plugins.PluginManager) {
    super(pluginManager);

    pluginManager.registerFileType('spriteAtlas', atlasFileCallback);
  }
}
