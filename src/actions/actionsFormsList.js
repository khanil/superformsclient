/*
  Действия со списком всех форм
 */

import sendRequest from '../utils/sendRequest';

import {
  REQUEST_FORMS,
  RECEIVE_FORMS,
  SET_VISIBILITY_FILTER,
  SET_SORTING_TYPE,
  SET_DATE_TO_DISPLAY
} from './../constants/actionTypes';

export function requestForms() {
  return {
    type: REQUEST_FORMS
  }
}

export function receiveForms(formsArray) {
  return {
    type: RECEIVE_FORMS,
    forms: formsArray
  }
}

export function fetchForms(url) {
  return (dispatch) => {
    dispatch(requestForms());

    sendRequest('GET', url, null, (xhr) => {
      let formsArray = JSON.parse(xhr.responseText);

      dispatch(receiveForms( formsArray ));
    });
  }
}

export function setVisibilityFilter(filter) {
  return {
    type: SET_VISIBILITY_FILTER,
    filter: filter
  }
}

export function setSortingType(sort) {
  return {
    type: SET_SORTING_TYPE,
    sort: sort
  }
}

export function setFilter(filter, value) {
  const filterObj = {};
  filterObj[filter] = value;

  return {
    type: SET_VISIBILITY_FILTER,
    filter: filterObj
  }
}

export function setDateToDisplay(type) {
  return {
    type: SET_DATE_TO_DISPLAY,
    dateType: type
  }
}