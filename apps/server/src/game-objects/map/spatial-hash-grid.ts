import { BBox } from '../../geometry/bbox';
import { Shape } from '../../geometry/shape';
import { SpatialEntity } from './spatial-entity';

export interface CellNode {
  next: CellNode | null;
  prev: CellNode | null;
  entity: SpatialEntity;
}

export interface Cell {
  head: CellNode | null;
}

export class SpatialHashGrid {
  private cells: Cell[][] = [];

  private cols: number;
  private rows: number;

  private queryId: number = 0;

  constructor(
    public width: number,
    public height: number,
    public size: number
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

  insert(client: SpatialEntity) {
    const bbox = client.shape.bbox;
    client.bounds = this.getBounds(bbox);

    for (let y = client.bounds.minY; y <= client.bounds.maxY; y++) {
      client.cells.push([]);
      for (let x = client.bounds.minX; x <= client.bounds.maxX; x++) {
        const node = this.cells[y][x];

        const yi = y - client.bounds.minY;

        const head: CellNode = {
          next: null,
          prev: null,
          entity: client,
        };

        head.next = node.head;
        if (node.head) {
          node.head.prev = head;
        }

        node.head = head;

        client.cells[yi].push(head);
      }
    }
  }

  query(shape: Shape, mask: number) {
    const bbox = shape.bbox;
    const { minX, minY, maxX, maxY } = this.getBounds(bbox);
    const currentQueryId = ++this.queryId;

    const clients: Set<SpatialEntity> = new Set();
    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        const cell = this.cells[y][x];
        let currentNode = cell.head;
        while (currentNode) {
          if (currentNode.entity.queryId !== currentQueryId) {
            currentNode.entity.queryId = currentQueryId;

            if (
              (currentNode.entity.layer & mask) ===
              currentNode.entity.layer
            ) {
              if (currentNode.entity.shape.intersects(shape)) {
                clients.add(currentNode.entity);
              }
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
    const entities: SpatialEntity[] = [];
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

  remove(entity: SpatialEntity) {
    const { minX, minY, maxX, maxY } = entity.bounds;

    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        const xi = x - minX;
        const yi = y - minY;

        const node = entity.cells[yi][xi];

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

    entity.queryId = 0;
    entity.cells = [];
  }

  update(entity: SpatialEntity) {
    const bbox = entity.shape.bbox;

    const { minX, minY, maxX, maxY } = this.getBounds(bbox);

    if (
      entity.bounds.minX === minX &&
      entity.bounds.maxX === maxX &&
      entity.bounds.minY === minY &&
      entity.bounds.maxY === maxY
    ) {
      return;
    }

    this.remove(entity);
    this.insert(entity);
  }

  getCellIndex(x: number, y: number) {
    return {
      x: this.clamp(Math.floor(x / this.size), this.cols - 1),
      y: this.clamp(Math.floor(y / this.size), this.rows - 1),
    };
  }

  getCell(x: number, y: number) {
    const { x: spatialX, y: spatialY } = this.getCellIndex(x, y);
    return this.cells[spatialY][spatialX];
  }

  getBounds(bbox: BBox) {
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
