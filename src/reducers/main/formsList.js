/*
  В данной части состояния хранится информация для отображения списка всех форм
 */

import { ALL } from './../../constants/filterTypes';
import { NONE } from './../../constants/sortingTypes';
import {
  REQUEST_FORMS,
  RECEIVE_FORMS,
  TOGGLE_VISIBILITY
  // SET_VISIBILITY_FILTER,
  // SET_SORTING_TYPE
} from './../../constants/actionTypes';

const initialState = {
  filter: ALL,
  sort: NONE,
  isFetching: false,
  forms: [],
  isSendModalVisible: false
};

function formsList (state = initialState, action) {
  switch (action.type) {
    case REQUEST_FORMS:
      return Object.assign({}, state, {
        isFetching: true
      });

    case RECEIVE_FORMS:
      return Object.assign({}, state, {
        isFetching: false,
        forms: action.forms
      });

    case TOGGLE_VISIBILITY:
      return Object.assign({}, state, {
        isSendModalVisible: !state.isSendModalVisible
      });

    default:
      return state;
  }
}

export default formsList;