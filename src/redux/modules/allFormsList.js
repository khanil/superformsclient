import { Map, List } from 'immutable';
import { createSelector } from 'reselect';
import createAction from '../../utils/makeActionCreator.js';

//- Actions
export const FETCH = 'allFormsList/FETCH';
export const FETCH_SUCCESS = 'allFormsList/FETCH_SUCCESS';
export const FETCH_FAILURE = 'allFormsList/FETCH_FAILURE';
export const FILTER_BY_NAME = 'FILTER_BY_NAME';

//- State
// const initialState = Map({
//   busy: false,
//   filter: null,
//   list: List()
// });

const initialState = Map({
  busy: false,
  filter: '',
  map: Map({
    list: List(),
    relations: Map(),
    entities: Map({
      forms: Map(),
      users: Map()
    }),
  })
});

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
  const list = map.get('list');
  if (list.size == 0)
    return [];

  const result = list.map((form_id) => {
    const formEntity = map.getIn(['entities', 'forms', form_id]); //map.entities.forms[form_id];
    const userEntity = map.getIn(['entities', 'users', formEntity.get('user_id')]);//entities.users[formEntity.user_id];
    return formEntity.merge(userEntity);
  });

  return result.toJS();
}

import fakeList from './fakeData';

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
      return state.merge({
        busy: false,
        // list: fakeList,
        map: normalizeFormsList(fakeList)
      });

    case FILTER_BY_NAME:
      return state.set('filter', action.filter);

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

export const filter = createAction(FILTER_BY_NAME, 'filter');

//- Selectors
export const getStatus = (state) => state.get('busy');
export const getFilter = (state) => state.get('filter').trim();
const getMap = (state) => state.get('map');

// export const getForms = createSelector(
//   (state) => state.get('list'),
//   (list) => list.toJS()
// );

export const getForms = createSelector(
  getMap,
  getFilter,
  (map, filter) => {
    // console.log(map.toJS());
    // console.log(filter);

    if (map.get('list').size == 0)
      return [];

    if (filter == '')
      return convertToList(map);

    const regExp = new RegExp(filter, 'i');

    const users = map.getIn(['entities', 'users']);
    const usersValidList = users.filter((user) => {
      const { name, surname, patronymic } = user.toObject();
      const str = surname + ' ' + name;
      return regExp.test(str);
    });

    // console.log(usersValidList.toJS());

    // find forms list by user
    if (usersValidList.size == 0)
      return [];

    let list = List();
    usersValidList.forEach((user, user_id) => {
      const userFormsList = map.getIn(['relations', user_id]);
      const formsList = userFormsList
        .map((form_id) => {
          const form = map.getIn(['entities', 'forms', form_id]);
          return form.merge(user);
        });
      list = list.concat(formsList);
    });


    return list.toJS();
  }
);