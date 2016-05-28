import sendRequest from '../utils/sendRequest';

import {
  SET_PAGE_TYPE,
  REQUEST_BOILERPLATE,
  RECEIVE_BOILERPLATE,
  REQUEST_RESPONCE,
  RECIEVE_RESPONCE,
  SEND_RESPONSE,
  SEND_RESPONSE_SUCCESS,
  SEND_RESPONSE_FAILED
} from './../constants/actionTypes';

export function setPageType(pageType) {
  return {
    type: SET_PAGE_TYPE,
    pageType: pageType
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

function requestResponce() {
  return {
    type: REQUEST_RESPONCE
  }
}

function recieveResponce(responce) {
  return {
    type: RECIEVE_RESPONCE,
    response: responce
  }
}

export function fetchResponce(url) {
  return (dispatch) => {
    dispatch(requestResponce());

    sendRequest('GET', url, null, (xhr) => {
      const responce = JSON.parse(xhr.responseText);

      dispatch(recieveResponce(responce));
    });
  }
}

function initiateSendingResponse() {
  return {
    type: SEND_RESPONSE
  }
}

export function sendResponse(json, url, onSuccess) {
  return (dispatch) => {
    dispatch(initiateSendingResponse());

    sendRequest('POST', url, json,
      () => {
        dispatch({
          type: SEND_RESPONSE_SUCCESS
        });
        onSuccess();
      }, 
      (error) => {
        dispatch({
          type: SEND_RESPONSE_FAILED
        });
        alert('Произошла ошибка при отправке ответов на сервер.');
        console.log(error);
      }
    );
  }
}