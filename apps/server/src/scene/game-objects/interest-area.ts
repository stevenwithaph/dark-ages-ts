import { Rectangle } from '../../collision/geometry/rectangle';
import { EntityTypes } from '../entity-types';
import { ColliderNode } from '../physics/collider-node';

const InterestAreaSize = 16;
const InterestAreaRect = new Rectangle(InterestAreaSize);

export class InterestArea extends ColliderNode {
  constructor() {
    super(0, 0, InterestAreaRect);

    this.nodeName = 'Interest Area';

    this.layer = EntityTypes.AREA;
    this.mask = EntityTypes.AISLING | EntityTypes.MONSTER;
  }
}
