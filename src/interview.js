import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Interview from './containers/Interview';
import configureStore from './store/configureStore';

const store = configureStore();

render(
  <Provider store={store}>
    <Interview />
  </Provider>,
  document.getElementById('root')
);