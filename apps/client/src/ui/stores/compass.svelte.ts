function createCompassStore() {
  let name = $state('');
  let x = $state(0);
  let y = $state(0);

  return {
    get name() {
      return name;
    },
    get x() {
      return x;
    },
    get y() {
      return y;
    },
    set name(value: string) {
      name = value;
    },
    set x(value: number) {
      x = value;
    },
    set y(value: number) {
      y = value;
    },
  };
}

const CompassStore = createCompassStore();

export { CompassStore };
