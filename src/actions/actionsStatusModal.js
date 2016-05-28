/*
  Действия с модальным окном просмотра хода мониторинга
 */

import {
  SHOW_STATUS_MODAL,
  HIDE_STATUS_MODAL
} from './../constants/actionTypes';

export function showModal(id) {
  return {
    type: SHOW_STATUS_MODAL,
    formId: id
  }
}

export function hideModal() {
  return {
    type: HIDE_STATUS_MODAL
  }
}