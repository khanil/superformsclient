
import {
  REQUEST_DATA,
  RECEIVE_DATA,
  HEADER_BUILDED
} from './../constants/actionTypes';

const initalState = {
  answers: [],
  boilerplate: {},
  header: [],
  isFetching: true
}

function report (state = initalState, action) {
  switch (action.type) {

    case REQUEST_DATA:
      return Object.assign({}, state, {
        isFetching: true
      });

    case RECEIVE_DATA:
      return Object.assign({}, state, {
        answers: action.answers,
        boilerplate: action.boilerplate
      });

    case HEADER_BUILDED:
      return Object.assign({}, state, {
        isFetching: false,
        header: action.header
      });

    default: 
      return state;

  }
}

export default report;