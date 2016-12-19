import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../redux/create';

import ResponsesTableApp from '../containers/ResponsesTableApp';

import { combineReducers } from 'redux';
import config from '../redux/modules/config';
import responsesTable from '../redux/modules/responsesTable';

const rootReducer = combineReducers({
  config,
  responsesTable
});

const store = configureStore({}, rootReducer);

render(
  <Provider store={store}>
    <ResponsesTableApp/>
  </Provider>,
  document.getElementById('root')
);