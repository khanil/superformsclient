// В данной части хранилища будет храниться информация о форме,
// которую необходимо заполнить

import {
  REQUEST_BOILERPLATE,
  RECEIVE_BOILERPLATE
} from './../constants/actionTypes';

const initalState = {
  isFetching: true,
  boilerplate: {
    name: '',
    description: '',
    questions: []
  }
}

function interviewBoilerplate (state = initalState, action) {
  switch (action.type) {

    case REQUEST_BOILERPLATE:
      return Object.assign({}, state, {
        isFetching: true
      });

    case RECEIVE_BOILERPLATE:
      return Object.assign({}, state, {
        isFetching: false,
        boilerplate: action.boilerplate
      });

    default: 
      return state;

  }
}

export default interviewBoilerplate;