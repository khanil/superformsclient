import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore'

import MainPageApp from '../containers/MainPageApp';

import { combineReducers } from 'redux';
import { formData, modal } from '../reducers';
import personalForms from '../reducers/personalForms';
import allForms from '../reducers/allForms';
import forms from '../reducers/forms';

const rootReducer = combineReducers({
  forms,
  formData,
  modal,
  allForms,
  personalForms
});

const store = configureStore({}, rootReducer);

render(
  <Provider store={store}>
    <MainPageApp/>
  </Provider>,
  document.getElementById('root')
);