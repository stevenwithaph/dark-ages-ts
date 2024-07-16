import EventEmitter from 'eventemitter3';
import { BaseCache } from './base-cache';

interface TimedCacheItem<T> {
  handle: NodeJS.Timeout;
  data: T;
}

interface TimedCacheEvents<T> {
  removed: (item: T) => void;
}

export class TimedCache<K, V> extends EventEmitter<TimedCacheEvents<V>> implements BaseCache<K, V> {
  #cache: Map<K, TimedCacheItem<V>>;

  constructor(private ttl: number) {
    super();

    this.#cache = new Map();
  }

  add(key: K, item: V) {
    const handle = setTimeout(() => this.remove(key), this.ttl);
    this.#cache.set(key, { handle, data: item });
  }

  remove(key: K) {
    const item = this.#cache.get(key);

    if (item) {
      this.emit('removed', item.data);
      clearTimeout(item.handle);
      return true;
    }

    return false;
  }

  clear() {
    for (const [key] of this.#cache) {
      this.remove(key);
    }
  }

  get(key: K) {
    return this.#cache.get(key)?.data;
  }
}
