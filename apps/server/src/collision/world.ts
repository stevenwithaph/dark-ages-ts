import { ColliderNodeEvents } from '../scene/physics/collider-node';
import { Collider } from './collider';
import { CollisionSolver } from './collision-solver';
import { BBox } from './geometry/bbox';
import { Shape } from './geometry/shape';

const DEFAULT_GRID_SIZE = 25;

export interface CellNode {
  next: CellNode | null;
  prev: CellNode | null;
  collider: Collider;
}

export interface Cell {
  head: CellNode | null;
}

export class World {
  private cells: Cell[][] = [];

  private cols: number;
  private rows: number;

  private queryId: number = 0;

  constructor(
    width: number,
    height: number,
    private size: number = DEFAULT_GRID_SIZE
  ) {
    this.rows = Math.max(1, Math.ceil(width / size));
    this.cols = Math.max(1, Math.ceil(height / size));

    for (let y = 0; y < this.rows; y++) {
      this.cells.push([]);
      for (let x = 0; x < this.cols; x++) {
        this.cells[y].push({
          head: null,
        });
      }
    }
  }

  insert(collider: Collider) {
    const bbox = collider.bbox;
    collider.data.bounds = this.getCellBounds(bbox);

    for (let y = collider.data.bounds.minY; y <= collider.data.bounds.maxY; y++) {
      collider.data.cells.push([]);
      for (let x = collider.data.bounds.minX; x <= collider.data.bounds.maxX; x++) {
        const node = this.cells[y][x];

        const yi = y - collider.data.bounds.minY;

        const head: CellNode = {
          next: null,
          prev: null,
          collider: collider,
        };

        head.next = node.head;
        if (node.head) {
          node.head.prev = head;
        }

        node.head = head;

        collider.data.cells[yi].push(head);
      }
    }
  }

  intersects(collider: Collider) {
    const colliders = this.query(collider.x, collider.y, collider.shape, collider.mask);

    return colliders;
  }

  query(queryX: number, queryY: number, shape: Shape, mask: number) {
    const { minX, minY, maxX, maxY } = this.getCellBounds({ minX: queryX, minY: queryY, maxX: queryX + shape.width, maxY: queryY + shape.height });
    const colliders: Set<Collider> = new Set();
    const currentQueryId = ++this.queryId;
    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        const cell = this.cells[y][x];
        let currentNode = cell.head;
        while (currentNode) {
          const { collider } = currentNode;
          if (collider.data.queryId !== currentQueryId) {
            collider.data.queryId = currentQueryId;
            if (
              collider.shape !== shape &&
              (mask & collider.layer) === collider.layer &&
              CollisionSolver.solve(queryX, queryY, shape, collider.x, collider.y, collider.shape)
            ) {
              colliders.add(currentNode.collider);
            }
          }

          currentNode = currentNode.next;
        }
      }
    }

    return colliders;
  }

  contains(x: number, y: number, mask: number) {
    const pos = this.getCellIndex(x, y);
    const entities: Collider[] = [];
    const cell = this.cells[pos.y][pos.x];
    let currentNode = cell.head;
    while (currentNode) {
      const { collider } = currentNode;
      if ((mask & collider.layer) === collider.layer && CollisionSolver.contains(x, y, collider.x, collider.y, collider.shape)) {
        entities.push(collider);
      }

      currentNode = currentNode.next;
    }

    return entities;
  }

  remove(collider: Collider) {
    const { minX, minY, maxX, maxY } = collider.data.bounds;

    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        const xi = x - minX;
        const yi = y - minY;

        const node = collider.data.cells[yi][xi];

        if (node.next) {
          node.next.prev = node.prev;
        }
        if (node.prev) {
          node.prev.next = node.next;
        }

        if (!node.prev) {
          this.cells[y][x].head = node.next;
        }
      }
    }

    collider.data.queryId = 0;
    collider.data.cells = [];
  }

  update(collider: Collider) {
    const bbox = collider.bbox;

    const { minX, minY, maxX, maxY } = this.getCellBounds(bbox);

    if (collider.data.bounds.minX === minX && collider.data.bounds.maxX === maxX && collider.data.bounds.minY === minY && collider.data.bounds.maxY === maxY) {
      return;
    }

    this.remove(collider);
    this.insert(collider);
  }

  private getCellIndex(x: number, y: number) {
    return {
      x: this.clamp(Math.floor(x / this.size), this.cols - 1),
      y: this.clamp(Math.floor(y / this.size), this.rows - 1),
    };
  }

  getCell(x: number, y: number) {
    const { x: spatialX, y: spatialY } = this.getCellIndex(x, y);
    return this.cells[spatialY][spatialX];
  }

  private getCellBounds(bbox: BBox) {
    let { x: minX, y: minY } = this.getCellIndex(bbox.minX, bbox.minY);
    let { x: maxX, y: maxY } = this.getCellIndex(bbox.maxX, bbox.maxY);

    return {
      minX,
      minY,
      maxX,
      maxY,
    };
  }

  private clamp(n: number, max: number) {
    return Math.max(0, Math.min(n, max));
  }
}
