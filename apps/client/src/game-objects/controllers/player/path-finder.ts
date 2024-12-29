import { Astar } from '@/astar';
import { Direction, directionToVector } from '@/direction';

export class PathFinder {
  public get destinationX() {
    return this._destinationX;
  }

  public get destinationY() {
    return this._destinationY;
  }

  public get isAtDestination() {
    return this._currentPathIndex === this._currentPath.length;
  }

  private _destinationX: number = 0;
  private _destinationY: number = 0;

  private _currentPath: { x: number; y: number }[] = [];
  private _currentPathIndex: number = 0;

  public astar?: Astar;

  async setDestination(startX: number, startY: number, endX: number, endY: number) {
    if (!this.astar) throw new Error('Invalid Astar');

    this._currentPath = await this.astar.findPath(startX, startY, endX, endY);
    this._currentPathIndex = 0;
  }

  nextPoint() {
    const next = this._currentPath[this._currentPathIndex];

    if (!this.isAtDestination) {
      this._currentPathIndex++;
    }

    return next;
  }

  closestCardinalPoint(startX: number, startY: number, endX: number, endY: number) {
    if (!this.astar) throw new Error('Invalid Astar');

    let initialDirection: Direction;

    if (startX < endX) {
      initialDirection = Direction.DOWN_RIGHT;
    } else if (startX > endX) {
      initialDirection = Direction.UP_LEFT;
    } else if (startY < endY) {
      initialDirection = Direction.UP_RIGHT;
    } else {
      initialDirection = Direction.DOWN_LEFT;
    }

    //  Total Directions
    for (let i = 0; i < 4; i++) {
      const offset = directionToVector((initialDirection + 1) % 4);

      if (!this.astar.isObstacle(endX - offset.x, endY - offset.y)) {
        return {
          x: endX + offset.x,
          y: endY + offset.y,
        };
      }
    }

    return null;
  }
}
