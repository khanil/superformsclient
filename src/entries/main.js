import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../redux/create';

import MainPageApp from '../containers/MainPageApp';

import { combineReducers } from 'redux';
import personalForms from '../reducers/personalForms';
import allForms from '../reducers/allForms';
import myFormsList from '../redux/modules/myFormsList';
import allFormsList from '../redux/modules/allFormsList';
import modal from '../redux/modules/mainPageModal';

const rootReducer = combineReducers({
  allFormsList,
  myFormsList,
  modal
});

const store = configureStore({}, rootReducer);

render(
  <Provider store={store}>
    <MainPageApp/>
  </Provider>,
  document.getElementById('root')
);