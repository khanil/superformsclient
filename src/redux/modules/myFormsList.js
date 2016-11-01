import { Map, List } from 'immutable';
import { createSelector } from 'reselect';

//- Actions
export const COPY = 'myFormsList/COPY';
export const COPY_SUCCESS = 'myFormsList/COPY_SUCCESS';
export const COPY_FAILURE = 'myFormsList/COPY_FAILURE';
export const DELETE = 'myFormsList/DELETE';
export const DELETE_SUCCESS = 'myFormsList/DELETE_SUCCESS';
export const DELETE_FAILURE = 'myFormsList/DELETE_FAILURE';
export const FETCH = 'myFormsList/FETCH';
export const FETCH_SUCCESS = 'myFormsList/FETCH_SUCCESS';
export const FETCH_FAILURE = 'myFormsList/FETCH_FAILURE';
export const SEND = 'myFormsList/SEND';
export const SEND_SUCCESS = 'myFormsList/SEND_SUCCESS';
export const SEND_FAILURE = 'myFormsList/SEND_FAILURE';

//- State
const initialState = Map({
  busy: false,
  map: Map()
});

function normalizeFormsList(list) {
  const map = {};
  list.forEach((form) => {
    const id = form.id;
    map[id] = form;
  });
  return map;
}

//- Reducer
export default function(state = initialState, action) {
  switch(action.type) {
    case COPY:
    case DELETE:
    case FETCH:
    case SEND:
      return state.set('busy', true);

    case COPY_FAILURE:
    case DELETE_FAILURE:
    case FETCH_FAILURE:
    case SEND_FAILURE:
      return state.merge({
        busy: false,
        error: action.error
      });

    case DELETE_SUCCESS:
      return state.withMutations(state => {
        state
          .update('map', (map) => map.delete(action.id))
          .set('busy', false);
      });

    case FETCH_SUCCESS:
      return state.merge({
        busy: false,
        map: normalizeFormsList(action.result)
      });

    case COPY_SUCCESS:
      const copy = state
        .getIn(['map', action.id])
        .merge({
          id: action.result.id,
          index: action.result.index,
          title: action.name,
          created: Date.now(),
          sent: null,
          edited: null,
          expires: null,
          allowrefill: false
        });

      return state.withMutations(state => {
        state
          .setIn(['map', action.result.id], copy)
          .set('busy', false);
      });

    case SEND_SUCCESS:
      return state.withMutations(state => {
        state
          .setIn(['map', action.id, 'sent'], Date.now())
          .setIn(['map', action.id, 'expires'], action.config.expires)
          .setIn(['map', action.id, 'resp_count'], 0)
          .set('busy', false);
      });

    default:
      return state;
  }
}

//- Action Creators
export function copy(id, name) {
  const uri = `/api/forms/${id}/copy`;
  return {
    types: [COPY, COPY_SUCCESS, COPY_FAILURE],
    promise: (client) => client.post(uri, name),
    id,
    name
  }
}

export function fetch() {
  const uri = `/api/forms`;
  return {
    types: [FETCH, FETCH_SUCCESS, FETCH_FAILURE],
    promise: (client) => client.get(uri)
  }
}

export function remove(id) {
  const uri = `/api/forms/${id}/delete`;
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAILURE],
    promise: (client) => client.delete(uri),
    id
  }
}

export function send(id, config = {}) {
  const uri = `/api/forms/${id}/send`;
  return {
    types: [SEND, SEND_SUCCESS, SEND_FAILURE],
    promise: (client) => client.post(uri, JSON.stringify(config)),
    id,
    config
  }
}

//- Selectors
export const getForms = createSelector(
  (state) => state.get('map'),
  (map) => map.toList().toJS()
);

export const getStatus = (state) => state.get('busy');