import { Circle } from '../../collision/geometry/circle';
import { EntityTypes } from '../entity-types';
import { CollisionObject } from '../physics/collision-object';

export class InterestArea extends CollisionObject {
  constructor() {
    super(new Circle(0, 0, 12));

    this.nodeName = 'Interest Area';

    this.layer = EntityTypes.AREA;
    this.mask = EntityTypes.AISLING | EntityTypes.MONSTER;
  }
}
