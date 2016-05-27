/*
  В данной части хранилища хранится информация о построении формы
 */

import {
  RECEIVE_BOILERPLATE
} from './../../constants/actionTypes';

const initalState = {
  id: '',
  name: '',
  description: '',
  type: '',
  questions: []
}

function boilerplate (state = initalState, action) {
  switch (action.type) {

    case RECEIVE_BOILERPLATE:
      return Object.assign({}, state, action.boilerplate);

    default: 
      return state;

  }
}

export default boilerplate;