import { v4 } from 'uuid';

interface Timer {
  end: number;
  callback: Function;
  id: string;
  context?: object;
}

export module TimerService {
  let time: number = 0;
  let timers: Map<string, Timer> = new Map();

  export function add(callback: Function, delay: number, context?: object) {
    const id = v4();

    const timer: Timer = {
      end: time + delay,
      id,
      callback,
      context,
    };

    timers.set(id, timer);

    return id;
  }

  export function remove(id: string) {
    const timer = timers.get(id);
    if (!timer) return;

    timers.delete(id);
  }

  export function update() {
    time = performance.now();

    for (const [_, timer] of timers) {
      if (time >= time) {
        timer.callback.apply(timer.context);
        remove(timer.id);
      }
    }
  }
}
