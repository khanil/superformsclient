/*
  В данной части состояния хранится информация для отображения 
  модального окна статуса формы
 */

import {
  SHOW_STATUS_MODAL,
  HIDE_STATUS_MODAL
} from './../../constants/actionTypes';

const initialState = {
  isVisible: false,
  formId: null
};

function statusModal (state = initialState, action) {
  switch (action.type) {
    case SHOW_STATUS_MODAL:
      return Object.assign({}, state, {
        isVisible: true,
        formId: action.formId
      });

    case HIDE_STATUS_MODAL:
      return Object.assign({}, state, initialState);

    default:
      return state;
  }
}

export default statusModal;