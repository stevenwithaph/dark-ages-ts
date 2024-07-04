const MAX_INT = 2147483647;

export class UniqueId {
  #id = 1;
  #freed: Array<number> = [];

  next() {
    if (this.#freed.length > 0) {
      return this.#freed.pop()!;
    }
    //  TODO: the roll over won't work. 1 could be still be in use
    return (this.#id++ % MAX_INT) + 1;
  }

  free(id: number) {
    this.#freed.push(id);
  }
}
