/*
  В данной части состояния хранится информация для отображения 
  модального окна копирования формы
 */

import {
  TOGGLE_COPY_MODAL,
  COPY_FORM,
  COPY_SUCCESS,
  COPY_FAILED
} from './../../constants/actionTypes';

const initialState = {
  isVisible: false,
  formId: null,
  isCopying: false,
  isCopied: false,
  copyError: null
};

function copyModal (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_COPY_MODAL:
      return Object.assign({}, state, {
        isVisible: !state.isVisible,
        formId: action.formId,
        copyError: null,
        isCopied: false
      });

    case COPY_FORM:
      return Object.assign({}, state, {
        isCopying: true
      });

    case COPY_SUCCESS:
      return Object.assign({}, state, {
        isCopying: false,
        isCopied: true
      });

    case COPY_FAILED:
      return Object.assign({}, state, {
        isCopying: false,
        copyError: action.error
      });


    default:
      return state;
  }
}

export default copyModal;