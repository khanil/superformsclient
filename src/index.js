import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import GeneratorApp from './components/GeneratorApp';
import configureStore from './store/configureStore';

const store = configureStore();

render(
  <Provider store={store}>
    <GeneratorApp />
  </Provider>,
  document.getElementById('root')
);