import { Circle } from '../../collision/geometry/circle';
import { Rectangle } from '../../collision/geometry/rectangle';
import { EntityTypes } from '../entity-types';
import { ColliderNode } from '../physics/collider-node';

const InterestAreaRect = new Rectangle(16, 16);

export class InterestArea extends ColliderNode {
  constructor() {
    super(0, 0, InterestAreaRect);

    this.nodeName = 'Interest Area';

    this.layer = EntityTypes.AREA;
    this.mask = EntityTypes.AISLING | EntityTypes.MONSTER;
  }
}
