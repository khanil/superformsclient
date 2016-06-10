import sendRequest from '../utils/sendRequest';

import {
  REQUEST_DATA,
  RECEIVE_DATA,
  HEADER_BUILDED,
  SHOW_GENERATION,
  HIDE_GENERATION,
  TOGGLE_DESCRIPTION,
  FETCH_TABLE_CSV_REQUEST,
  FETCH_TABLE_CSV_SUCCESS,
  FETCH_TABLE_CSV_FAILURE,
  FETCH_REPORT_CSV_REQUEST,
  FETCH_REPORT_CSV_SUCCESS,
  FETCH_REPORT_CSV_FAILURE
} from './../constants/actionTypes';

// eslint-disable-line no-undef
function requestData() {
  return {
    type: REQUEST_DATA
  }
}

function receiveData(json) {
  return {
    type: RECEIVE_DATA,
    answers: json.responses,
    boilerplate: json.form
  }
}

function recieveHeader(header) {
  return {
    type: HEADER_BUILDED,
    header: header
  }
}

export function fetchData(url) {
  return (dispatch) => {
    dispatch(requestData());

    sendRequest('GET', url, null, (xhr) => {

      dispatch(receiveData(JSON.parse(xhr.responseText)));

      console.log(JSON.parse(xhr.responseText));

      const header = {
        'Автор' : 'string'
      }

      JSON.parse(xhr.responseText).form.questions.forEach( (question) => {
        header[question.title] = question.type;
      });

      dispatch(recieveHeader(header));
    });
  }
}

export function showReportGeneration() {
  return {
    type: SHOW_GENERATION
  }
}

export function hideReportGeneration() {
  return {
    type: HIDE_GENERATION
  }
}

export function toggleDescription() {
  return {
    type: TOGGLE_DESCRIPTION
  }
}

export function requestCSV() {
  return {
    type: FETCH_TABLE_CSV_REQUEST
  }
}

function fetchTableCSVSuccess(xhr) {
  return {
    type: FETCH_TABLE_CSV_SUCCESS,
    csv: xhr.responseText
  }
}

function fetchTableCSVFailure(error) {
  return {
    type: FETCH_TABLE_CSV_FAILURE,
    error: error
  }
}

export function fetchTableCSV(url, onErrorFn) {
  return (dispatch) => {
    dispatch({
      type: FETCH_TABLE_CSV_REQUEST,
      url: url
    });

    sendRequest('GET', url, null,
      (xhr) => ( dispatch( fetchTableCSVSuccess(xhr) ) ),
      (error) => {
        dispatch( fetchTableCSVFailure(error) );
        if (onErrorFn) onErrorFn();
      }
    );
  }
}

function fetchReportCSVSuccess(xhr) {
  return {
    type: FETCH_REPORT_CSV_SUCCESS,
    csv: xhr.responseText
  }
}

function fetchReportCSVFailure(error) {
  return {
    type: FETCH_REPORT_CSV_FAILURE,
    error: error
  }
}

export function fetchReportCSV(url, settings, onErrorFn, onSuccessFn) {
  return (dispatch) => {
    dispatch({
      type: FETCH_REPORT_CSV_REQUEST,
      url: url
    });

    sendRequest('POST', url, settings,
      (xhr) => {
        dispatch( fetchReportCSVSuccess(xhr) );
        if (onSuccessFn) onSuccessFn(xhr.responseText);
      },
      (error) => {
        dispatch( fetchReportCSVFailure(error) );
        if (onErrorFn) onErrorFn();
      }
    );
  }
}