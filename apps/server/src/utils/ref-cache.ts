import { BaseCache } from './base-cache';

export class RefCache<K, V extends Object> implements BaseCache<K, V> {
  #items: Map<K, WeakRef<V>>;

  add(key: K, value: V) {
    this.#items.set(key, new WeakRef(value));
  }

  get(key: K) {
    return this.#items.get(key)?.deref();
  }

  remove(key: K) {
    return this.#items.delete(key);
  }

  clear() {
    this.#items.clear();
  }
}
