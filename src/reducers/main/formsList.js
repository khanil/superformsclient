/*
  В данной части состояния хранится информация для отображения списка всех форм
 */

import { NONE } from './../../constants/sortingTypes';
import * as DATE_TO_DISPLAY from './../../constants/displayingDateTypes';
import {
  REQUEST_FORMS,
  RECEIVE_FORMS,
  TOGGLE_VISIBILITY,
  SET_DATE_TO_DISPLAY,
  SET_VISIBILITY_FILTER
  // SET_SORTING_TYPE
} from './../../constants/actionTypes';

const initialState = {
  filters: {
    'По типу формы': 'ALL',
    'По статусу': 'ALL'
  },
  sort: NONE,
  displayingDate: DATE_TO_DISPLAY.SENT,
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

    case SET_DATE_TO_DISPLAY:
      return Object.assign({}, state, {
        displayingDate: action.dateType
      });

    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, 
        {
          filters: Object.assign({}, state.filters,
            action.filter
          )
        }
      );

    default:
      return state;
  }
}

export default formsList;