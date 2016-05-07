/*
  Действия с модальным окном сообщения пользователю
 */

import {
  TOGGLE_MESSAGE_MODAL
} from './../constants/actionTypes';

export function toggleModal() {
  return {
    type: TOGGLE_MESSAGE_MODAL
  }
}