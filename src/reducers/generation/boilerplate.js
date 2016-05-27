/*
  В данной части хранилища хранится информация о построении формы для редактирования
 */

import {
  RECEIVE_BOILERPLATE,
  SAVING_SUCCESS,
  RETURN_TO_LAST_SAVE
} from './../../constants/actionTypes';

const initalState = {
  _initiateTrigger: false, //Триггер для заполнения формы значениями хранилища
  questions: [ //Инициализация одного вопроса в форме по-умполчанию
    {
      title: ''
    }
  ]
}

function boilerplate (state = initalState, action) {
  switch (action.type) {

    case RECEIVE_BOILERPLATE:
      return Object.assign({}, state, action.boilerplate);

    case SAVING_SUCCESS:
      return Object.assign({}, state, {
        name: action.boilerplate.name,
        type: action.boilerplate.type,
        description: action.boilerplate.description,
        questions: action.boilerplate.questions,
        edited: action.time,
        id: (action.id) ? action.id : state.id
      });

    case RETURN_TO_LAST_SAVE:
    // Имитирует изменение состояния, что влечет за собой реинициализацию полей формы
    // из состояния
      return Object.assign({}, state, {
        _initiateTrigger: (!state._initiateTrigger)
      });

    default: 
      return state;

  }
}

export default boilerplate;