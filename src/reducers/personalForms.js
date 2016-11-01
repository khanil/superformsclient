import {Map, List} from 'immutable';
import { handleActions } from 'redux-actions';
import { makeActionCreator } from '../utils';
import { createSelector } from 'reselect'

//- Actions
export const FETCH = 'personalForms/FETCH';
export const FETCH_SUCCESS = 'personalForms/FETCH_SUCCESS';
export const FETCH_FAILURE = 'personalForms/FETCH_FAILURE';

const fetchInit = makeActionCreator(FETCH, 'url');
const fetchSuccess = makeActionCreator(FETCH_SUCCESS, 'forms');
const fetchFailure = makeActionCreator(FETCH_FAILURE, 'response');

export function fetch(url) {
  return dispatch => {
    console.log('personalForms');

    dispatch( fetchInit(url) );

    var xhr = new XMLHttpRequest();
    xhr.open('get', url, true) ;
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.onload = function () {
      if (xhr.status != 200) {
          dispatch( fetchFailure(xhr.response) );
      } else {
          dispatch( fetchSuccess( JSON.parse(xhr.responseText)) );
      }
    }
    xhr.send();
  }
}

//- State
const initialState = Map({
  isFetching: false,
  list: List([])
});

//- Reducers
export default handleActions({

  [FETCH]: (state, action) => state.set('isFetching', true),

  [FETCH_SUCCESS]: (state, action) => state.merge({
    isFetching: false,
    list: action.forms
  }),

  [FETCH_FAILURE]: (state, action) => state.merge({
    isFetching: false,
    //TODO: place to error listener reducer?
    error: action.response
  })

}, initialState);

//- Selectors
export const getFetchingStatus = (state) => state.get('isFetching');
export const getFormsList = createSelector(
  (state) => state.get('list'),
  (list) => list.toJS()
);