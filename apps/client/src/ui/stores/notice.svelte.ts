function createNoticeStore() {
  let message = $state('');

  return {
    get message() {
      return message;
    },
    set message(notice: string) {
      message = notice;
    },
  };
}

const NoticeStore = createNoticeStore();

export { NoticeStore };
