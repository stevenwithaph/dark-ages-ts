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

export interface MapInfo {
  width: number;
  height: number;
  id: number;
  music: number;
  name: string;
  transfers: Transfer[];
}
