import {Map, List} from 'immutable';
import { handleActions } from 'redux-actions';
import { makeActionCreator } from '../utils';
import { createSelector } from 'reselect';

//- Actions
export const COPY = 'forms/COPY_REQUEST';
export const COPY_FAILURE = 'forms/COPY_FAILURE';
export const COPY_SUCCESS = 'forms/COPY_SUCCESS';

export const RECEIVE = 'forms/RECEIVE_REQUEST';
export const RECEIVE_FAILURE = 'forms/RECEIVE_FAILURE';
export const RECEIVE_SUCCESS = 'forms/RECEIVE_SUCCESS';

export const REMOVE = 'forms/REMOVE_REQUEST';
export const REMOVE_FAILURE = 'forms/REMOVE_FAILURE';
export const REMOVE_SUCCESS = 'forms/REMOVE_SUCCESS';

export const SEND = 'forms/SEND_REQUEST';
export const SEND_FAILURE = 'forms/SEND_FAILURE';
export const SEND_SUCCESS = 'forms/SEND_SUCCESS';

const copy = makeActionCreator(COPY, 'url', 'formId', 'copyName');
const fetch = makeActionCreator(FETCH, 'url');
const receive = makeActionCreator(RECEIVE, 'list');
const remove = makeActionCreator();
const send = makeActionCreator(SEND, 'url', 'config');

//- State
const initialState = Map({
  busy: false,
  list: List([])
});

//- Reducer
export default handleActions({

}, initialState);

//- Selectors
