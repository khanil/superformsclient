import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import FormsList from './../containers/FormsList';
import configureStore from './../store/configureStore';
import rootReducer from './../reducers/main';

const store = configureStore({}, rootReducer);

render(
  <Provider store={store}>
    <FormsList />
  </Provider>,
  document.getElementById('root')
);