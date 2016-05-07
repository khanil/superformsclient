import sendRequest from '../utils/sendRequest';

import {
  REQUEST_BOILERPLATE,
  RECEIVE_BOILERPLATE
} from './../constants/actionTypes';

export function requestBoilerplate() {
  return {
    type: REQUEST_BOILERPLATE
  }
}

function receiveBoilerplate(json) {
  return {
    type: RECEIVE_BOILERPLATE,
    boilerplate: json
  }
}

export function fetchBoilerplate(url) {
  return (dispatch) => {
    dispatch(requestBoilerplate());

    sendRequest('GET', url, null, (xhr) => {
      dispatch(receiveBoilerplate(JSON.parse(xhr.responseText)));
    });
  }
}