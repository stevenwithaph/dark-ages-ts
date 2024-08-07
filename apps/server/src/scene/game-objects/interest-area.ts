import { Circle } from '../../collision/geometry/circle';
import { Rectangle } from '../../collision/geometry/rectangle';
import { EntityTypes } from '../entity-types';
import { ColliderNode } from '../physics/collider-node';

export class InterestArea extends ColliderNode {
  constructor() {
    super(0, 0, new Rectangle(8, 8));

    this.nodeName = 'Interest Area';

    this.layer = EntityTypes.AREA;
    this.mask = EntityTypes.AISLING | EntityTypes.MONSTER;
  }
}
