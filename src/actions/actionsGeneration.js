import sendRequest from '../utils/sendRequest';

import {
  SET_PAGE_TYPE,
  SAVE_BOILERPLATE,
  SAVING_SUCCESS,
  SAVING_FAILED,
  REQUEST_BOILERPLATE,
  RECEIVE_BOILERPLATE,
  READ_URLS_FROM_HTML,
  RETURN_TO_LAST_SAVE
} from './../constants/actionTypes';

export function setPageType(pageType) {
  return {
    type: SET_PAGE_TYPE,
    pageType: pageType
  }
}

export function readUrlsFromHtml(urls) {
  return {
    type: READ_URLS_FROM_HTML,
    urls: urls
  }
}

function saveBoilerplate() {
  return {
    type: SAVE_BOILERPLATE
  }
}

function savingSuccess(id, boilerplate) {
  return {
    type: SAVING_SUCCESS,
    time: +new Date,
    id: id,
    boilerplate: boilerplate
  }
}

function savingFailed(error) {
  return {
    type: SAVING_FAILED,
    error: error
  }
}

export function returnToLastSave() {
  return {
    type: RETURN_TO_LAST_SAVE
  }
}

export function sendBoilerplate(url, boilerplate) {
  return (dispatch) => {
    dispatch(saveBoilerplate());

    sendRequest('POST', url, JSON.stringify(boilerplate, '', 2), 
      (xhr) => { 
        var id = null;

        if (xhr.responseText !== 'OK') {
          id = xhr.responseText;
        }

        dispatch( savingSuccess(id, boilerplate) );
      },
      (error) => ( dispatch( savingFailed(error) ) ));
  }
}

function requestBoilerplate() {
  return {
    type: REQUEST_BOILERPLATE
  }
}

function receiveBoilerplate(boilerplate) {
  return {
    type: RECEIVE_BOILERPLATE,
    boilerplate: boilerplate
  }
}

export function fetchBoilerplate(url) {
  return (dispatch) => {
    dispatch(requestBoilerplate());

    sendRequest('GET', url, null, (xhr) => {
      const boilerplate = JSON.parse(xhr.responseText);

      dispatch(receiveBoilerplate(boilerplate));
    });
  }
}