class TimerHandle {}

class TimerService {
  #timers: Map<number, TimerHandle> = new Map();

  add(callback: Function) {}

  remove() {}

  update(delta: number) {}
}

export const timerService = new TimerService();
