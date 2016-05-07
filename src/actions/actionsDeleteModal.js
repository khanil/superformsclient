/*
  Действия с модальным окном удаления формы
 */

import {
  SHOW_DELETE_MODAL,
  HIDE_DELETE_MODAL,
  DELETE_FORM,
  DELETE_SUCCESS,
  DELETE_FAILED
} from './../constants/actionTypes';

export function showModal(id) {
  return {
    type: SHOW_DELETE_MODAL,
    formId: id
  }
}

export function hideModal() {
  return {
    type: HIDE_DELETE_MODAL
  }
}

export function deleteForm() {
  return {
    type: DELETE_FORM
  }
}

export function deleteSuccess() {
  return {
    type: DELETE_SUCCESS
  }
}

export function deleteFailed(error) {
  return {
    type: DELETE_FAILED,
    error: error
  }
}