import logger from 'redux-logger';
import kharak from 'react-native-kharak';
import { composeWithDevTools } from 'remote-redux-devtools';

<%- block('local-imports') -%>
import modules from './modules';

<%- block('functions') -%>
export default kharak({
  reducers: modules.reducers,
  routes: modules.routes,
  middlewares: [logger],
  compose:
    process.env.NODE_ENV === 'development' &&
    composeWithDevTools({
      name: '<%=project.name%>',
      hostname: 'localhost',
      port: 8000
    })
});
