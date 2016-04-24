import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Report from './containers/Report';
import configureStore from './store/configureStore';

const store = configureStore();

render(
  <Provider store={store}>
    <Report />
  </Provider>,
  document.getElementById('root')
);