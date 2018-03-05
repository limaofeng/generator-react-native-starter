import { StackNavigator } from 'react-navigation';
import kharak from 'react-native-kharak';

<%- block('local-imports') %>

<%- block('functions') %>

import modules from './modules';

export default kharak({
  reducers: modules.reducers,
  routes: modules.routes
});
