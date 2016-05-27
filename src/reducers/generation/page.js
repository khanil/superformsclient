// В данной части хранилища хранится общая информация о странице

import {
  SET_PAGE_TYPE,
  REQUEST_BOILERPLATE,
  RECEIVE_BOILERPLATE,
  SAVE_BOILERPLATE,
  SAVING_SUCCESS,
  SAVING_FAILED,
  READ_URLS_FROM_HTML,
  RETURN_TO_LAST_SAVE
} from './../../constants/actionTypes';
import { CREATE_FORM } from './../../constants/generationPageTypes';

const initalState = {
  type: CREATE_FORM,
  isFetching: false,
  isSending: false,
  savingError: null,
  isSaved: false,
  lastSave: null,
  urls: {}
}

function page (state = initalState, action) {
  switch (action.type) {

    case SET_PAGE_TYPE:
      return Object.assign({}, state, {
        type: action.pageType
      });

    case READ_URLS_FROM_HTML:
      return Object.assign({}, state, {
        urls: action.urls
      });

    case SAVE_BOILERPLATE:
      return Object.assign({}, state, {
        isSending: true
      });

    case SAVING_SUCCESS:
      return Object.assign({}, state, {
        isSending: false,
        isSaved: true,
        lastSave: action.time,
        savingError: null
      });

    case RETURN_TO_LAST_SAVE:
      return Object.assign({}, state, {
        isSaved: true,
        savingError: null
      });

    case 'redux-form/SUBMIT_FAILED':
      return Object.assign({}, state, {
        isSending: false,
        savingError: 'Ошибка в заполнении формы'
      });

    case SAVING_FAILED:
      return Object.assign({}, state, {
        isSending: false,
        savingError: action.error
      });

    case REQUEST_BOILERPLATE:
      return Object.assign({}, state, {
        isFetching: true
      });

    case RECEIVE_BOILERPLATE:
      return Object.assign({}, state, {
        isFetching: false,
        isSaved: true,
        lastSave: action.boilerplate.edited
      });

    case 'redux-form/SWAP_ARRAY_VALUES':
    case 'redux-form/REMOVE_ARRAY_VALUE':
    case 'redux-form/ADD_ARRAY_VALUE':
    case 'redux-form/CHANGE':
      return Object.assign({}, state, {
        isSaved: false
      });

    default: 
      return state;

  }
}

export default page;