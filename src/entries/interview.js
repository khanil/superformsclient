import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import InterviewContainer from './../containers/InterviewContainer';
import configureStore from './../store/configureStore';
import rootReducer from './../reducers/interview';

const store = configureStore({}, rootReducer);

render(
  <Provider store={store}>
    <InterviewContainer />
  </Provider>,
  document.getElementById('root')
);