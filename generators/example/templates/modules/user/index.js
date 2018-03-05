import { Feature } from 'react-native-kharak';

import LoginScreen from './views/LoginScreen';
import ProfileScreen from './views/ProfileScreen';

export default new Feature({
  route: {
    Login: {
      screen: LoginScreen
    },
    Profile: {
      screen: ProfileScreen
    }
  }
});
