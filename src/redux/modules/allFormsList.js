import { Map, List } from 'immutable';
import { createSelector } from 'reselect';

//- Actions
export const FETCH = 'allFormsList/FETCH';
export const FETCH_SUCCESS = 'allFormsList/FETCH_SUCCESS';
export const FETCH_FAILURE = 'allFormsList/FETCH_FAILURE';
export const FILTER_BY_NAME = 'FILTER_BY_NAME';

//- State
const initialState = Map({
  busy: false,
  filter: null,
  map: Map()
});

import {fakeData} from './fakeData';

function normalizeFormsList(list) {
  const map = {
    list: [],
    relations: {},
    entities: {
      forms: {},
      users: {}
    }
  };

  list.forEach((form) => {
    const { user_id, name, surname, patronymic, author, ...rest } = form;
    const form_id = form.id;

    const formEntity = { user_id, ...rest };

    if (map.entities.users[user_id]) {
      map.relations[user_id].push(form_id);
    } else {
      const userEntity = { user_id, name, surname, patronymic, author };
      map.entities.users[user_id] = userEntity;
      map.relations[user_id] = [form_id];
    }

    map.entities.forms[form_id] = formEntity;
    map.list.push(form_id);
  });

  return map;
}

function convertToList(map) {
  if (!map.list)
    return [];

  return map.list.map((form_id) => {
    const formEntity = map.entities.forms[form_id];
    const userEntity = map.entities.users[formEntity.user_id];
    return {...formEntity, ...userEntity};
  });
}

//- Reducer
export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH:
      return state.set('busy', true);

    case FETCH_FAILURE:
      return state.merge({
        busy: false,
        error: action.error
      });

    case FETCH_SUCCESS:
      const map = normalizeFormsList(fakeData);
      // console.log(map);

      // const list = convertToList(map);
      // console.log(list);

      return state.merge({
        busy: false,
        map
      });

    default:
      return state;
  }
}

//- Action Creators
export function fetch() {
  const uri = `/api/journal`;
  return {
    types: [FETCH, FETCH_SUCCESS, FETCH_FAILURE],
    promise: (client) => client.get(uri)
  }
}

//- Selectors
export const getFilter = (state) => state.get('filter');
export const getStatus = (state) => state.get('busy');

export const getForms = createSelector(
  (state) => state.get('map'),
  (map) => convertToList(map.toJS())
);

export const getMap = (state) => state.get('map');

export const getForms = createSelector(
  getMap,
  getFilter,
  (map, filter) => {
    const users = map.getIn('entities', 'users');
    users.findEntry((user, user_id) => user.get('surname'))
  }
)
