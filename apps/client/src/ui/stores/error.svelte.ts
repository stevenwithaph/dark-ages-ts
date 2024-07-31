function createErrorStore() {
  let visible = $state(false);
  let message = $state('');

  return {
    get visible() {
      return visible;
    },
    get message() {
      return message;
    },
    show: (error: string) => {
      visible = true;
      message = error;
    },
    close: () => {
      visible = false;
    },
  };
}

const ErrorStore = createErrorStore();

export { ErrorStore };
