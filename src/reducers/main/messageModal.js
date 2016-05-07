/*
  В данной части состояния хранится информация для отображения 
  модального окна с сообщением пользователю
 */

import {
  TOGGLE_MESSAGE_MODAL
} from './../../constants/actionTypes';

const initialState = {
  isVisible: false
};

function messageModal (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MESSAGE_MODAL:
      return Object.assign({}, state, {
        isVisible: !state.isVisible,
        formId: action.formId
      });

    default:
      return state;
  }
}

export default messageModal;