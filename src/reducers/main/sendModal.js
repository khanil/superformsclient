/*
  В данной части состояния хранится информация для отображения 
  модального окна отправки форм
 */

import {
  SHOW_MODAL,
  HIDE_MODAL,
  CHANGE_SEND_METHOD,
  SEND_FORM,
  SENDING_SUCCESS,
  SENDING_FAILED
} from './../../constants/actionTypes';

const initialState = {
  isVisible: false,
  sendMethod: 'mail',
  formId: null,
  isSending: false,
  isSent: false,
  sendingError: null
};

function sendModal (state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return Object.assign({}, state, {
        isVisible: true,
        formId: action.formId
      });

    case HIDE_MODAL:
      return Object.assign({}, state, initialState);

    case CHANGE_SEND_METHOD:
      return Object.assign({}, state, {
        sendMethod: action.method
      });

    case SEND_FORM:
      return Object.assign({}, state, {
        isSending: true
      });

    case SENDING_SUCCESS:
      return Object.assign({}, state, {
        isSending: false,
        isSent: true
      });

    case SENDING_FAILED:
      return Object.assign({}, state, {
        isSending: false,
        sendingError: action.error
      });

    default:
      return state;
  }
}

export default sendModal;