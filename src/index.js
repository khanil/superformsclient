import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import FormGeneratonApp from './containers/FormGenerationApp';
// import FormInterviewApp from './containers/FormInterviewApp';
// import ResponsesTableApp from './containers/ResponsesTableApp';
import configureStore from './store/configureStore'
import rootReducer from './reducers';

const store = configureStore({}, rootReducer);

render(
  <Provider store={store}>
    <FormGeneratonApp/>
  </Provider>,
  document.getElementById('root')
);
