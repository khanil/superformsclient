import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore'

import MainPageApp from '../containers/MainPageApp';

import { combineReducers } from 'redux';
import { formData, modal } from '../reducers';

const rootReducer = combineReducers({
  formData,
  modal
});

const store = configureStore({}, rootReducer);

render(
  <Provider store={store}>
    <MainPageApp/>
  </Provider>,
  document.getElementById('root')
);