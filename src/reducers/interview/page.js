// В данной части хранилища хранится общая информация о странице

import {
  SET_PAGE_TYPE,
  REQUEST_BOILERPLATE,
  RECEIVE_BOILERPLATE,
  REQUEST_RESPONCE,
  RECIEVE_RESPONCE
} from './../../constants/actionTypes';
import { INTERVIEW_FORM } from './../../constants/interviewPageTypes';

const initalState = {
  type: INTERVIEW_FORM,
  isFetching: true
}

function page (state = initalState, action) {
  switch (action.type) {

    case SET_PAGE_TYPE:
      return Object.assign({}, state, {
        type: action.pageType
      });

    case REQUEST_BOILERPLATE:
    case REQUEST_RESPONCE:
      return Object.assign({}, state, {
        isFetching: true
      });

    case RECEIVE_BOILERPLATE:
    case RECIEVE_RESPONCE:
      return Object.assign({}, state, {
        isFetching: false
      });

    default: 
      return state;

  }
}

export default page;