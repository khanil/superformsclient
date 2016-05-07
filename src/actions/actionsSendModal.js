/*
  Действия с модальным окном отправки формы
 */

import {
  SHOW_MODAL,
  HIDE_MODAL,
  CHANGE_SEND_METHOD,
  SEND_FORM,
  SENDING_SUCCESS,
  SENDING_FAILED
} from './../constants/actionTypes';

export function showModal(id) {
  return {
    type: SHOW_MODAL,
    formId: id
  }
}

export function hideModal() {
  return {
    type: HIDE_MODAL
  }
}

export function changeSendMethod(method) {
  return {
    type: CHANGE_SEND_METHOD,
    method: method
  }
}

export function sendForm() {
  return {
    type: SEND_FORM
  }
}

export function sendingSuccess() {
  return {
    type: SENDING_SUCCESS
  }
}

export function sendingFailed(error) {
  return {
    type: SENDING_FAILED,
    error: error
  }
}