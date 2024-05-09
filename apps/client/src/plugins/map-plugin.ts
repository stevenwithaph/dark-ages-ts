import { v4 as uuid } from 'uuid';
import { MapScene } from '../scenes/map-scene';

export class MapPlugin extends Phaser.Plugins.BasePlugin {
  //private currentMapId: string;

  constructor(pluginManager: Phaser.Plugins.PluginManager) {
    super(pluginManager);
  }

  startNewMap() {
    const newId = uuid();

    this.game.scene.add(newId, MapScene);
    this.game.scene.start(newId);
  }
}
