export interface BaseCache<K, V> {
  add: (key: K, value: V) => void;
  remove: (key: K) => boolean;
  get: (key: K) => V | undefined;
  clear: () => void;
}
