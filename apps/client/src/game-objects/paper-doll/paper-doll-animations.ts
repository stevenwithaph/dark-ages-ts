import { SpriteAtlasAnimation } from '../sprite-atlas/sprite-atlas-animator';

export const Walk: SpriteAtlasAnimation = {
  startUp: 1,
  startDown: 6,
  frames: 4,
  prefix: '01',
  loop: false,
};

export const CreateWalk: SpriteAtlasAnimation = {
  startUp: 0,
  startDown: 5,
  frames: 5,
  prefix: '01',
  loop: true,
};

export const Idle: SpriteAtlasAnimation = {
  startUp: 0,
  startDown: 5,
  frames: 1,
  prefix: '01',
  loop: false,
};

export const Attack: SpriteAtlasAnimation = {
  startUp: 0,
  startDown: 2,
  frames: 2,
  prefix: '02',
  loop: false,
};
