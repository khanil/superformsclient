import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import forms from '../redux/modules/forms';
import configureStore from '../redux/create';

const rootReducer = (state, action) => state;

const store = configureStore({}, rootReducer);

import Container from './Container';
render(
  <Provider store={store}>
    <Container />
  </Provider>,
  document.getElementById('root')
);

function xhrGet(uri) {

  return new Promise((resolve, reject) => {

    console.log('inside promise');

    const xhr = new XMLHttpRequest();
    xhr.open('get', uri, true) ;
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    xhr.onload = function() {
      if (this.status == 200) {
        resolve(this.response);
      } else {
        const error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };

    xhr.onerror = function() {
      reject(new Error("Network Error"));
    };

    xhr.send();
  });
}

export const RECEIVE = 'forms/RECEIVE_REQUEST';
export const RECEIVE_FAILURE = 'forms/RECEIVE_FAILURE';
export const RECEIVE_SUCCESS = 'forms/RECEIVE_SUCCESS';

export function load() {
  return {
    types: [RECEIVE, RECEIVE_SUCCESS, RECEIVE_FAILURE],
    promise: () => xhrGet('/api/forms')
  }
}

export function get() {
  return {
    type: 'GET'
  }
}