/*
  В данной части состояния хранится информация для отображения 
  модального окна копирования формы
 */

import {
  SHOW_DELETE_MODAL,
  HIDE_DELETE_MODAL,
  DELETE_FORM,
  DELETE_SUCCESS,
  DELETE_FAILED
} from './../../constants/actionTypes';

const initialState = {
  isVisible: false,
  formId: null,
  isDeleting: false,
  isDeleted: false,
  deleteError: null
};

function deleteModal (state = initialState, action) {
  switch (action.type) {
    case SHOW_DELETE_MODAL:
      return Object.assign({}, state, {
        isVisible: !state.isVisible,
        formId: action.formId
      });

    case HIDE_DELETE_MODAL:
      return Object.assign({}, state, initialState);

    case DELETE_FORM:
      return Object.assign({}, state, {
        isDeleting: true
      });

    case DELETE_SUCCESS:
      return Object.assign({}, state, {
        isDeleting: false,
        isDeleted: true
      });

    case DELETE_FAILED:
      return Object.assign({}, state, {
        isDeleting: false,
        deleteError: action.error
      });


    default:
      return state;
  }
}

export default deleteModal;