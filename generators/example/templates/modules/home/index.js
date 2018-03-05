import { Feature } from 'react-native-kharak';

import MainScreen from './views/MainScreen';
import CounterScreen from './views/CounterScreen';

function delay(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export default new Feature({
  route: {
    Main: {
      screen: MainScreen
    },
    Counter: {
      screen: CounterScreen
    }
  },
  namespace: 'count',
  state: 0,
  reducer: {
    add(state) {
      return state + 1;
    }
  },
  effects: {
    *addDelay(action, { call, put }) {
      console.log('wait', Date.now());
      yield call(delay, 1000);
      console.log('done', Date.now());
      yield put({ type: 'count/add' });
      console.log('count/add');
    }
  }
});
