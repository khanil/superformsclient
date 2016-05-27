import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Generation from './../containers/Generation';
import Header from './../containers/headers/Generation';
import configureStore from './../store/configureStore';
import rootReducer from './../reducers/generation';

const store = configureStore({}, rootReducer);

render(
  <Provider store={store}>
    <Header />
  </Provider>,
  document.getElementById('header-root')
);

render(
  <Provider store={store}>
    <Generation />
  </Provider>,
  document.getElementById('root')
);