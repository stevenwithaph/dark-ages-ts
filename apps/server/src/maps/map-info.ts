export interface Transfers {
  x: number;
  y: number;
  width: number;
  height: number;
  zone: string;
  zoneX: number;
  zoneY: number;
  direction?: number;
}

export interface MapInfo {
  width: number;
  height: number;
  id: number;
  music: number;
  name: string;
  transfers: Transfers[];
}
