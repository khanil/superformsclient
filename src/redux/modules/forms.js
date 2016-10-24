import { Map, List } from 'immutable';
import { createSelector } from 'reselect';

//- Actions
export const COPY = 'forms/COPY';
export const COPY_SUCCESS = 'forms/COPY_SUCCESS';
export const COPY_FAILURE = 'forms/COPY_FAILURE';
export const DELETE = 'forms/DELETE';
export const DELETE_SUCCESS = 'forms/DELETE_SUCCESS';
export const DELETE_FAILURE = 'forms/DELETE_FAILURE';
export const GET = 'forms/GET';
export const GET_SUCCESS = 'forms/GET_SUCCESS';
export const GET_FAILURE = 'forms/GET_FAILURE';
export const SEND = 'forms/SEND';
export const SEND_SUCCESS = 'forms/SEND_SUCCESS';
export const SEND_FAILURE = 'forms/SEND_FAILURE';

//- State
const initialState = Map({
  busy: false,
  list: List()
});

//- Reducer
export default function(state = initialState, action) {
  return state;
}

//- Action Creators
export function copy(uri) {
  return {
    types: [COPY, COPY_SUCCESS, COPY_FAILURE],
    promise: (client) => client.get(uri)
  }
}

//- Selectors