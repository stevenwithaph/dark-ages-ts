import { Vector } from 'matter';

export enum Direction {
  UP_RIGHT,
  DOWN_RIGHT,
  DOWN_LEFT,
  UP_LEFT,
}

export function directionToVector(direction: Direction): Phaser.Math.Vector2 {
  switch (direction) {
    case Direction.UP_RIGHT:
      return Phaser.Math.Vector2.UP;
    case Direction.DOWN_RIGHT:
      return Phaser.Math.Vector2.RIGHT;
    case Direction.DOWN_LEFT:
      return Phaser.Math.Vector2.DOWN;
    case Direction.UP_LEFT:
      return Phaser.Math.Vector2.LEFT;
  }
}

export function vectorToDirection(vector: Vector): Direction {
  return xyToDirection(vector.x, vector.y);
}

export function xyToDirection(x: number, y: number): Direction {
  if (x === 0 && y === -1) {
    return Direction.UP_RIGHT;
  } else if (x === 1 && y === 0) {
    return Direction.DOWN_RIGHT;
  } else if (x === 0 && y === 1) {
    return Direction.DOWN_LEFT;
  } else {
    return Direction.UP_LEFT;
  }
}
