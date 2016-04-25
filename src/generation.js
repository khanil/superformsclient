import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Generation from './containers/Generation';
import configureStore from './store/configureStore';

const store = configureStore();

render(
  <Provider store={store}>
    <Generation />
  </Provider>,
  document.getElementById('root')
);