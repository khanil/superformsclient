import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Report from './../containers/Report';
import Header from './../containers/headers/Report';
import configureStore from './../store/configureStore';
import rootReducer from './../reducers/report';

const store = configureStore({}, rootReducer);

render(
  <Provider store={store}>
    <Header />
  </Provider>,
  document.getElementById('header-root')
);

render(
  <Provider store={store}>
    <Report />
  </Provider>,
  document.getElementById('root')
);