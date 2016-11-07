import { Map, List } from 'immutable';
import { createSelector } from 'reselect';
import createAction from '../../utils/makeActionCreator.js';
import { combineReducers } from 'redux';

//- Actions
export const TAB_CHANGE = 'mainPageApp/tab/CHANGE';
export const TAB_INIT = 'mainPageApp/tab/INIT';
export const TAB_SEND_SUCCESS = 'mainPageApp/tab/SEND_SUCCESS';
export const TAB_SEND_FAILURE = 'mainPageApp/tab/SEND_FAILURE';

//- State
const initialState = Map({
  tab: 'МОИ ФОРМЫ'
});

//- Reducer
function config(state = initialState, action) {
  switch(action.type) {
    case TAB_CHANGE:
    case TAB_INIT:
      return state.set('tab', action.tab);

    default:
      return state;
  }
}

import allFormsList from './allFormsList';
import myFormsList from './myFormsList';
export default combineReducers({
  config,
  allFormsList,
  myFormsList
});

//- Action Creators
export function tabChange(tab) {
  const uri = `/api/setdefaulttab`;
  return {
    types: [TAB_CHANGE, TAB_SEND_SUCCESS, TAB_SEND_FAILURE],
    promise: (client) => client.post(uri, tab),
    tab
  }
}

export const tabInit = createAction(TAB_INIT, 'tab');


//- Selectors
export const getTab = (state) => state.config.get('tab');