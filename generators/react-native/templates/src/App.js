import { StackNavigator } from 'react-navigation';

import HomeScreen from './Home';
import SettingsScreen from './Settings';

const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen
  },
  Settings: {
    screen: SettingsScreen
  }
});

export default RootNavigator;
