/*
  Действия с модальным окном копирования формы
 */

import {
  TOGGLE_COPY_MODAL,
  COPY_FORM,
  COPY_SUCCESS,
  COPY_FAILED
} from './../constants/actionTypes';

export function toggleModal(id) {
  return {
    type: TOGGLE_COPY_MODAL,
    formId: id
  }
}

export function copyForm() {
  return {
    type: COPY_FORM
  }
}

export function copySuccess() {
  return {
    type: COPY_SUCCESS
  }
}

export function copyFailed(error) {
  return {
    type: COPY_FAILED,
    error: error
  }
}