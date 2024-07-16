import EventEmitter from 'eventemitter3';

interface Events<T> {
  added: (index: number, item: T) => void;
  removed: (index: number, item: T) => void;
}

export class ObservableList<T> extends EventEmitter<Events<T>> {
  #items: Map<number, T>;

  constructor() {
    super();

    this.#items = new Map();
  }

  insert(index: number, item: T) {
    if (!this.#items.has(index)) {
      this.#items.set(index, item);
      this.emit('added', index, item);
    }
  }

  remove(index: number) {
    const item = this.#items.get(index);

    if (item) {
      this.#items.delete(index);
      this.emit('removed', index, item);
    }

    return item;
  }

  move(from: number, to: number) {
    const removedA = this.remove(from);
    const removedB = this.remove(to);

    if (removedA) {
      this.insert(to, removedA);
    }

    if (removedB) {
      this.insert(from, removedB);
    }
  }

  get(index: number) {
    return this.#items.get(index);
  }
}
