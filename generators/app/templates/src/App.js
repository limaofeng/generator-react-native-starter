import logger from 'redux-logger';
import kharak from 'react-native-kharak';

<%- block('local-imports') -%>
import modules from './modules';

<%- block('functions') -%>
export default kharak({
  reducers: modules.reducers,
  routes: modules.routes,
  middlewares: [logger]
});
