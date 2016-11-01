import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import myFormsList from '../redux/modules/myFormsList';
import configureStore from '../redux/create';

const rootReducer = combineReducers({
  myFormsList
});

const store = configureStore({}, rootReducer);

import Container from './Container';
render(
  <Provider store={store}>
    <Container />
  </Provider>,
  document.getElementById('root')
);