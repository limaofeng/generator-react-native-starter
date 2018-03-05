import { Feature } from 'react-native-kharak';

import { Settings, Repeat, Sound } from './views';
import reducers from './reducers';

export default new Feature({
  route: {
    Settings: {
      screen: Settings
    },
    Repeat: {
      screen: Repeat
    },
    Sound: {
      screen: Sound
    }
  },
  reducer: { settings: reducers }
});
