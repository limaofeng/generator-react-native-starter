import { Feature } from 'react-native-kharak';

import MainScreen from './views/MainScreen';
import CounterScreen from './views/CounterScreen';
import reducers from './reducers';

export default new Feature({
  route: {
    Main: {
      screen: MainScreen
    },
    Counter: {
      screen: CounterScreen
    }
  },
  ...reducers
});
