export interface Transfer {
  startX: number;
  startY: number;
  endX?: number;
  endY?: number;
  zone: string;
  zoneX: number;
  zoneY: number;
  direction?: number;
}

export interface Entity {
  x: number;
  y: number;
  sprite: number;
  name: string;
}

export interface MobTemplate {
  template: string;
  x: number;
  y: number;
}

export interface MapInfo {
  width: number;
  height: number;
  id: number;
  music: number;
  name: string;
  transfers: Transfer[];
  entities: Entity[];
  mobs: MobTemplate[];
}
