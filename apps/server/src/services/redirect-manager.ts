import { Redirect } from '@medenia/network';

import { TimedCache } from '../utils/timed-cache';
import { UniqueId } from '../utils/unique-id';

class RedirectManager {
  #cache: TimedCache<number, Redirect> = new TimedCache(5000);
  #uniqueId: UniqueId = new UniqueId();

  constructor() {
    this.#cache.on('removed', this.onCacheRemoved, this);
  }

  add(seed: number, key: string, keySalts: string) {
    const redirect = new Redirect(seed, key, keySalts, this.#uniqueId.next());

    this.#cache.add(redirect.id, redirect);

    return redirect;
  }

  get(id: number) {
    const redirect = this.#cache.get(id);

    if (redirect) {
      this.#cache.remove(id);
    }

    return redirect;
  }

  private onCacheRemoved(redirect: Redirect) {
    this.#uniqueId.free(redirect.id);
  }
}

export const redirectManager = new RedirectManager();
