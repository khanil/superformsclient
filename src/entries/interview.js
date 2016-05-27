import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Interview from './../containers/Interview';
import Header from './../containers/headers/Interview';
import configureStore from './../store/configureStore';
import rootReducer from './../reducers/interview';

const store = configureStore({}, rootReducer);

const hasHeader = (document.getElementById('header-root') !== null);

if (hasHeader) {
  render(
    <Provider store={store}>
      <Header />
    </Provider>,
    document.getElementById('header-root')
  );
}

render(
  <Provider store={store}>
    <Interview />
  </Provider>,
  document.getElementById('root')
);