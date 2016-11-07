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
  db: Map({
    list: List(),
    relations: Map(),
    entities: Map({
      forms: Map(),
      users: Map()
    }),
  })
});

function normalizeFormsList(list) {
  const db = {
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

    if (db.entities.users[user_id]) {
      db.relations[user_id].push(form_id);
    } else {
      const userEntity = { user_id, name, surname, patronymic, author };
      db.entities.users[user_id] = userEntity;
      db.relations[user_id] = [form_id];
    }

    db.entities.forms[form_id] = formEntity;
    db.list.push(form_id);
  });

  return db;
}

function convertToList(db) {
  const list = db.get('list');
  if (list.size == 0)
    return [];

  const result = list.map((form_id) => {
    const formEntity = db.getIn(['entities', 'forms', form_id]);
    const userEntity = db.getIn(['entities', 'users', formEntity.get('user_id')]);
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
        db: normalizeFormsList(action.result)
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
export const getFilter = (state) => state.get('filter').trim();
const getDB = (state) => state.get('db');
export const getStatus = (state) => state.get('busy');
const getUsers = (state) => state.getIn(['db', 'entities', 'users']);

export const isFilterEmpty = createSelector(
  getFilter,
  (filter) => filter == ''
);

const getUsersByFilter = createSelector(
  getUsers,
  getFilter,
  (users, filter) => filterUsers(users, filter)
);

export const getForms = createSelector(
  getDB,
  (db) => convertToList(db)
);

export const getFormsFilteredByUser = createSelector(
  getDB,
  getUsersByFilter,
  (db, users) => {
    if (users.size == 0)
      return [];

    let list = List();
    users.forEach((user, user_id) => {
      const formIdList = db.getIn(['relations', user_id]);
      const formsList = formIdList.map((id) => {
        return db
          .getIn(['entities', 'forms', id])
          .merge(user);
      });

      list = list.concat(formsList);
    });

    return list.toJS();
  }
);

function filterUsers(users, filter) {
  const regExp = new RegExp(filter, 'i');

  return users.filter((user) => {
    const { name, surname, patronymic } = user.toObject();
    const str = surname + ' ' + name;
    return regExp.test(str);
  });
}

// export const getForms = createSelector(
//   getMap,
//   getFilter,
//   (map, filter) => {
//     if (map.get('list').size == 0)
//       return [];

//     if (filter == '')
//       return convertToList(map);

//     const users = map.getIn(['entities', 'users']);
//     const usersFiltered = filterUsers(users, filter);

//     if (usersFiltered.size == 0) // found none
//       return [];

//     let list = List();
//     usersFiltered.forEach((user, user_id) => {
//       const userFormsList = map.getIn(['relations', user_id]);
//       const formsList = userFormsList
//         .map((form_id) => {
//           const form = map.getIn(['entities', 'forms', form_id]);
//           return form.merge(user);
//         });
//       list = list.concat(formsList);
//     });

//     return list.toJS();
//   }
// );

// function getFormsByUser(map, user, user_id) {
//   const formsIdList = map.getIn(['relations', user_id]);
//   return formsIdList.map((id) => {
//     return map
//       .getIn(['entities', 'forms', 'id'])
//       .merge(user);
//   });
// }