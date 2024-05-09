import { ServerPackets } from '@medenia/network';
import { Resource } from './resource';
import { Point } from '../geometry/point';
import { SpatialHashGrid } from './map/spatial-hash-grid';
import { Area } from './areas/area';
import { NetworkedGameObject } from './networked-game-object';

export abstract class Actor extends NetworkedGameObject {
  public hp: Resource;

  public direction: number = 1;

  constructor(networkId: number, grid: SpatialHashGrid) {
    super(new Point(0, 0), networkId, grid);

    this.hp = new Resource(25, 25);

    this.hp.on('change', this.onHealthChange, this);
  }

  protected onHealthChange(percent: number) {
    this.broadcast(new ServerPackets.HealthBarPacket(this.networkId, percent));
  }

  public turn(direction: number) {
    this.direction = direction;

    this.broadcast(
      new ServerPackets.CreatureTurnPacket(this.networkId, direction),
      false
    );
  }

  //  TODO: fix this up
  public move(direction: number) {
    this.direction = direction;

    this.broadcast(
      new ServerPackets.CreatureWalkPacket(
        this.networkId,
        this.x,
        this.y,
        this.direction
      ),
      false
    );

    super.move(direction);
  }

  public playAnimation(animationId: number, speed: number) {
    this.broadcast(
      new ServerPackets.BodyAnimationPacket(this.networkId, animationId, speed),
      true
    );
  }
}
