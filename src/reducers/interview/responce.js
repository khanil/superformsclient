// В данной части хранилища будет храниться информация о форме,
// которую необходимо заполнить

import {
  RECIEVE_RESPONCE
} from './../../constants/actionTypes';

const initalState = {

}

function response (state = initalState, action) {
  switch (action.type) {

    case RECIEVE_RESPONCE:
      return Object.assign({}, state, action.response);

    default: 
      return state;

  }
}

export default response;