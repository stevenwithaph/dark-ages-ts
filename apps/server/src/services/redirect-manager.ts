import { Redirect } from '@medenia/network';

import { TimedCache } from '../utils/timed-cache';
import { UniqueId } from '../utils/unique-id';

export module RedirectManager {
  const cache: TimedCache<number, Redirect> = new TimedCache(5000);
  const uniqueId: UniqueId = new UniqueId();

  cache.on('removed', onCacheRemoved);

  export function add(seed: number, key: string, keySalts: string, subject: string) {
    const redirect = new Redirect(seed, key, keySalts, uniqueId.next(), subject);

    cache.add(redirect.id, redirect);

    return redirect;
  }

  export function get(id: number) {
    const redirect = cache.get(id);

    if (redirect) {
      cache.remove(id);
    }

    return redirect;
  }

  function onCacheRemoved(redirect: Redirect) {
    uniqueId.free(redirect.id);
  }
}
