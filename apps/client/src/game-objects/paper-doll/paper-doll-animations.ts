import { AtlasSpriteAnimation } from '../atlas-sprite/atlas-sprite-animator';

export const Walk: AtlasSpriteAnimation = {
  startUp: 1,
  startDown: 6,
  frames: 4,
  prefix: '01',
  loop: false,
};

export const Idle: AtlasSpriteAnimation = {
  startUp: 0,
  startDown: 5,
  frames: 1,
  prefix: '01',
  loop: false,
};

export const Attack: AtlasSpriteAnimation = {
  startUp: 0,
  startDown: 2,
  frames: 2,
  prefix: '02',
  loop: false,
};
