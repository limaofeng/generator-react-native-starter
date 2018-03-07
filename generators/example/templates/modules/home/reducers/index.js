function delay(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export default {
  namespace: 'count',
  state: 0,
  reducer: {
    add(state) {
      return state + 1;
    }
  },
  effects: {
    *addDelay(action, { call, put }) {
      yield call(delay, 1000);
      yield put({ type: 'count/add' });
    }
  }
};
