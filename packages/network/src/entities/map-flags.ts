export enum MapFlags {
  None = 0,
  Snow = 1,
  Rain = 2,
  Darkness = MapFlags.Snow | MapFlags.Rain,
  NoTabMap = 64,
  SnowTileset = 128,
}
