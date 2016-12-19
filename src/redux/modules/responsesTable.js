import { Map, List } from 'immutable';
import { createSelector } from 'reselect';

import * as form from './form';
import * as responses from './responses';

//- Actions

//- State
const initialState = Map({
  form: Map(),
  responses: List(),
  updated: null,
  updating: false
});

//- Reducer
export default function(state = initialState, action) {
  switch (action.type) {

    case form.FETCH_FAILURE:
      return state.set('fatalError', action.error);

    case form.FETCH_SUCCESS:
      return state.merge({
        form: action.result
      });

    case responses.FETCH:
      return state.merge({
        updating: true
      });

    case responses.FETCH_FAILURE:
      return state.set('fatalError', action.error);

    case responses.FETCH_SUCCESS:
      return state.merge({
        responses: action.result,
        updated: Date.now(),
        updating: false
      });

    default:
      return state;
  }
}

//- Action Creators
export {fetch as fetchForm} from './form';
export {
  fetch as fetchResponses,
  fetchXLSX
} from './responses';

//- Selectors
export const getForm = createSelector(
  (state) => state.get('form'),
  (form) => form
);

export const getResponses = createSelector(
  (state) => state.get('responses'),
  (responses) => responses
);

export const getScheme = (state) => state.getIn(['form', 'scheme']);

export const getLastUpdateTime = (state) => state.get('updated');

export const isUpdating = (state) => state.get('updating');

export const getFatalError = (state) => state.get('fatalError');