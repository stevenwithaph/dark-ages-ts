import { BBox } from './geometry/bbox';
import { Shape } from './geometry/shape';

const DEFAULT_GRID_SIZE = 25;

export interface CellData<T> {
  data: {
    cells: CellNode<T>[][];
    queryId: number;
    bounds: BBox;
  };
  shape: Shape;
  layer: number;
  mask: number;
}

export interface CellNode<T> {
  next: CellNode<T> | null;
  prev: CellNode<T> | null;
  entity: T;
}

export interface Cell<T> {
  head: CellNode<T> | null;
}

export class SpatialHashGrid<T extends CellData<T>> {
  private cells: Cell<T>[][] = [];

  private cols: number;
  private rows: number;

  private queryId: number = 0;

  constructor(
    private width: number,
    private height: number,
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

  insert(client: T) {
    const bbox = client.shape.bbox;
    client.data.bounds = this.getCellBounds(bbox);

    for (let y = client.data.bounds.minY; y <= client.data.bounds.maxY; y++) {
      client.data.cells.push([]);
      for (let x = client.data.bounds.minX; x <= client.data.bounds.maxX; x++) {
        const node = this.cells[y][x];

        const yi = y - client.data.bounds.minY;

        const head: CellNode<T> = {
          next: null,
          prev: null,
          entity: client,
        };

        head.next = node.head;
        if (node.head) {
          node.head.prev = head;
        }

        node.head = head;

        client.data.cells[yi].push(head);
      }
    }
  }

  query(shape: Shape, mask: number) {
    const bbox = shape.bbox;
    const { minX, minY, maxX, maxY } = this.getCellBounds(bbox);
    const currentQueryId = ++this.queryId;

    const clients: Set<T> = new Set();
    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        const cell = this.cells[y][x];
        let currentNode = cell.head;
        while (currentNode) {
          if (currentNode.entity.data.queryId !== currentQueryId) {
            currentNode.entity.data.queryId = currentQueryId;

            if (
              shape !== currentNode.entity.shape &&
              (mask & currentNode.entity.layer) === currentNode.entity.layer &&
              currentNode.entity.shape.intersects(shape)
            ) {
              clients.add(currentNode.entity);
            }
          }

          currentNode = currentNode.next;
        }
      }
    }

    return clients;
  }

  queryPoint(x: number, y: number, mask: number) {
    const pos = this.getCellIndex(x, y);
    const entities: T[] = [];
    const cell = this.cells[pos.y][pos.x];
    let currentNode = cell.head;
    while (currentNode) {
      if (currentNode.entity.layer & mask) {
        if (currentNode.entity.shape.contains(x, y)) {
          entities.push(currentNode.entity);
        }
      }

      currentNode = currentNode.next;
    }

    return entities;
  }

  remove(entity: T) {
    const { minX, minY, maxX, maxY } = entity.data.bounds;

    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        const xi = x - minX;
        const yi = y - minY;

        const node = entity.data.cells[yi][xi];

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

    entity.data.queryId = 0;
    entity.data.cells = [];
  }

  update(entity: T) {
    const bbox = entity.shape.bbox;

    const { minX, minY, maxX, maxY } = this.getCellBounds(bbox);

    if (entity.data.bounds.minX === minX && entity.data.bounds.maxX === maxX && entity.data.bounds.minY === minY && entity.data.bounds.maxY === maxY) {
      return;
    }

    this.remove(entity);
    this.insert(entity);
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
